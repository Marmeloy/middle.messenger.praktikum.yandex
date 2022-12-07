import {child, View} from "../utils/view";

export type ControllerConstructor = {
    new(): InstanceType<typeof Controller>;
};

export type props = {
    [key: string]: string|number
};

export abstract class Controller{
    constructor() {
    }

    static exec(controllerClass:ControllerConstructor, methodName:string):InstanceType<typeof View>|void {
        const controller = new controllerClass();
        const method = controllerClass.prototype[methodName];
        if (method) {
            return method.call(controller);
        }
    }
}
