import { Router } from './utils/routing/router';
import { MessengerController } from './controllers/messenger/MessengerController';
import { AuthController } from './controllers/auth/AuthController';
import { RegisterController } from './controllers/auth/RegisterController';
import { ProfileController } from './controllers/profile/ProfileController';
import { auth } from './middlewares/auth';
import { guest } from './middlewares/guest';
import Auth from './services/Auth';
import { Error404Controller } from './controllers/error/Error404Controller';
import { Error500Controller } from './controllers/error/Error500Controller';
import './styles.scss';

const AuthService = new Auth();
AuthService.authorize().then(() => {
  const router = new Router('.app');
  router
    .use('/', MessengerController, 'index', auth)
    .use('/login', AuthController, 'index', guest)
    .use('/register', RegisterController, 'index', guest)
    .use('/profile', ProfileController, 'index', auth)
    .use('/404', Error404Controller, 'index', auth)
    .use('/500', Error500Controller, 'index', auth)
    .start();
});
