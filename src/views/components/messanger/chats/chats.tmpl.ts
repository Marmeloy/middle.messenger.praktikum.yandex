export const template = `
.chats
    each chat in chats
        .chats__item.chat-item
            .chat-item__avatar
            .chat-item__content
                .chat-item__name #{chat.name}
                .chat-item__message #{chat.excerpt}
            .chat-item__status
                if chat.time
                    .chat-item__time #{chat.time}
                if chat.counter
                    .chat-item__counter
                        span #{chat.counter}
`;
