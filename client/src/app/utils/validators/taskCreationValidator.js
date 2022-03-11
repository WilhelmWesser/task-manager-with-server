const validateTaskFields = (data) => {
    if (data.heading.length === 0) {
        return false;
    } else if (data.statusяя === "") {
        return false;
    } else if (data.priority === "") {
        return false;
    } else if (data.responsible.length === 0) {
        return false;
    } else if (data.terms.length === 0) {
        return false;
    } else if (data.content.length === 0) {
        return false;
    } else {
        return true;
    }
};

export default validateTaskFields;
