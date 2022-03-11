export const privacyPolicyValidator = (privacyPolicy) => {
    if (!privacyPolicy) {
        return "You must accept privacy policy";
    } else {
        return "";
    }
};
