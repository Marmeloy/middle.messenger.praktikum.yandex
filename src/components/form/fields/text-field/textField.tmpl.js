export const template = `
.form-control.text-field(class=(orientation ? "text-field--"+orientation : "text-field--vertical"))
    if label
        .text-field__label
            label #{label}
    .text-field__input
        input(type="text" name=name value=value)
`;