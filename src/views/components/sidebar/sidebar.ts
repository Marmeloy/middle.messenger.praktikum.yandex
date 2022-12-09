import { template } from './sidebar.tmpl';
import './sidebar.scss';
import { TChild, TDefaultProps, View } from '../../../utils/view';

interface TProps extends TDefaultProps {
    search?: TChild,
    content?: TChild,
}

export class Sidebar extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      search: this.props.search,
      content: this.props.content,
    });
  }
}
