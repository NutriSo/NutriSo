import {
    isInvalidElem,
    isQuantity,
    getIsAScript,
    getIsArray,
    getIsAString,
    getIsANumber,
    getIsObject,
    isValidDate,
    isSku,
} from '@/utils';

import {
    FACTOR_KEY,
    CONSUMPTION_KEY,
    WATER_FOOTPRINT_BLUE_KEY,
    WATER_FOOTPRINT_GREEN_KEY,
    WATER_FOOTPRINT_GREY_KEY,
    WATER_FOOTPRINT_TOTAL_KEY,
    NECESSARY_WATER_TO_COOK_KEY,
    NECESSARY_WATER_TO_WASH_KEY,
    ID_KEY,
    DEFAULT_ID_KEY,
} from './constants';

export const flatArray = (array) => {
    if (isInvalidElem(array)) {
        return [];
    }

    return array.flat(2);
};

export const getIsAValidNumberToSum = (value) => {
    return (
        !isSku(value) &&
        !isQuantity(value) &&
        value !== FACTOR_KEY &&
        value !== CONSUMPTION_KEY &&
        value !== NECESSARY_WATER_TO_COOK_KEY &&
        value !== NECESSARY_WATER_TO_WASH_KEY
    );
};

export const getIsAValidStringToConcat = (value) => {
    return (
        value !== INVALID_KEY_TO_SUM &&
        value !== FACTOR_KEY &&
        value !== ID_KEY &&
        value !== DEFAULT_ID_KEY
    );
};

export const getAreNumbers = (firstValue, secondValue) => {
    return getIsANumber(firstValue) && getIsANumber(secondValue);
};

export const getAreObjects = (firstValue, secondValue) => {
    return getIsObject(firstValue) && getIsObject(secondValue);
};

export const getAreArrays = (firstValue, secondValue) => {
    return getIsArray(firstValue) && getIsArray(secondValue);
};

export const getAreDates = (firstValue, secondValue) => {
    return isValidDate(firstValue) && isValidDate(secondValue);
};

export const getAreStrings = (firstValue, secondValue) => {
    return getIsAString(firstValue) && getIsAString(secondValue);
};

export const getAreScripts = (firstValue, secondValue) => {
    return getIsAScript(firstValue) || getIsAScript(secondValue);
};

export const getUniqueValuesFromArray = (array) => {
    return [...new Set(array)];
};

export const getIsAKeyToMultiply = (key) => {
    return (
        key === WATER_FOOTPRINT_BLUE_KEY ||
        key === WATER_FOOTPRINT_GREEN_KEY ||
        key === WATER_FOOTPRINT_GREY_KEY ||
        key === WATER_FOOTPRINT_TOTAL_KEY
    );
};

export const getWaterFootprintValue = (firstValue, secondValue, factor) => {
    const fixedFirstValue = Number(firstValue * factor);
    const fixedSecondValue = Number(secondValue * factor);

    return fixedFirstValue + fixedSecondValue;
};

export const getIsANecessaryWaterKey = (key) => {
    return key === NECESSARY_WATER_TO_COOK_KEY || key === NECESSARY_WATER_TO_WASH_KEY;
};
