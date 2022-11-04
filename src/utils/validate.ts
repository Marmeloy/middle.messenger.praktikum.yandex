export function validateName(value:string):boolean {
  const regex = new RegExp('^[А-ЯA-Z][А-яA-z-]+$');
  return regex.test(value);
}

export function validateLogin(value:string):boolean {
  const numberRegex = new RegExp('^\\d+$');
  if (numberRegex.test(value)) {
    return false;
  }
  const regex = new RegExp('^[A-z\\d\\-_]{3,20}$');
  return regex.test(value);
}

export function validateEmail(value:string):boolean {
  const regex = new RegExp('^[A-z\\d\\-_\\.]+@[A-z\\d-]+\\.[A-z]+$');
  return regex.test(value);
}

export function validatePassword(value:string):boolean {
  // Проверка наличия заглавной буквы
  const upperRegex = new RegExp('[A-ZА-Я]+');
  const numberRegex = new RegExp('\\d+');
  if (!upperRegex.test(value) || !numberRegex.test(value)) {
    return false;
  }
  return value.length >= 8 && value.length <= 40;
}

export function validatePhone(value:string):boolean {
  const regex = new RegExp('^\\+?\\d{10,15}$');
  return regex.test(value);
}

export function validateString(value:string):boolean {
  return value.length > 0;
}
