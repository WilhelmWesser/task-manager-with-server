export const emailValidator = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/g;
    if (email.trim().length === 0) {
        return "Email field can not be empty";
    } else if (!emailPattern.test(email)) {
        return "You need to enter email in proper format";
    }
    return "";
};
