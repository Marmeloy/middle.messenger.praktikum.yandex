import { template } from './error500.tmpl';
import { Screen } from '../../layouts/screen';
import { ErrorCard } from '../../components/error-card';
import { TChild, TDefaultProps, View } from '../../../utils/view';

interface TProps extends TDefaultProps {
  content?: TChild,
}

class Error500 extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
    });
  }
}

export function render() {
  return new Error500({
    content: new Screen({
      content: new ErrorCard({
        code: 500,
        title: 'Мы уже фиксим',
        back: {
          link: '/',
          title: 'Назад к чатам',
        },
      }),
    }),
  });
}
