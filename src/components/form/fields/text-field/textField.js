import pug from 'pug';
import { template } from './textField.tmpl';
import * as styles from './textField.scss';
export function render(data) {
    return pug.render(template, data);
}