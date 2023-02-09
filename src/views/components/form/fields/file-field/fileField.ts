import { template } from './fileField.tmpl';
import './fileField.scss';
import { TDefaultProps, View } from '../../../../../utils/view';

interface TProps extends TDefaultProps {
    label?: string,
    name?: string,
}

export class FileField extends View<TProps> {
  value:string;

  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
    });
  }
}
