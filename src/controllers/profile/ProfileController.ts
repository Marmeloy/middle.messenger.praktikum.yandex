import { render as profilePage } from '../../views/pages/profile/index';
import { Controller } from '../Controller';
import { View } from '../../utils/view';
import Auth from '../../services/Auth';
import User from '../../models/User';
import API from '../../utils/API';

export class ProfileController extends Controller {
  index():InstanceType<typeof View> {
    const AuthService = new Auth();
    return profilePage(AuthService.user as User);
  }

  changePassword(props: FormData):Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const api = new API();
      api.endpoints.users['password'].put(props).then((e:XMLHttpRequest) => {
        resolve(e.status === 200);
      });
    });
  }

  changeAvatar(props: FormData):Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const api = new API();
      api.endpoints.users['profile'].avatar.put(props).then((e:XMLHttpRequest) => {
        resolve(e.status === 200);
      });
    });
  }

  changeProfile(props: FormData):Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const api = new API();
      api.endpoints.users['profile'].put(props).then((e:XMLHttpRequest) => {
        if (e.status === 200) {
          const authService = new Auth();
          authService.update().then();
        }
        resolve(e.status === 200);
      }).catch();
    });
  }
}
