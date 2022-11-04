import { template } from './profile.tmpl';
import './profile.scss';
import { Screen } from '../../layouts/screen';
import { Form, TextField, Submit } from '../../components/form';
// @ts-ignore
import avatarUrl from '../../../../static/images/icons/avatar.svg';
import { child, props, View } from '../../../utils/view';

interface TProps extends props {
    avatar?: string,
    name?: string,
    content?: child,
}

class Profile extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
      avatar: this.props.avatar,
      name: this.props.name,
    });
  }
}

export function render() {
  const emailField:TextField = new TextField({
    name: 'email',
    label: 'Почта',
    orientation: 'horizontal',
    value: 'pochta@yandex.ru',
    error: 'Некорректная почта',
    events: {
      focusout: () => emailField.validate('email'),
    },
  });
  const loginField:TextField = new TextField({
    name: 'login',
    label: 'Логин',
    orientation: 'horizontal',
    value: 'ivanivanov',
    events: {
      focusout: () => loginField.validate('login'),
    },
  });
  const firstNameField:TextField = new TextField({
    name: 'first_name',
    label: 'Имя',
    orientation: 'horizontal',
    value: 'Иван',
    error: 'Некорректное имя',
    events: {
      focusout: () => firstNameField.validate('name'),
    },
  });
  const secondNameField:TextField = new TextField({
    name: 'second_name',
    label: 'Фамилия',
    orientation: 'horizontal',
    value: 'Иванов',
    error: 'Некорректное имя',
    events: {
      focusout: () => secondNameField.validate('name'),
    },
  });
  const displayNameField:TextField = new TextField({
    name: 'display_name',
    label: 'Имя в чате',
    orientation: 'horizontal',
    value: 'Иван',
    error: 'Некорректное имя',
    events: {
      focusout: () => secondNameField.validate('name'),
    },
  });
  const phoneField:TextField = new TextField({
    name: 'phone',
    label: 'Телефон',
    orientation: 'horizontal',
    value: '+7 (909) 967 30 30',
    error: 'Некорректный телефон',
    events: {
      focusout: () => phoneField.validate('phone'),
    },
  });
  const form:Form = new Form({
    content: [
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      displayNameField,
      phoneField,
      new Submit({
        color: 'blue',
        title: 'Сохранить',
      }),
    ],
    events: {
      submit: (e:Event) => {
        e.preventDefault();
        loginField.validate('login');
        emailField.validate('email');
        firstNameField.validate('name');
        secondNameField.validate('name');
        phoneField.validate('phone');
        console.log(form.getData());
      },
    },
  });
  return new Screen({
    content: new Profile({
      name: 'Иван',
      avatar: avatarUrl,
      content: form,
    }),
    back: '/',
  });
}
