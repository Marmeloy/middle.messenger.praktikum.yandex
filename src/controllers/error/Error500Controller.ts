import { render } from '../../utils/render';
import { render as errorPage } from '../../views/pages/error500/index';

export class Error500Controller {
  index():void {
    render('#page', errorPage());
  }
}
