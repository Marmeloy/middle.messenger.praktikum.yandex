import {template} from './header.tmpl';
import './header.scss';
import {props, View, child} from '../../../../utils/view';
import {Button} from "../../button";
import {Modal} from "../../modal";
import {Form, Submit, TextField} from "../../form";
import Chat from "../../../../models/Chat";
import {MessengerController} from "../../../../controllers/messenger/MessengerController";

interface TProps extends props {
    name?: string,
    addButton?: child,
    removeButton?: child,
    modal?: child,
    isOpen?: boolean,
    chat?: Chat
}

export class Header extends View<TProps> {
    constructor(propsAndChildren: TProps) {
        propsAndChildren.events = {
            click: (e: Event) => {
                let target = e.target as HTMLElement;
                if (target.classList.contains('chat-header__actions-button') || target.closest('.chat-header__actions-button')) {
                    this.setProps({
                        isOpen: !this.props.isOpen
                    })
                }
            }
        };
        super('div', propsAndChildren);
        const modal = new Modal({});
        const addButton = new Button({
            title: 'Добавить пользователя',
            events: {
                click: (e: Event) => {
                    this.openNewUserModal(modal);
                }
            }
        });
        const removeButton = new Button({
            title: 'Удалить пользователя',
            events: {
                click: (e: Event) => {
                    this.openRemoveUserModal(modal);
                }
            }
        });
        this.setProps({
            modal, addButton, removeButton
        })
    }

    render(): DocumentFragment {
        return this.compile(template, {
            name: this.props.name,
            addButton: this.props.addButton,
            removeButton: this.props.removeButton,
            modal: this.props.modal,
            isOpen: this.props.isOpen
        });
    }

    openNewUserModal(modal): void {
        const loginField = new TextField({
            label: 'Логин',
            name: 'login'
        });
        const form = new Form({
            content: [
                loginField,
                new Submit({
                    title: 'Добавить'
                })
            ],
            events: {
                submit: (e:Event) => {
                    e.preventDefault();
                    if (loginField.validate('login')) {
                        const messengerController = new MessengerController();
                        // @ts-ignore
                        messengerController.addUserToChat(this.props.chat.id,form.getData().get('login')).then((status) => {
                            if (status) {
                                modal.setProps({
                                    isOpen: false
                                });
                            }
                        });
                    }
                }
            }
        });
        modal.setProps({
            title: 'Добавить пользователя',
            content: form,
            isOpen: true
        })
    }

    openRemoveUserModal(modal): void {
        const loginField = new TextField({
            label: 'Логин',
            name: 'login'
        });
        const form = new Form({
            content: [
                loginField,
                new Submit({
                    title: 'Удалить'
                })
            ],
            events: {
                submit: (e:Event) => {
                    if (loginField.validate('login')) {
                        const messengerController = new MessengerController();
                        // @ts-ignore
                        messengerController.removeUserFromChat(this.props.chat.id,form.getData().get('login')).then((status) => {
                            if (status) {
                                modal.setProps({
                                    isOpen: false
                                });
                            }
                        });
                    }
                }
            }
        });
        modal.setProps({
            title: 'Удалить пользователя',
            content: form,
            isOpen: true
        })
    }
}
