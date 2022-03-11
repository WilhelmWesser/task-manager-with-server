export const nameValidator = (name) => {
    if (name.trim().length === 0) {
        return "Name field can not be empty";
    }
    return "";
};
