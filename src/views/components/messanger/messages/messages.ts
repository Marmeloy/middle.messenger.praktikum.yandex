import { template } from './messages.tmpl';
import './messages.scss';
import { child, props, View } from '../../../../utils/view';
import { Timestamp } from './timestamp/timestamp';
import { Status, Text } from '../message';
import { message, messages } from '../../../../utils/types';

interface TProps extends props {
    messages?: messages[],
    content?: child,
}

export class Messages extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
    if (this.props.messages && Array.isArray(this.props.messages)) {
      const content:child = [];
      this.props.messages.forEach((group:messages) => {
        content.push(new Timestamp({
          timestamp: group.timestamp,
        }));
        group.messages.forEach((message:message) => {
          if (message.type === 'text') {
            content.push(new Text({
              ingoing: message.ingoing,
              content: message.content,
              status: new Status({
                status: message.status,
                time: message.time,
              }),
            }));
          }
        });
      });
      this.setProps({
        content,
      });
    }
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
    });
  }
}
