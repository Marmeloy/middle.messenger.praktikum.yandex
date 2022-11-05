import { template } from './status.tmpl';
import './status.scss';
import { props, View } from '../../../../../utils/view';

interface TProps extends props {
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
