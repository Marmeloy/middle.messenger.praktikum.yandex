import { template } from './footer.tmpl';
import './footer.scss';
import { props, View } from '../../../../utils/view';
import { validateString } from '../../../../utils/validate';

interface TProps extends props {
}

export class Footer extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
    });
  }

  validate():void {
    const input:HTMLInputElement|null = this.element.querySelector('input[type="text"]');
    if (input && !validateString(input.value)) {
      alert('Сообщение не может быть пустым');
    }
  }
}
