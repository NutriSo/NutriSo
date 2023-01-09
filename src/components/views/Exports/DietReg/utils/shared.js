export const textToNumber = (text) => {
    return Number(String(text));
};

export const getMultiply = (data, quantity) => {
    return Number(textToNumber(data) * quantity);
};
