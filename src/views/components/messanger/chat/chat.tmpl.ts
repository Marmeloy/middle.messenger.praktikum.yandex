export const template = `
.chat
    if chat
        .chat__header !{header}
        .chat__messages !{messages}
        .chat__footer !{footer}
    else
        .chat__placeholder Для начала общения выберите чат или создайте новый
`;
