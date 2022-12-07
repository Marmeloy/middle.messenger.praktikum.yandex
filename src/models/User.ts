import API from "../utils/API";

export type TProps = {
    id?:number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string|null;
};

export default class User {

    id:number|undefined;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string|null;

    constructor(props:TProps) {
        this.id = props.id;
        this.firstName = props.first_name;
        this.secondName = props.second_name;
        this.displayName = props.display_name;
        this.login = props.login;
        this.email = props.email;
        this.phone = props.phone;
        this.avatar = props.avatar;
    }

    static search(login:string):Promise<User[]> {
        const api = new API();
        const data = new FormData();
        data.set('login', login);
        return new Promise<User[]>(resolve => {
            api.endpoints.users['search'].post(data).then((e:XMLHttpRequest) => {
                const users: User[] = [];
                if (e.status == 200) {
                    const usersData = JSON.parse(e.response);
                    usersData.forEach(item => {
                        users.push(new User(item));
                    })
                }
                resolve(users);
            })
        });
    }
}
