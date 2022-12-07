import { render as errorPage } from '../../views/pages/error500/index';
import {Controller} from "../Controller";
import {View} from "../../utils/view";

export class Error500Controller extends Controller {
  index():InstanceType<typeof View> {
    return errorPage();
  }
}
