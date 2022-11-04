import pug from 'pug';
import { template } from './card.tmpl';
import * as styles from './card.scss';
export function render(data) {
    return pug.render(template, data);
}