import { template } from './messenger.tmpl';
import './messenger.scss';
import { child, props, View } from '../../../utils/view';
import { Screen } from '../../layouts/screen';
import { Sidebar } from '../../components/sidebar';
import { SearchField } from '../../components/form/fields/search-field';
import {
  Chats, Chat, Footer, Header, Messages,
} from '../../components/messanger';
import { messages, chat } from '../../../utils/types';
import { Form } from '../../components/form';

interface TProps extends props {
    sidebar?: child,
    chat?: child,
}

export class Messenger extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      sidebar: this.props.sidebar,
      chat: this.props.chat,
    });
  }
}

export function render(chats: chat[], messages:messages[]) {
  const footer = new Footer({
    events: {
      focusout: (e:Event) => {
        const target = e.target as HTMLElement;
        if (target && target.tagName === 'INPUT') {
          footer.validate();
        }
      },
    },
  });
  const form = new Form({
    content: footer,
    events: {
      submit: (e:Event) => {
        e.preventDefault();
        footer.validate();
        console.log(form.getData());
        return false;
      },
    },
  });
  return new Screen({
    content: new Messenger({
      sidebar: new Sidebar({
        search: new SearchField({
          name: 'search',
          placeholder: 'Поиск',
        }),
        content: new Chats({
          chats,
        }),
      }),
      chat: new Chat({
        header: new Header({
          name: 'Вадим',
        }),
        messages: new Messages({
          messages,
        }),
        footer: form,
      }),
    }),
  });
}
