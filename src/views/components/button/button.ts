import { template } from './button.tmpl';
import './button.scss';
import { TDefaultProps, View } from '../../../utils/view';

interface TProps extends TDefaultProps {
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
