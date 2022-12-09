export const template = `
.chat-header
    .chat-header__info
        .chat-header__avatar
            img(src=chat.getAvatar() alt='Аватар чата '+name)
        .chat-header__name #{name}
    .chat-header__actions
        .chat-header__actions-button
            span
            span
            span
        .chat-header__menu.chat-menu(class=(isOpen ? 'chat-menu--opened' : ''))
            .chat-menu__item !{addButton}
            .chat-menu__item !{removeButton}
            .chat-menu__item !{removeChatButton}
    .chat-header__modal !{modal}
`;
