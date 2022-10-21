import pug from 'pug';
import { template } from './profile.tmpl';
import * as styles from './profile.scss';
import { render as screen } from '../../layouts/screen/index';
import { render as form, textField, submit } from '../../components/form/index';

import avatarUrl from '../../../static/images/icons/avatar.svg';

export function render() {
    const content = form({
        content:
            textField({
                name: 'email',
                label: 'Почта',
                orientation: 'horizontal',
                value: 'pochta@yandex.ru'
            })+textField({
                name: 'login',
                label: 'Логин',
                orientation: 'horizontal',
                value: 'ivanivanov'
            })+textField({
                name: 'first_name',
                label: 'Имя',
                orientation: 'horizontal',
                value: 'Иван'
            })+textField({
                name: 'second_name',
                label: 'Фамилия',
                orientation: 'horizontal',
                value: 'Иванов'
            })+textField({
                name: 'display_name',
                label: 'Имя в чате',
                orientation: 'horizontal',
                value: 'Иван'
            })+textField({
                name: 'phone',
                label: 'Телефон',
                orientation: 'horizontal',
                value: '+7 (909) 967 30 30'
            })+submit({
                color: 'blue',
                title: 'Сохранить'
            })
    });
    return screen({
        content: pug.render(template, {
            name: 'Иван',
            avatar: avatarUrl,
            content: content
        }),
        back: "/"
    });
}