import { template } from './text.tmpl';
import './text.scss';
import { child, props, View } from '../../../../../../utils/view';

interface TProps extends props {
    ingoing?: boolean,
    content?: string,
    status?: child
}

export class Text extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      ingoing: this.props.ingoing,
      content: this.props.content,
      status: this.props.status,
    });
  }
}
