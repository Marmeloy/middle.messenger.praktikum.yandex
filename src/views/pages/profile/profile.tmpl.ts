export const template = `
.profile
    if avatar && user
        .profile__avatar
            img(src=avatar alt='Аватар пользователя '+user.firstName+' ' + user.secondName)
    if user
        .profile__name #{user.firstName}
    .profile__info !{content}
    .profile_modal !{modal}
`;
