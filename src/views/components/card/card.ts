import { template } from './card.tmpl';
import './card.scss';
import { TChild, TDefaultProps, View } from '../../../utils/view';

interface TProps extends TDefaultProps {
  title?: string,
  content?: TChild,
  footer?: TChild
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
