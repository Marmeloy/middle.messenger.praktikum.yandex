export const template = `
.modal(class=(isOpen === true ? 'modal--opened' : ''))
    .modal__overlay
    .modal__body
        .modal__close Закрыть
        .modal__title #{title}
        .modal__content !{content}
`;
