function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email or password entered wrongly";
        case "EMAIL_EXISTS":
            return "User with such email already exists";
        case "EMAIL_NOT_FOUND":
            return "There is no user with such email";
        default:
            return "Too much entrance attempts. Try again later.";
    }
}

export default generateAuthError;
