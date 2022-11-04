import { render } from '../../utils/render';
import { render as profilePage } from '../../views/pages/profile/index';

export class ProfileController {
  index():void {
    render('#page', profilePage());
  }
}
