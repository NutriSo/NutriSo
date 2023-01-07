export const getMultiplyData = (value, quantity) => {
    return Number(value * quantity);
};

export const getPropSum = (firstProp, secondProp, consumption) => {
    const firstValue = Number(firstProp);
    const secondValue = Number(secondProp);
    const consumptionValue = Number(consumption);

    if (isNaN(firstValue)) {
        return secondValue * consumptionValue;
    }

    if (isNaN(secondValue) && !isNaN(firstValue)) {
        return firstValue * consumptionValue;
    }

    if (isNaN(secondValue)) {
        return 0;
    }

    return firstValue * consumptionValue + secondValue * consumptionValue;
};
