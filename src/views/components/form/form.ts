import { template } from './form.tmpl';
import './form.scss';
import { props, child, View } from '../../../utils/view';

interface TProps extends props {
  content?: child
}

export class Form extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
    });
  }

  getData() {
    const form = this.element as HTMLFormElement;
    return new FormData(form);
  }
}
