export const template = `
.chats
    .chats__chats
        each chat in chats
            .chats__item.chat-item(data-id=chat.id)
                .chat-item__avatar
                .chat-item__content
                    .chat-item__name #{chat.title}
                    if chat.lastMessage
                        .chat-item__message #{chat.lastMessage.content}
                .chat-item__status
                    if chat.time
                        .chat-item__time #{chat.time}
                    if chat.unreadCount
                        .chat-item__counter
                            span #{chat.unreadCount}
    .chats__button !{button}
`;
