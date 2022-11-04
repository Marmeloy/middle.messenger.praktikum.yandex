import { template } from './textField.tmpl';
import './textField.scss';
import { props, View } from '../../../../../utils/view';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../../../../../utils/validate';

interface TProps extends props {
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

  validate(field:string):void {
    const input:HTMLInputElement|null = this.element.querySelector('input');
    if (input) {
      const { value } = input;
      let state;
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
        default:
          state = true;
          break;
      }
      this.setProps({
        isValid: state,
        value,
      });
    }
  }
}
