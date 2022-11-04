import pug from 'pug';
import { template } from './error500.tmpl';
import { render as screen } from '../../layouts/screen/index';
import { render as errorCard } from '../../components/error-card/index';

export function render() {
    return pug.render(template, {
        content: screen({
            content: errorCard({
                code: 500,
                title: 'Мы уже фиксим',
                back: {
                    link: '/',
                    title: 'Назад к чатам'
                }
            })
        })
    });
}