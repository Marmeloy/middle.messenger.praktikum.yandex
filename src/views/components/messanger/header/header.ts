import { template } from './header.tmpl';
import './header.scss';
import { props, View } from '../../../../utils/view';

interface TProps extends props {
    name?: string,
}

export class Header extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
    });
  }
}
