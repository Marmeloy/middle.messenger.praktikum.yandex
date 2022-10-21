import pug from 'pug';
import { template } from './errorCard.tmpl';
import * as styles from './errorCard.scss';
export function render(data) {
    return pug.render(template, data);
}