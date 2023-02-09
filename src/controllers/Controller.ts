import { View } from '../utils/view';

export type ControllerConstructor = {
    new(): InstanceType<typeof Controller>;
};

export abstract class Controller {
  static exec(ControllerClass:ControllerConstructor, methodName:string):InstanceType<typeof View>|void {
    const controller = new ControllerClass();
    const method = ControllerClass.prototype[methodName];
    if (method) {
      return method.call(controller);
    }
  }
}
