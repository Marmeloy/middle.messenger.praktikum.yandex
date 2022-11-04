import pug from 'pug';
import { template } from './register.tmpl';
import { render as button } from '../../components/button/index';
import { render as card } from '../../components/card/index';
import { render as screen } from '../../layouts/screen/index';
import { render as form, textField, submit } from '../../components/form/index';

export function render() {
    const content = form({
        content: textField({
            label: 'Почта',
            name: 'email'
        })+textField({
            label: 'Логин',
            name: 'login'
        })+textField({
            label: 'Имя',
            name: 'first_name'
        })+textField({
            label: 'Фамилия',
            name: 'second_name'
        })+textField({
            label: 'Телефон',
            name: 'phone'
        })+textField({
            label: 'Пароль',
            name: 'password'
        })+textField({
            label: 'Пароль (ещё раз)',
            name: 'repeatPassword'
        })
    });
    return pug.render(template, {
        content: screen({
            content: card({
                title: 'Регистрация',
                content: content,
                footer: submit({
                    title: 'Зарегистрироваться',
                    color: 'blue'
                })+button({
                    title: 'Войти',
                    link: '/login.html'
                })
            })
        })
    });
}