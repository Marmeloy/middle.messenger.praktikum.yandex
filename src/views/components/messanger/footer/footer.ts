import { template } from './footer.tmpl';
import './footer.scss';
import { TDefaultProps, View } from '../../../../utils/view';
import { validateString } from '../../../../utils/validate';

interface TProps extends TDefaultProps {
}

export class Footer extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
    });
  }

  validate():boolean {
    const input:HTMLInputElement = this.element.querySelector('input[type="text"]') as HTMLInputElement;
    return validateString(input.value);
  }

  clear():void {
    const input:HTMLInputElement = this.element.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = '';
  }
}
