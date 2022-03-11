import { nameValidator } from "./nameValidator";
import { emailValidator } from "./emailValidator";
import { passwordValidator } from "./passwordValidator";
import { privacyPolicyValidator } from "./privacyPolicyValidator";

export const validatorChooser = (type, value) => {
    switch (type) {
        case "name":
            return nameValidator(value);
        case "email":
            return emailValidator(value);
        case "password":
            return passwordValidator(value);
        case "privacyPolicy":
            return privacyPolicyValidator(value);
        default:
            break;
    }
};
