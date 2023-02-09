import HTTPTransport, { TOptions, HTTPError } from './HTTPTransport';
import Auth from '../services/Auth';
import { Router } from './routing/router';

export { HTTPError };

export type TEndpoint = (data?: FormData) => Promise<XMLHttpRequest>;
type TEndpoints = {
    get?: TEndpoint,
    post?: TEndpoint,
    delete?: TEndpoint,
    put?: TEndpoint,
};
type TRoutes = { [key: string]: TRoutes | TEndpoints }

export function catchAPIError(error: HTTPError):never|void {
  const code = error.code ? error.code : null;
  if (!code || code !== 401) {
    throw Error(error.message);
  } else {
    const authService = new Auth();
    authService.logout();
    const router = new Router('.app');
    router.go('/login');
  }
}

export default class API {
  readonly location = 'https://ya-praktikum.tech/api/v2/';

  endpoints:TRoutes;

  private static _instance: API|null;

  constructor() {
    if (API._instance) {
      return API._instance;
    }
    API._instance = this;

    const http = new HTTPTransport();
    this.endpoints = {
      auth: {
        signIn: {
          post: (data: FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                login: data.get('login'),
                password: data.get('password'),
              }),
            };
            return http.post(`${this.location}auth/signin`, options);
          },
        },
        signUp: {
          post: (data: FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                first_name: data.get('first_name'),
                second_name: data.get('second_name'),
                login: data.get('login'),
                password: data.get('password'),
                email: data.get('email'),
                phone: data.get('phone'),
              }),
            };
            return http.post(`${this.location}auth/signup`, options);
          },
        },
        user: {
          get: (data: FormData):Promise<XMLHttpRequest> => http.get(`${this.location}auth/user`),
        },
        logout: {
          post: ():Promise<XMLHttpRequest> => http.post(`${this.location}auth/logout`),
        },
      },
      chats: {
        post: (data: FormData):Promise<XMLHttpRequest> => {
          const options = {
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify({
              title: data.get('title'),
            }),
          };
          return http.post(`${this.location}chats`, options);
        },
        get: ():Promise<XMLHttpRequest> => http.get(`${this.location}chats`),
        delete: (data: FormData):Promise<XMLHttpRequest> => {
          const options = {
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify({
              chatId: data.get('id'),
            }),
          };
          return http.delete(`${this.location}chats`, options);
        },
        token: {
          post: (data: FormData):Promise<XMLHttpRequest> => http.post(`${this.location}chats/token/${data.get('id')}`),
        },
        users: {
          put: (data: FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                users: [data.get('user')],
                chatId: data.get('chat'),
              }),
            };
            return http.put(`${this.location}chats/users`, options);
          },
          delete: (data: FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                users: [data.get('user')],
                chatId: data.get('chat'),
              }),
            };
            return http.delete(`${this.location}chats/users`, options);
          },
        },
      },
      users: {
        get: (data:FormData):Promise<XMLHttpRequest> => http.get(`${this.location}user/${data.get('id')}`),
        search: {
          post: (data:FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                login: data.get('login'),
              }),
            };
            return http.post(`${this.location}user/search`, options);
          },
        },
        password: {
          put: (data:FormData):Promise<XMLHttpRequest> => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                oldPassword: data.get('oldPassword'),
                newPassword: data.get('newPassword'),
              }),
            };
            return http.put(`${this.location}user/password`, options);
          },
        },
        profile: {
          put: (data:FormData) => {
            const options = {
              headers: {
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                first_name: data.get('first_name'),
                second_name: data.get('second_name'),
                display_name: data.get('display_name'),
                login: data.get('login'),
                phone: data.get('phone'),
                email: data.get('email'),

              }),
            };
            return http.put(`${this.location}user/profile`, options);
          },
          avatar: {
            put: (data:FormData):Promise<XMLHttpRequest> => {
              const options = {
                data,
              };
              return http.put(`${this.location}user/profile/avatar`, options);
            },
          },
        },
      },
    };
  }
}
