import pug from 'pug';
import { template } from './submit.tmpl';
import * as btn_styles from './../../../button/button.scss';
import * as styles from './submit.scss';

export function render(data) {
    return pug.render(template, data);
}