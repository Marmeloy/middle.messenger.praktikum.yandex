import { template } from './chats.tmpl';
import './chats.scss';
import { props, View } from '../../../../utils/view';
import { chat } from '../../../../utils/types';

interface TProps extends props {
    chats?: chat[],
}

export class Chats extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      chats: this.props.chats,
    });
  }
}
