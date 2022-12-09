import { render as registerPage } from '../../views/pages/register/index';
import {Controller} from "../Controller";
import {View} from "../../utils/view";
import API, {catchAPIError, HTTPError} from "../../utils/API";
import {Router} from "../../utils/routing/router";
import Auth from "../../services/Auth";

export class RegisterController extends Controller {
  index():InstanceType<typeof View> {
    return registerPage();
  }

  register(props: FormData):void {
    const api = new API();
    api.endpoints.auth['signUp'].post(props).then((e:XMLHttpRequest) => {
        const AuthService = new Auth();
        AuthService.authorize().then(() => {
          const router = new Router();
          router.go('/');
        });
    }).catch((error:HTTPError) => {
      catchAPIError(error);
    });
  }
}
