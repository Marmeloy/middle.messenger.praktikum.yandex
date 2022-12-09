import {Router} from "../utils/routing/router";
import Auth from "../services/Auth";

export const guest = ():boolean => {
    const AuthService = new Auth();
    if (AuthService.user != null) {
        const router = new Router();
        router.go('/');
        return false;
    }
    return true;
}
