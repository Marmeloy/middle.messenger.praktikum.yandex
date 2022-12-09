export const template = `
.form-control.file-field
    if label
        .file-field__label
            label #{label}
    .file-field__input
        input(type="file" name=name)
`;
