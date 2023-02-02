export const template = `
.screen
    if back
        .screen__back
            button
    .screen__content !{content}
    if modal
        .screen__modal !{modal}
`;
