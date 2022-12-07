import {template} from './chat.tmpl';
import './chat.scss';
import {props, child, View} from '../../../../utils/view';
import MChat from '../../../../models/Chat';
import {Header} from "../header";
import {Messages} from "../messages";
import {Footer} from "../footer";
import {Form} from "../../form";
import {MessengerController} from "../../../../controllers/messenger/MessengerController";
import {EventBus} from "../../../../utils/event-bus";

interface TProps extends props {
    chat?: MChat,
    header?: child,
    messages?: child,
    footer?: child,
}

export class Chat extends View<TProps> {
    constructor(propsAndChildren: TProps) {
        super('div', propsAndChildren);

        const messages = new Messages({});

        const footer = new Footer({});

        const form = new Form({
            content: footer,
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    if (footer.validate()) {
                        const messengerController = new MessengerController();
                        messengerController.sendMessage(form.getData());
                        footer.clear();
                    }
                    return false;
                },
            },
        });

        this.setProps({
            messages,
            footer: form,
        });

    }

    render(): DocumentFragment {
        return this.compile(template, {
            header: this.props.header,
            messages: this.props.messages,
            footer: this.props.footer,
            chat: this.props.chat
        });
    }

    switchChat(chat: MChat) {
        this.setProps({
            chat,
            header: new Header({
                name: chat.title,
                chat: chat
            }),
            messages: new Messages({
                messages: [],
            })
        });
    }
}
