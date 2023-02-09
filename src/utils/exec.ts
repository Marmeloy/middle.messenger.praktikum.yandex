import { Controller, ControllerConstructor } from '../controllers/Controller';
import { View } from './view';

export function exec(controller:ControllerConstructor, methodName:string, ...args) {
  const method = this._controllerMethod.call(this._controller, args);
}
