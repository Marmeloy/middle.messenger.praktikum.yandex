import { template } from './login.tmpl';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Screen } from '../../layouts/screen';
import { Form, TextField, Submit } from '../../components/form';
import { TChild, TDefaultProps, View } from '../../../utils/view';
import {AuthController} from "../../../controllers/auth/AuthController";

interface TProps extends TDefaultProps {
    content?: TChild,
}

class Login extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render(): DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
    });
  }
}

export function render() {
  const loginField = new TextField({
    label: 'Логин',
    name: 'login',
    error: 'Неверный логин',
    events: {
      focusout: () => loginField.validate('login'),
    },
  });
  const passwordField = new TextField({
    label: 'Пароль',
    name: 'password',
    error: 'Неверный пароль',
    events: {
      focusout: () => passwordField.validate('password'),
    },
  });

  const form = new Form({
    content: new Card({
      title: 'Вход',
      content: [
        loginField,
        passwordField,
      ],
      footer: [
        new Submit({
          title: 'Авторизоваться',
          color: 'blue',
        }),
        new Button({
          title: 'Нет аккаунта?',
          link: '/register',
        }),
      ],
    }),
    events: {
      submit: (e:Event) => {
        e.preventDefault();
        let isValid = loginField.validate('login') && passwordField.validate('password');
        if (isValid) {
          const authController = new AuthController();
          authController.login(form.getData());
        }
      },
    },
  });
  return new Login({
    content: new Screen({
      content: form,
    }),
  });
}
