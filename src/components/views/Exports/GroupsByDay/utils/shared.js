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
    WATER_FOOTPRINT_BLUE_KEY,
    WATER_FOOTPRINT_GREEN_KEY,
    WATER_FOOTPRINT_GREY_KEY,
    WATER_FOOTPRINT_TOTAL_KEY,
} from '../constants';

export const flatArray = (array) => {
    if (isInvalidElem(array)) {
        return [];
    }

    return array.flat(2);
};

export const getIsAValidNumberToSum = (value) => {
    return !isSku(value) && !isQuantity(value) && value !== FACTOR_KEY;
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
