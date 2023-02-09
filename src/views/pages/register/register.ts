import { template } from './register.tmpl';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Screen } from '../../layouts/screen';
import { TextField, Submit, Form } from '../../components/form';
import { TChild, TDefaultProps, View } from '../../../utils/view';
import { RegisterController } from '../../../controllers/auth/RegisterController';

interface TProps extends TDefaultProps {
  content?: TChild,
}

export class Register extends View<TProps> {
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
  const emailField:TextField = new TextField({
    label: 'Почта',
    name: 'email',
    error: 'Некорректная почта',
    events: {
      focusout: () => emailField.validate('email'),
    },
  });
  const loginField:TextField = new TextField({
    label: 'Логин',
    name: 'login',
    error: 'Некорректный логин',
    events: {
      focusout: () => loginField.validate('login'),
    },
  });
  const firstNameField:TextField = new TextField({
    label: 'Имя',
    name: 'first_name',
    error: 'Некорректное имя',
    events: {
      focusout: () => firstNameField.validate('name'),
    },
  });
  const secondNameField:TextField = new TextField({
    label: 'Фамилия',
    name: 'second_name',
    error: 'Некорректное имя',
    events: {
      focusout: () => secondNameField.validate('name'),
    },
  });
  const phoneField:TextField = new TextField({
    label: 'Телефон',
    name: 'phone',
    error: 'Некорректный телефон',
    events: {
      focusout: () => phoneField.validate('phone'),
    },
  });
  const passwordField:TextField = new TextField({
    label: 'Пароль',
    name: 'password',
    error: 'Некорректный пароль',
    events: {
      focusout: () => passwordField.validate('password'),
    },
  });
  const repeatPasswordField:TextField = new TextField({
    label: 'Пароль (ещё раз)',
    name: 'repeatPassword',
    error: 'Некорректный пароль',
    events: {
      focusout: () => repeatPasswordField.validate('password'),
    },
  });
  const form:Form = new Form({
    content: new Card({
      title: 'Регистрация',
      content: [
        emailField,
        loginField,
        firstNameField,
        secondNameField,
        phoneField,
        passwordField,
        repeatPasswordField,
      ],
      footer: [
        new Submit({
          title: 'Зарегистрироваться',
          color: 'blue',
        }),
        new Button({
          title: 'Войти',
          link: '/login.html',
        }),
      ],
    }),
    events: {
      submit: (e) => {
        e.preventDefault();
        if (loginField.validate('login')
          && passwordField.validate('password')
          && repeatPasswordField.validate('password')
          && emailField.validate('email')
          && firstNameField.validate('name')
          && secondNameField.validate('name')
          && phoneField.validate('phone')) {
          const registerController = new RegisterController();
          registerController.register(form.getData());
        }
      },
    },
  });
  return new Screen({
    content: form,
  });
}
