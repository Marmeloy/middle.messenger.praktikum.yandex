import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { View, TDefaultProps } from '../view';
import { render } from '../render';

const dom = new JSDOM(
  `
            <div class="app"></div>`,
  {
    url: 'http://localhost:3000',
  },
);

(global as any).document = dom.window.document;
(global as any).window = dom.window;

const template = 'p.test #{text}';

interface TProps extends TDefaultProps {
    text?: string,
}

class TestComponent extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      text: this.props.text,
    });
  }
}

describe('View', () => {
  afterEach(() => {
    // @ts-ignore
    document.querySelector('.app').innerHTML = '';
  });

  it('should render component', () => {
    const component = new TestComponent({
      text: 'Hello, World!',
    });
    render('.app', component);
    // @ts-ignore
    expect(document.querySelector('.app').innerHTML).to.equal('<p class="test">Hello, World!</p>');
  });

  it('should rerender component after update props', () => {
    const component = new TestComponent({
      text: 'Hello, World!',
    });
    render('.app', component);
    component.setProps({
      text: 'Good Bye, World!',
    });
    // @ts-ignore
    expect(document.querySelector('.app').innerHTML).to.equal('<p class="test">Good Bye, World!</p>');
  });
});
