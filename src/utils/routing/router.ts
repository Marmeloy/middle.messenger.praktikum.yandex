import { Route } from './route';
import { ControllerConstructor } from '../../controllers/Controller';

export class Router{

    routes:Route[];
    history: History;

    private _currentRoute:Route | null;
    private readonly _rootQuery:string;

    private static _instance: Router|null;

    constructor(rootQuery: string = '') {
        if (Router._instance) {
            return Router._instance;
        }
        Router._instance = this;
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
    }

    use<T>(pathname:string, controller: ControllerConstructor, method: string, middleware: () => boolean = () => { return true; }):Router {
        const route = new Route(pathname, controller, method, middleware, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start():void {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);

        // Событие на все ссылки в приложении для открытие ссылок без обновления страницы
        document.addEventListener('click', (e:Event) => {
            const target = e.target as Element;
            const link = target.getAttribute('href');
            const regex = new RegExp('^[\.\/]+(.+)?');
            if (target
                && target.tagName == 'A'
                && target.getAttribute('target') != '_blank'
                && link && regex.test(link)) {
                e.preventDefault();
                const matches = regex.exec(link) as RegExpMatchArray;
                this.go('/'+matches[1]);
            }
            return false;
        });
    }

    _onRoute(pathname):void {
        const route = this.getRoute(pathname);
        if (route && route.middleware()) {
            if (this._currentRoute) {
                this._currentRoute.leave();
            }

            this._currentRoute = route;
            route.render();
        }
    }

    go(pathname:string):void {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back():void {
        this.history.back();
    }

    forward():void {
        this.history.forward();
    }

    getRoute(pathname:string):Route|undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
