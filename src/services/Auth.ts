import User from '../models/User';
import API from "../utils/API";

export default class Auth {
    private static _instance:Auth|null;
    user:User|null = null;
    constructor() {
        if (Auth._instance) {
            return Auth._instance;
        }
        Auth._instance = this;
    }

    authorize() {
        return new Promise((resolve, reject) => {
            const api = new API();
            api.endpoints.auth['user'].get().then((e:XMLHttpRequest) => {
                if (e.status == 200) {
                    this.user = new User(JSON.parse(e.response));
                }
                resolve(true);
            })
        });
    }

    update() {
        const api = new API();
        const data = new FormData();
        // @ts-ignore
        data.set('id', this.user.id.toString());
        // @ts-ignore
        api.endpoints.users.get(data).then((e:XMLHttpRequest) => {
            if (e.status == 200) {
                this.user = new User(JSON.parse(e.response));
            }
        })
    }

    logout() {
        this.user = null;
    }
}
