import { child, props, View } from '../../../utils/view';
import { template } from './screen.tmpl';
import './screen.scss';

interface TProps extends props {
  content?: child,
  back?: string
}

export class Screen extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
      back: this.props.back,
    });
  }
}
