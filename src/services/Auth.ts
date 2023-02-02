import User from '../models/User';
import API, {catchAPIError, HTTPError} from "../utils/API";

export default class Auth {
    private static _instance:Auth|null;
    user:User|null = null;
    constructor() {
        if (Auth._instance) {
            return Auth._instance;
        }
        Auth._instance = this;
    }

    authorize():Promise<boolean> {
        return new Promise((resolve, reject) => {
            const api = new API();
                api.endpoints.auth['user'].get().then((e: XMLHttpRequest) => {
                    let data;
                    try {
                        data = JSON.parse(e.response);
                    } catch {
                        throw new Error('JSON Parse error');
                    }
                    this.user = new User(data);
                    resolve(true);
                }).catch((error:HTTPError) => {
                    catchAPIError(error);
                    resolve(false);
                });
        });
    }

    update():Promise<boolean> {
        const api = new API();
        const data = new FormData();
        // @ts-ignore
        data.set('id', this.user.id.toString());
        return new Promise(resolve => {
            // @ts-ignore
            api.endpoints.users.get(data).then((e:XMLHttpRequest) => {
                let data;
                try {
                    data = JSON.parse(e.response);
                } catch {
                    throw new Error('JSON Parse error');
                }
                this.user = new User(data);
                resolve(true);
            }).catch((error:HTTPError) => {
                catchAPIError(error);
            });
        });
    }

    logout() {
        this.user = null;
    }
}
