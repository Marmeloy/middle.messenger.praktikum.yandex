import { template } from './button.tmpl';
import './button.scss';
import { props, View } from '../../../utils/view';

interface TProps extends props {
  link?: string,
  color?: string,
  title?: string
}

export class Button extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      link: this.props.link,
      color: this.props.color,
      title: this.props.title,
    });
  }
}
