import { render as errorPage } from '../../views/pages/error404/index';
import {Controller} from "../Controller";
import {View} from "../../utils/view";

export class Error404Controller extends Controller {
  index():InstanceType<typeof View> {
    return errorPage();
  }
}
