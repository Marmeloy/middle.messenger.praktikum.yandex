import { template } from './submit.tmpl';
import '../../../button/button.scss';
import './submit.scss';
import { TDefaultProps, View } from '../../../../../utils/view';

interface TProps extends TDefaultProps {
  color?: string,
  title?: string
}

export class Submit extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      color: this.props.color,
      title: this.props.title,
    });
  }
}
