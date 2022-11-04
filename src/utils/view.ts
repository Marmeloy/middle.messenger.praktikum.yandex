import pug from 'pug';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

type events = Record<string, (e:Event) => void>;
export type props = {
    id?: string,
    events?: events,
};
export type child = InstanceType<typeof View> | InstanceType<typeof View>[];
type children = { [key: string]: child };

export abstract class View<TProps extends props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  props: TProps;

  eventBus: () => EventBus;

  children: children;

  private _element: HTMLElement;

  private readonly _meta: {
        tagName: string,
        props: props,
        withInternalID: boolean;
    };

  private readonly _id: string;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     * @param withInternalID
     *
     * @returns {void}
     */
  constructor(tagName: string, propsAndChildren: TProps, withInternalID:boolean = false) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);
    this._id = makeUUID();
    this._meta = {
      tagName,
      props,
      withInternalID,
    };
    this.children = this._makeChildrenProxy({ ...children });
    this.props = this._makePropsProxy({ ...props, id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(View.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: TProps): { children: children, props: TProps } {
    const children:children = {};
    const props:TProps = {} as TProps;
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof View || Array.isArray(value) && value.length > 0 && value[0] instanceof View) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(View.EVENTS.INIT, this.init.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(View.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(View.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(View.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (child instanceof View) {
        child.dispatchComponentDidMount();
      } else {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });
      }
    });
  }

  componentDidMount(oldProps: props = {}): void {
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(View.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: props, newProps: props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: props, newProps: props) {
    return true;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }
    const { children, props } = this._getChildren(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);
  };

  get element(): HTMLElement {
    return this._element;
  }

  compile(template: string, props: TProps): DocumentFragment {
    const propsAndStubs = { ...props };
    const arrayChildren = {};
    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof View) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      } else {
        arrayChildren[key] = makeUUID();
        propsAndStubs[key] = `<div data-id="${arrayChildren[key]}"></div>`;
      }
    });
    const fragment: HTMLTemplateElement = this._createDocumentTemplate();

    fragment.innerHTML = pug.render(template, propsAndStubs);

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof View) {
        const stub: HTMLElement | null = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      } else {
        const stub: HTMLElement | null = fragment.content.querySelector(`[data-id="${arrayChildren[key]}"]`);
        const subFragment = this._createDocumentTemplate();
        child.forEach((item) => {
          subFragment.content.append(item.getContent());
        });
        if (stub) {
          stub.replaceWith(subFragment.content);
        }
      }
    });
    return fragment.content;
  }

  private _render(): void {
    this._removeEvents();
    const element = document.createElement('div');
    element.append(this.render());
    if (!this._element || !this._element.parentElement) {
      this._element = element.firstChild as HTMLElement;
    } else {
      this._element.innerHTML = '';
      this._element.append(element.firstChild as HTMLElement);
    }
    this._addEvents();
  }

  render(): DocumentFragment;

  // @ts-ignore
  getContent(): HTMLElement {
    return this._element as HTMLElement;
  }

  private _makePropsProxy(props: TProps): TProps {
    const self = this;
    return new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: TProps, prop: string, value: string | number | TProps) {
        target[prop] = value;

        self.eventBus().emit(View.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  private _makeChildrenProxy(children: children): children {
    const self = this;
    return new Proxy(children, {
      get(target: children, child: string) {
        const value: child = target[child];
        return value;
      },
      set(target: children, child: string, value: child) {
        target[child] = value;

        self.eventBus().emit(View.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  private _createDocumentTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.setAttribute('data-id', this._id);
    return template;
  }

  private _addEvents():void {
    if (this._element) {
      const { events = {} } = this.props;
      Object.keys(events).forEach((eventName) => {
        this._element.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents():void {
    if (this._element) {
      const { events = {} } = this.props;
      Object.keys(events).forEach((eventName) => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }
}
