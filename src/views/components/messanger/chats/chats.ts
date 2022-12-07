import { template } from './chats.tmpl';
import './chats.scss';
import {child, props, View} from '../../../../utils/view';
import Chat from "../../../../models/Chat";


interface TProps extends props {
    chats?: Chat[],
    button?: child
}

export class Chats extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      chats: this.props.chats,
      button: this.props.button
    });
  }
}
