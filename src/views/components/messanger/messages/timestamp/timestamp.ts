import { template } from './timestamp.tmpl';
import './timestamp.scss';
import { TDefaultProps, View } from '../../../../../utils/view';

interface TProps extends TDefaultProps {
    timestamp?: string,
}

export class Timestamp extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      timestamp: this.props.timestamp,
    });
  }
}
