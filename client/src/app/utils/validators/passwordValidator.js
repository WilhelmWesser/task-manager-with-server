export const passwordValidator = (password) => {
    const capitalLetterRegExp = /[A-Z]+/g;
    const includesDigitRegExp = /\d+/g;
    if (password.trim().length === 0) {
        return "Password field can not be empty";
    } else if (password.length < 8) {
        return "Password length must be at least 8 symbols";
    } else if (!capitalLetterRegExp.test(password)) {
        return "Password must contain at least one capital letter";
    } else if (!includesDigitRegExp.test(password)) {
        return "Password must contain at least one digit";
    }
    return "";
};
