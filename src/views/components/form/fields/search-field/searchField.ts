import { template } from './searchField.tmpl';
import './searchField.scss';
import { TDefaultProps, View } from '../../../../../utils/view';

interface TProps extends TDefaultProps {
    name?: string,
    placeholder?: string,
    value?: string
}

export class SearchField extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      placeholder: this.props.placeholder,
      value: this.props.value,
    });
  }
}
