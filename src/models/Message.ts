import User, {TProps as TUserProps} from './User';
import Auth from "../services/Auth";
export type TProps = {
    user?: TUserProps,
    user_id?: number,
    time: string,
    content: string
    chat_id?: number,
    is_read?: boolean,
    type?: string,
}

export default class Message {
    user: User|null;
    userID: number|undefined;
    time:Date;
    content:string
    chatID: number|undefined;
    isRead: boolean|undefined;
    type: string|undefined;
    ingoing: boolean = false;
    constructor(props: TProps) {
        const authService = new Auth();
        const user = authService.user as User;
        this.userID = props.user_id;
        this.user = props.user ? new User(props.user) : null;
        if (this.user && !this.userID) {
            this.userID = this.user.id;
        }
        this.chatID = props.user_id;
        this.isRead = props.is_read;
        this.type = props.type;
        this.time = new Date(props.time);
        this.content = props.content;
        if (this.userID) {
            this.ingoing = this.userID != user.id;
        }
    }
}
