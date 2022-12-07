import Message, {TProps as TMessageProps} from './Message';

export type TProps = {
    id:number,
    title:string,
    avatar:string,
    unread_count: number,
    last_message?: TMessageProps,
}


export default class Chat {
    id:number;
    title:string;
    avatar:string;
    unreadCount:number;
    lastMessage: Message|null;
    constructor(props: TProps) {
        this.id = props.id;
        this.title = props.title;
        this.avatar = props.avatar;
        this.unreadCount = props.unread_count;
        this.lastMessage = props.last_message ? new Message(props.last_message) : null;
    }
}
