const delimitateDecimalsOfResult = (result) => {
    return result.toFixed(4);
};

const getSum = (firstValue, secondValue) => {
    const firstValueNumber = Number(firstValue);
    const secondValueNumber = Number(secondValue);

    return firstValueNumber + secondValueNumber;
};

const parseNumberToString = (value) => {
    return String(value);
};

const caseGetParsedSum = (firstValue, secondValue) => {
    const sum = getSum(firstValue, secondValue);
    const parsedSum = delimitateDecimalsOfResult(sum);

    return parseNumberToString(parsedSum);
};

export default caseGetParsedSum;
