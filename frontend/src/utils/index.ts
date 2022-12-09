export const formatError = (error: string) => {
    return capitalize(error.replace(/auth|\/|-/gi, " "));
};

export const capitalize = (text: string) => {
    text = text.trimStart();
    if (!text) return;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
