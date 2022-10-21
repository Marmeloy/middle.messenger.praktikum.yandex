export const template = `
.error-card
    .error-card__code #{code}
    .error-card__title #{title}
    if (back)
        a.error-card__link(href=back.link) #{back.title}
`;