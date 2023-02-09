import { template } from './profile.tmpl';
import './profile.scss';
import { Screen } from '../../layouts/screen';
import { Form, TextField, Submit } from '../../components/form';
import { TChild, TDefaultProps, View } from '../../../utils/view';
import User from '../../../models/User';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';
import { ProfileController } from '../../../controllers/profile/ProfileController';
import { FileField } from '../../components/form/fields/file-field';
import Auth from '../../../services/Auth';
import { AuthController } from '../../../controllers/auth/AuthController';
import API from '../../../utils/API';

const avatarUrl = require('../../../assets/images/icons/avatar.svg');

interface TProps extends TDefaultProps {
    avatar?: string,
    name?: string,
    content?: TChild,
    user?: User,
    modal?: TChild
}

class Profile extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);

    const authService = new Auth();
    const user = authService.user as User;

    const emailField: TextField = new TextField({
      name: 'email',
      label: 'Почта',
      orientation: 'horizontal',
      value: user.email,
      error: 'Некорректная почта',
      events: {
        focusout: () => emailField.validate('email'),
      },
    });
    const loginField: TextField = new TextField({
      name: 'login',
      label: 'Логин',
      orientation: 'horizontal',
      value: user.login,
      events: {
        focusout: () => loginField.validate('login'),
      },
    });
    const firstNameField: TextField = new TextField({
      name: 'first_name',
      label: 'Имя',
      orientation: 'horizontal',
      value: user.firstName,
      error: 'Некорректное имя',
      events: {
        focusout: () => firstNameField.validate('name'),
      },
    });
    const secondNameField: TextField = new TextField({
      name: 'second_name',
      label: 'Фамилия',
      orientation: 'horizontal',
      value: user.secondName,
      error: 'Некорректное имя',
      events: {
        focusout: () => secondNameField.validate('name'),
      },
    });
    const displayNameField: TextField = new TextField({
      name: 'display_name',
      label: 'Имя в чате',
      orientation: 'horizontal',
      value: user.displayName,
      error: 'Некорректное имя',
      events: {
        focusout: () => secondNameField.validate('name'),
      },
    });
    const phoneField: TextField = new TextField({
      name: 'phone',
      label: 'Телефон',
      orientation: 'horizontal',
      value: user.phone,
      error: 'Некорректный телефон',
      events: {
        focusout: () => phoneField.validate('phone'),
      },
    });

    const modal = new Modal({});

    const form: Form = new Form({
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
        submit: (e: Event) => {
          e.preventDefault();
          if (loginField.validate('login')
                        && emailField.validate('email')
                        && firstNameField.validate('name')
                        && secondNameField.validate('name')
                        && phoneField.validate('phone')) {
            const profileController = new ProfileController();
            profileController.changeProfile(form.getData()).then((status:boolean) => {
              if (status) {
                const authService = new Auth();
                authService.update().then(() => {
                  const user = authService.user as User;
                  this.setProps({
                    user,
                  });
                });
              }
            });
          }
        },
      },
    });

    const api = new API();

    this.setProps({
      avatar: user.avatar ? `${api.location}resources${user.avatar}` : avatarUrl,
      user,
      modal,
      content: [
        form,
        new Button({
          title: 'Сменить аватар',
          events: {
            click: (e:Event) => {
              e.preventDefault();
              this.openChangeAvatarModal(modal);
              return true;
            },
          },
        }),
        new Button({
          title: 'Сменить пароль',
          events: {
            click: (e:Event) => {
              e.preventDefault();
              this.openChangePasswordModal(modal);
              return false;
            },
          },
        }),
        new Button({
          title: 'Выйти',
          events: {
            click: (e:Event) => {
              e.preventDefault();
              const authController = new AuthController();
              authController.logout();
              return false;
            },
          },
        }),
      ],
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
      avatar: this.props.avatar,
      name: this.props.name,
      modal: this.props.modal,
      user: this.props.user,
    });
  }

  openChangeAvatarModal(modal) {
    const fileField = new FileField({
      label: 'Загрузите аватар',
      name: 'avatar',
    });
    const avatarForm = new Form({
      content: [
        fileField,
        new Submit({
          title: 'Отправить',
        }),
      ],
      events: {
        submit: (e:Event) => {
          e.preventDefault();
          const profileController = new ProfileController();
          profileController.changeAvatar(avatarForm.getData()).then((status) => {
            if (status) {
              modal.setProps({
                isOpen: false,
              });
              const authService = new Auth();
              authService.update().then(() => {
                const user = authService.user as User;
                const api = new API();
                this.setProps({
                  avatar: user.avatar ? `${api.location}resources${user.avatar}` : avatarUrl,
                });
              });
            }
          });
        },
      },
    });
    modal.setProps({
      title: 'Сменить аватар',
      content: avatarForm,
      isOpen: true,
    });
  }

  openChangePasswordModal(modal) {
    const oldPassword = new TextField({
      label: 'Старый пароль',
      name: 'oldPassword',
    });
    const newPassword = new TextField({
      label: 'Новый пароль',
      name: 'newPassword',
    });
    const passwordForm = new Form({
      content: [
        oldPassword,
        newPassword,
        new Submit({
          title: 'Сменить',
        }),
      ],
      events: {
        submit: (e:Event) => {
          e.preventDefault();
          const profileController = new ProfileController();
          profileController.changePassword(passwordForm.getData()).then((status) => {
            if (status) {
              modal.setProps({
                isOpen: false,
              });
            }
          });
        },
      },
    });
    modal.setProps({
      title: 'Сменить пароль',
      content: passwordForm,
      isOpen: true,
    });
  }
}

export function render(user: User) {
  return new Screen({
    content: new Profile({}),
    back: '#',
  });
}
