import { template } from './text.tmpl';
import './text.scss';
import { TChild, TDefaultProps, View } from '../../../../../../utils/view';

interface TProps extends TDefaultProps {
    ingoing?: boolean,
    content?: string,
    status?: TChild
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
