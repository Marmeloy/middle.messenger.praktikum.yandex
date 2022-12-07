export const template = `
.profile
    if avatar
        .profile__avatar
            img(src=avatar)
    if user
        .profile__name #{user.firstName}
    .profile__info !{content}
    .profile_modal !{modal}
`;
