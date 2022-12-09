import { template } from './error404.tmpl';
import { Screen } from '../../layouts/screen';
import { ErrorCard } from '../../components/error-card';
import { TChild, TDefaultProps, View } from '../../../utils/view';

interface TProps extends TDefaultProps {
  content?: TChild,
}

class Error404 extends View<TProps> {
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
  return new Error404({
    content: new Screen({
      content: new ErrorCard({
        code: 404,
        title: 'Не туда попали',
        back: {
          link: '/',
          title: 'Назад к чатам',
        },
      }),
    }),
  });
}
