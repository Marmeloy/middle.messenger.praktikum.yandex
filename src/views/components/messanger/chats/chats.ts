import { template } from './chats.tmpl';
import './chats.scss';
import {TChild, TDefaultProps, View} from '../../../../utils/view';
import Chat from "../../../../models/Chat";


interface TProps extends TDefaultProps {
    chats?: Chat[],
    button?: TChild
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
