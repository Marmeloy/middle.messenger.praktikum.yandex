export const template = `
.profile
    if avatar
        .profile__avatar
            img(src=avatar)
    if name
        .profile__name #{name}
    .profile__info !{content}
`;