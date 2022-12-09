import {render as messengerPage} from '../../views/pages/messenger/index';
import {Controller} from "../Controller";
import {View} from "../../utils/view";
import API, {TEndpoint, HTTPError, catchAPIError} from "../../utils/API";
import Chat from "../../models/Chat";
import Auth from "../../services/Auth";
import User from "../../models/User";
import {EventBus} from "../../utils/event-bus";
import Message, {TProps as TMessageProps} from "../../models/Message";

export class MessengerController extends Controller {

    private static _instance: MessengerController | null;
    private socket: WebSocket;
    chats: Chat[] = [];
    eventBus: EventBus;

    constructor() {
        super();
        if (MessengerController._instance) {
            return MessengerController._instance;
        }
        MessengerController._instance = this;

        this.eventBus = new EventBus();
    }

    index(): InstanceType<typeof View> {
        return messengerPage();
    }

    loadChats(): Promise<Chat[]> {
        const api = new API();
        const endpoint = api.endpoints.chats.get as TEndpoint;
        this.chats = [];
        return new Promise<Chat[]>((resolve) => {
            endpoint().then((e: XMLHttpRequest) => {
                let data;
                try {
                    data = JSON.parse(e.response);
                } catch {
                    throw new Error('JSON Parse error');
                }
                data.forEach((item) => {
                    this.chats.push(new Chat(item));
                });
                resolve(this.chats);
            }).catch((error: HTTPError) => {
                catchAPIError(error);
            });
        });
    }

    getChat(id: number): Chat | null {
        const chat: Chat[] = this.chats.filter((value) => {
            return value.id == id;
        });
        return chat.length > 0 ? chat[0] : null;
    }

    private getWSToken(id: number): Promise<string> {
        const api = new API();
        const endpoint = api.endpoints.chats['token'].post as TEndpoint;
        const data = new FormData();
        data.append('id', id.toString());
        return new Promise<string>(resolve => {
            endpoint(data).then((e: XMLHttpRequest) => {
                let token = '';
                try {
                    const response = JSON.parse(e.response);
                    token = response.token;
                } catch {
                    throw new Error('JSON Parse error');
                }
                resolve(token);
            }).catch((error: HTTPError) => {
                catchAPIError(error);
            });
        });
    }

    openChat(id: number): Chat | null {
        const chat = this.getChat(id);
        if (chat) {
            this.getWSToken(id).then(token => {
                const authService = new Auth();
                const user = authService.user as User;
                this.socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' + user.id + '/' + id + '/' + token);
                this.socket.addEventListener('message', this.messageListener.bind(this));
                this.socket.addEventListener('open', () => {
                    this.getMessages(id);
                });
            });
        }
        return chat;
    }

    private messageListener(event: MessageEvent) {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch {
            throw new Error('JSON Parse error');
        }
        const messages: Message[] = [];
        if (Array.isArray(data)) {
            data.forEach((message: TMessageProps) => {
                if (message.type == 'message') {
                    messages.push(new Message(message));
                }
            });
            messages.reverse();
        } else {
            if (data.type == 'message') {
                messages.push(new Message(data));
            }
        }
        this.eventBus.emit('new-messages', messages);
    }

    private getMessages(id: number, offset: number = 0) {
        this.socket.send(JSON.stringify({
            content: offset.toString(),
            type: 'get old'
        }));
    }

    sendMessage(props: FormData) {
        this.socket.send(JSON.stringify({
            content: props.get('message'),
            type: 'message'
        }));
    }

    addUserToChat(chatID: number, login: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            User.search(login).then((users: User[]) => {
                if (users.length > 0) {
                    const api = new API();
                    const data = new FormData();
                    // @ts-ignore
                    data.set('user', users[0].id.toString());
                    data.set('chat', chatID.toString());
                    api.endpoints.chats['users'].put(data).then((e: XMLHttpRequest) => {
                        resolve(e.status == 200)
                    });
                }
            });
        });
    }

    removeUserFromChat(chatID: number, login: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            User.search(login).then((users: User[]) => {
                if (users.length > 0) {
                    const api = new API();
                    const data = new FormData();
                    // @ts-ignore
                    data.set('user', users[0].id.toString());
                    data.set('chat', chatID.toString());
                    api.endpoints.chats['users'].delete(data).then((e: XMLHttpRequest) => {
                        resolve(e.status == 200)
                    })
                }
            });
        });
    }

    createChat(props: FormData): Promise<boolean> {
        const api = new API();
        const endpoint = api.endpoints.chats.post as TEndpoint;
        return new Promise(resolve => {
            endpoint(props).then((e: XMLHttpRequest) => {
                resolve(true);
            }).catch((error: HTTPError) => {
                catchAPIError(error);
            })
        });
    }

    deleteChat(id: number): Promise<boolean> {
        const api = new API();
        const data = new FormData();
        data.set('id', id.toString());
        const endpoint = api.endpoints.chats.delete as TEndpoint;
        return new Promise<boolean>(resolve => {
            endpoint(data).then((e: XMLHttpRequest) => {
                resolve(true)
            }).catch((error: HTTPError) => {
                catchAPIError(error);
            });
        });
    }
}
