import { template } from './card.tmpl';
import './card.scss';
import { child, props, View } from '../../../utils/view';

interface TProps extends props {
  title?: string,
  content?: child,
  footer?: child
}

export class Card extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      title: this.props.title,
      content: this.props.content,
      footer: this.props.footer,
    });
  }
}
