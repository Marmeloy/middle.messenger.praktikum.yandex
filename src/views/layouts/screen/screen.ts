import { TChild, TDefaultProps, View } from '../../../utils/view';
import { template } from './screen.tmpl';
import './screen.scss';
import {Router} from "../../../utils/routing/router";

interface TProps extends TDefaultProps {
  content?: TChild,
  back?: string,
  modal?: TChild
}

export class Screen extends View<TProps> {
  constructor(propsAndChildren: TProps) {
    propsAndChildren.events = {
      click: (e:Event) => {
        if (e.target) {
          const target = e.target as Node;
          if (target.parentElement && target.parentElement.classList.contains('screen__back')) {
            const router = new Router();
            router.back();
          }
        }
      }
    };
    super('div', propsAndChildren);
  }

  render():DocumentFragment {
    return this.compile(template, {
      content: this.props.content,
      back: this.props.back,
      modal: this.props.modal
    });
  }
}
