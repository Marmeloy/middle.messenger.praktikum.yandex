import { render as loginPage } from '../../views/pages/login/index';
import {Controller, props} from "../Controller";
import {View} from "../../utils/view";
import API from '../../utils/API';
import {Router} from "../../utils/routing/router";
import Auth from "../../services/Auth";

export class AuthController extends Controller {

  private static _instance: AuthController|null;

  constructor() {
    super();
    if (AuthController._instance) {
      return AuthController._instance;
    }
    AuthController._instance = this;
  }

  index():InstanceType<typeof View> {
    return loginPage();
  }

  login(props: FormData):void {
    const api = new API();
    api.endpoints.auth['signIn'].post(props).then((e:XMLHttpRequest) => {
      if (e.status == 200) {
        const AuthService = new Auth();
        AuthService.authorize().then(() => {
          const router = new Router();
          router.go('/');
        });
      }
    });
  }

  logout():void {
    const api = new API();
    api.endpoints.auth['logout'].post().then((e:XMLHttpRequest) => {
      if (e.status == 200) {
        const AuthService = new Auth();
        AuthService.logout();
        const router = new Router();
        router.go('/login');
      }
    });
  }
}
