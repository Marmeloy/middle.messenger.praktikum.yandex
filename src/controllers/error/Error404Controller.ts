import { render } from '../../utils/render';
import { render as errorPage } from '../../views/pages/error404/index';

export class Error404Controller {
  index():void {
    render('#page', errorPage());
  }
}
