import randomstring from "randomstring";

export const generateRandomEmail = async () => {
    return `test_email_${await generateAlphanumericString(15)}@mgail.net`;
};

export const generateAlphanumericString = async (length = 20) => {
    return randomstring.generate({ length, charset: "alphanumeric" });
};

export const generateNumericString = async (length = 20) => {
    return randomstring.generate({ length, charset: "numeric" });
};

export const generateAlphabeticString = async (length = 20) => {
    return randomstring.generate({ length, charset: "alphabetic" });
};

export const generateSpecialSymbols = async (length = 20) => {
    return randomstring.generate({ length, charset: "!@#$%^*()_+-/*<>~.,|\\" });
};
