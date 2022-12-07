import {template} from './messenger.tmpl';
import './messenger.scss';
import {child, props, View} from '../../../utils/view';
import {Screen} from '../../layouts/screen';
import {Sidebar} from '../../components/sidebar';
import {SearchField} from '../../components/form/fields/search-field';
import {
    Chats, Chat as ChatView, Footer, Header, Messages,
} from '../../components/messanger';
import {Form, Submit, TextField} from '../../components/form';
import {Modal} from '../../components/modal';
import {Button} from "../../components/button";
import {MessengerController} from "../../../controllers/messenger/MessengerController";
import Chat from "../../../models/Chat";


interface TProps extends props {
    sidebar?: child,
    chat?: child,
}

export class Messenger extends View<TProps> {

    currentChat:number|null;

    constructor(propsAndChildren: TProps) {
        super('div', propsAndChildren);
    }

    render(): DocumentFragment {
        return this.compile(template, {
            sidebar: this.props.sidebar,
            chat: this.props.chat,
        });
    }
}

export function render() {
    const modal = new Modal({});
    const messengerController = new MessengerController();
    const chat = new ChatView({});
    const chatsComponent = new Chats({
        chats: [],
        button: new Button({
            title: 'Добавить чат',
            color: 'blue',
            events: {
                click: (e: Event) => {
                    openNewChatModal();
                }
            }
        }),
        events: {
          click: (e:Event) => {
            let target = e.target as HTMLElement;
            if (!target.classList.contains('chat-item') && target.closest('.chat-item')) {
              target = target.closest('.chat-item') as HTMLElement;
            } else {
              return;
            }
            const id = Number(target.getAttribute('data-id'));
            console.log(messenger.currentChat);
            if (messenger.currentChat == null || messenger.currentChat != id) {
                const openChat = messengerController.openChat(id);
                if (openChat) {
                    messenger.currentChat = openChat.id;
                    chat.switchChat(openChat);
                }
            }
          }
        }
    });

    const loadChats = () => {
        messengerController.loadChats().then((chats: Chat[]) => {
            chatsComponent.setProps({
                chats: chats
            })
        });
    };
    loadChats();

    const openNewChatModal = () => {

        const chatName = new TextField({
            label: 'Название чата',
            name: 'title'
        });

        const form = new Form({
            content: [
                chatName,
                new Submit({
                    title: 'Создать',
                    color: 'blue',
                })
            ],
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    console.log('test');
                    if (chatName.validate('string')) {
                        messengerController.createChat(form.getData()).then(() => {
                            modal.setProps({
                                isOpen: false
                            });
                            loadChats();
                        });
                    }
                }
            }
        });

        modal.setProps({
            isOpen: true,
            title: 'Новый чат',
            content: form
        });

    };

    const messenger = new Messenger({
        sidebar: new Sidebar({
            search: new SearchField({
                name: 'search',
                placeholder: 'Поиск',
            }),
            content: chatsComponent,
        }),
        chat: chat,
    });

    return new Screen({
        content: messenger,
        modal: modal
    });
}
