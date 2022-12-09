import {TChild, TDefaultProps, View} from "../../../utils/view";
import {template} from "./modal.tmpl";
import './modal.scss';

interface TProps extends TDefaultProps {
    title?: string,
    content?: TChild,
    isOpen?: boolean
}

export class Modal extends View<TProps> {
    constructor(propsAndChildren: TProps) {
        propsAndChildren.events = {
            click: (e:Event) => {
                let target = e.target as HTMLElement;
                if (target.classList.contains('modal__close') || target.closest('.modal__close')) {
                    this.setProps({
                        isOpen: false
                    })
                }
            }
        }
        super('div', propsAndChildren);
        this.setProps({
            isOpen: false,
        });
    }

    render():DocumentFragment {
        return this.compile(template, {
            title: this.props.title,
            content: this.props.content,
            isOpen: this.props.isOpen
        });
    }


}
