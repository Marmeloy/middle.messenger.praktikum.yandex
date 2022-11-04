import { template } from './chat.tmpl';
import './chat.scss';
import { props, child, View } from '../../../../utils/view';

interface TProps extends props {
    header?: child,
    messages?: child,
    footer?: child
}

export class Chat extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      header: this.props.header,
      messages: this.props.messages,
      footer: this.props.footer,
    });
  }
}
