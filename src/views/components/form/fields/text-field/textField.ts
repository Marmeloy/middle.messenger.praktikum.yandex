import { template } from './textField.tmpl';
import './textField.scss';
import { TDefaultProps, View } from '../../../../../utils/view';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone, validateString,
} from '../../../../../utils/validate';

interface TProps extends TDefaultProps {
  orientation?: string,
  label?: string,
  name?: string,
  value?: string,
  isValid?: boolean,
  error?:string
}

export class TextField extends View<TProps> {
  value:string;

  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      orientation: this.props.orientation,
      label: this.props.label,
      name: this.props.name,
      value: this.props.value,
      isValid: (this.props.isValid === undefined ? true : this.props.isValid),
      error: this.props.error,
    });
  }

  getValue():string|null {
    const input:HTMLInputElement|null = this.element.querySelector('input');
    if (input) {
      const {value} = input;
      return input.value;
    }
    return null;
  }

  validate(field:string):boolean {
    let state = false;
    const input:HTMLInputElement|null = this.element.querySelector('input');
    const value = this.getValue();
    if (value) {
      switch (field) {
        case 'login':
          state = validateLogin(value);
          break;
        case 'password':
          state = validatePassword(value);
          break;
        case 'email':
          state = validateEmail(value);
          break;
        case 'name':
          state = validateName(value);
          break;
        case 'phone':
          state = validatePhone(value);
          break;
        case 'string':
          state = validateString(value);
          break;
        default:
          state = true;
          break;
      }
      this.setProps({
        isValid: state,
        value,
      });
    }
    return state;
  }
}
