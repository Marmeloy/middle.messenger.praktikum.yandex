import { render } from '../../utils/render';
import { render as loginPage } from '../../views/pages/login/index';

export class AuthController {
  index():void {
    render('#page', loginPage());
  }
}
