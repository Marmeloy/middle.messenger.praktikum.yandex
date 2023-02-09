import { template } from './header.tmpl';
import './header.scss';
import { TDefaultProps, View, TChild } from '../../../../utils/view';
import { Button } from '../../button';
import { Modal } from '../../modal';
import { Form, Submit, TextField } from '../../form';
import Chat from '../../../../models/Chat';
import { MessengerController } from '../../../../controllers/messenger/MessengerController';

interface TProps extends TDefaultProps {
    name?: string,
    addButton?: TChild,
    removeButton?: TChild,
    removeChatButton?: TChild,
    modal?: TChild,
    isOpen?: boolean,
    chat?: Chat
}

export class Header extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    propsAndChildren.events = {
      click: (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('chat-header__actions-button') || target.closest('.chat-header__actions-button')) {
          this.setProps({
            isOpen: !this.props.isOpen,
          });
        }
      },
    };
    super('div', propsAndChildren);
    const modal = new Modal({});
    const addButton = new Button({
      title: 'Добавить пользователя',
      events: {
        click: (e: Event) => {
          this.openNewUserModal(modal);
        },
      },
    });
    const removeButton = new Button({
      title: 'Удалить пользователя',
      events: {
        click: (e: Event) => {
          this.openRemoveUserModal(modal);
        },
      },
    });
    const removeChatButton = new Button({
      title: 'Удалить чат',
      events: {
        click: (e: Event) => {
          const messengerController = new MessengerController();
          const { chat } = this.props;
          if (chat) {
            messengerController.deleteChat(chat.id).then((result) => {
              if (result) {
                messengerController.eventBus.emit('close-chat');
                messengerController.eventBus.emit('update-chats');
              }
            });
          }
        },
      },
    });

    this.setProps({
      modal, addButton, removeButton, removeChatButton,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      addButton: this.props.addButton,
      removeButton: this.props.removeButton,
      removeChatButton: this.props.removeChatButton,
      modal: this.props.modal,
      isOpen: this.props.isOpen,
      chat: this.props.chat,
    });
  }

  openNewUserModal(modal): void {
    const loginField = new TextField({
      label: 'Логин',
      name: 'login',
    });
    const form = new Form({
      content: [
        loginField,
        new Submit({
          title: 'Добавить',
        }),
      ],
      events: {
        submit: (e:Event) => {
          e.preventDefault();
          if (loginField.validate('login')) {
            const messengerController = new MessengerController();
            // @ts-ignore
            messengerController.addUserToChat(this.props.chat.id, form.getData().get('login')).then((status) => {
              if (status) {
                modal.setProps({
                  isOpen: false,
                });
              }
            });
          }
        },
      },
    });
    modal.setProps({
      title: 'Добавить пользователя',
      content: form,
      isOpen: true,
    });
  }

  openRemoveUserModal(modal): void {
    const loginField = new TextField({
      label: 'Логин',
      name: 'login',
    });
    const form = new Form({
      content: [
        loginField,
        new Submit({
          title: 'Удалить',
        }),
      ],
      events: {
        submit: (e:Event) => {
          if (loginField.validate('login')) {
            const messengerController = new MessengerController();
            // @ts-ignore
            messengerController.removeUserFromChat(this.props.chat.id, form.getData().get('login')).then((status) => {
              if (status) {
                modal.setProps({
                  isOpen: false,
                });
              }
            });
          }
        },
      },
    });
    modal.setProps({
      title: 'Удалить пользователя',
      content: form,
      isOpen: true,
    });
  }
}
