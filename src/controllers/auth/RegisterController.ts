import { render } from '../../utils/render';
import { render as registerPage } from '../../views/pages/register/index';

export class RegisterController {
  index():void {
    render('#page', registerPage());
  }
}
