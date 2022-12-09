import { template } from './status.tmpl';
import './status.scss';
import { TDefaultProps, View } from '../../../../../utils/view';

interface TProps extends TDefaultProps {
    status?: boolean,
    time?: string,
}

export class Status extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      status: this.props.status,
      time: this.props.time,
    });
  }
}
