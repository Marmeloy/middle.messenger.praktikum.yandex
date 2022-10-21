import pug from 'pug';
import { template } from './button.tmpl';
import * as styles from './button.scss';

export function render(data) {
    return pug.render(template, data);
}