import pug from 'pug';
import { template } from './form.tmpl';
import * as styles from './form.scss';
export function render(data) {
    return pug.render(template, data);
}