export const template = `
.chat-messages__message.text-message(class="text-message--"+(ingoing ? "ingoing" : "outgoing"))
    .text-message__content !{content}
    .text-message__status !{status}
`;
