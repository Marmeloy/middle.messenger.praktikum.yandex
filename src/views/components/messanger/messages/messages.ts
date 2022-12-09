import { template } from './messages.tmpl';
import './messages.scss';
import { TChild, TDefaultProps, View } from '../../../../utils/view';
import { Status, Text } from '../message';
import {MessengerController} from "../../../../controllers/messenger/MessengerController";
import Message from "../../../../models/Message";

interface TProps extends TDefaultProps {
    content?: TChild
}

export class Messages extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
    const messengerController = new MessengerController();
    messengerController.eventBus.on('new-messages', this.pushMessages.bind(this))
    this.setProps({
      content: []
    });
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
    });
  }

  pushMessages(newMessages:Message[]) {
    const content:TChild = this.props.content as TChild;
    newMessages.forEach(message => {
      // @ts-ignore
      content.push(new Text({
        ingoing: message.ingoing,
        content: message.content,
        status: new Status({
          status: message.isRead,
          time: message.time.getHours().toString() + ':' + message.time.getMinutes().toString(),
        }),
      }));
    });
    this.setProps({
      content
    });
  }
}
