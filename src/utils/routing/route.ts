import { render } from '../render';
import { Controller, ControllerConstructor } from '../../controllers/Controller';
import { View } from '../view';

type props = {
    rootQuery: string,
}

function isEqual(lhs:string, rhs:string):boolean {
  return lhs === rhs;
}

export class Route {
  private _pathname:string;

  private readonly _controller:ControllerConstructor;

  private readonly _controllerMethod:string;

  private _block:InstanceType<typeof View> | null;

  private _props:props;

  middleware:() => boolean;

  constructor(pathname: string, controller:ControllerConstructor, method: string, middleware: () => boolean, props:props) {
    this._pathname = pathname;
    this._controller = controller;
    this._controllerMethod = method;
    this._block = null;
    this._props = props;
    this.middleware = middleware;
  }

  navigate(pathname):void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave():void {
    if (this._block) {
      const rootElement = document.querySelector(this._props.rootQuery);
      if (rootElement) {
        rootElement.innerHTML = '';
      }
    }
  }

  match(pathname:string):boolean {
    return isEqual(pathname, this._pathname);
  }

  render():void {
    if (!this._block) {
      this._block = Controller.exec(this._controller, this._controllerMethod) as InstanceType<typeof View>;
    }
    render(this._props.rootQuery, this._block);
  }
}
