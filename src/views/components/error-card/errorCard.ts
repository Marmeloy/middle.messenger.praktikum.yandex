import { View, props } from '../../../utils/view';

import { template } from './errorCard.tmpl';
import './errorCard.scss';

interface TProps extends props {
  code?: string | number,
  title?: string,
  back?: {
    link: string,
    title: string
  }
}

export class ErrorCard extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      code: this.props.code,
      title: this.props.title,
      back: this.props.back,
    });
  }
}
