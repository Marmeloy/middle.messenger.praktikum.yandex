export default class Singleton {
    private static _instance: Singleton;
    protected constructor() {
        if (Singleton._instance) {
            return Singleton._instance;
        }
        Singleton._instance = this;
    }

    public static getInstance():Singleton {
        return this._instance;
    }
}
