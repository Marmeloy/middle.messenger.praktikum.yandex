import { template } from './sidebar.tmpl';
import './sidebar.scss';
import { child, props, View } from '../../../utils/view';

interface TProps extends props {
    search?: child,
    content?: child,
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
