import pug from 'pug';
import { template } from './screen.tmpl';
import * as styles from './screen.scss';
export function render(data) {
    return pug.render(template, data);
}