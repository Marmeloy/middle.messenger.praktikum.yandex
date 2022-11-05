import { template } from './login.tmpl';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Screen } from '../../layouts/screen';
import { Form, TextField, Submit } from '../../components/form';
import { child, props, View } from '../../../utils/view';

interface TProps extends props {
    content?: child,
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
          link: '/register.html',
        }),
      ],
    }),
    events: {
      submit: (e:Event) => {
        e.preventDefault();
        loginField.validate('login');
        passwordField.validate('password');
        console.log(form.getData());
      },
    },
  });
  return new Login({
    content: new Screen({
      content: form,
    }),
  });
}
