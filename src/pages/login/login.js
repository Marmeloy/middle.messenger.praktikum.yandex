import pug from 'pug';
import { template } from './login.tmpl';
import { render as button } from '../../components/button/index';
import { render as card } from '../../components/card/index';
import { render as screen } from '../../layouts/screen/index';
import { render as form, textField, submit } from '../../components/form/index';

export function render() {
    const content = form({
        content: textField({
            label: 'Логин',
            name: 'login'
        })+textField({
            label: 'Пароль',
            name: 'password'
        })
    });
    return pug.render(template, {
        content: screen({
            content: card({
                title: 'Вход',
                content: content,
                footer: submit({
                    title: 'Авторизоваться',
                    color: 'blue'
                })+button({
                    title: 'Нет аккаунта?',
                    link: '/register.html'
                })
            })
        })
    });
}