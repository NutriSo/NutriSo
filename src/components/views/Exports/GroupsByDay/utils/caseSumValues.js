import {
    isEmptyObject,
    isQuantity,
    getIsAScript,
    getIsArray,
    getIsAString,
    getIsANumber,
    getIsObject,
    isValidDate,
    isSku,
} from '@/utils';

const createPropertyWhileObject = (objRef, params) => {
    const [firstObj, secondObj, key] = params;
    const tempObj = {};

    Object.keys(firstObj[key]).forEach((key2) => {
        const firstValue2 = Number(firstObj[key][key2]);
        const secondValue2 = Number(secondObj[key][key2]);

        const areScripts =
            getIsAScript(firstObj[key][key2]) || getIsAScript(secondObj[key][key2]);

        const areNumbers =
            getIsANumber(firstObj[key][key2]) && getIsANumber(secondObj[key][key2]);

        if (areNumbers && !isSku(key2) && !isQuantity(key)) {
            tempObj[key2] = String(Number(firstValue2 + secondValue2).toFixed(4));
        } else if (areScripts) {
            tempObj[key2] = '-';
        } else {
            tempObj[key2] = firstObj[key][key2];
        }
    });

    objRef[key] = tempObj;
};

const createPropertyWhileNotObject = (objRef, params) => {
    const [firstObj, secondObj, key] = params;

    const firstValue = Number(firstObj[key]);
    const secondValue = Number(secondObj[key]);

    const areNumbers = getIsANumber(firstObj[key]) && getIsANumber(secondObj[key]);

    const areDates = isValidDate(firstObj[key]) && isValidDate(secondObj[key]);

    const areArrays = getIsArray(firstObj[key]) && getIsArray(secondObj[key]);

    const areScripts = getIsAScript(firstObj[key]) || getIsAScript(secondObj[key]);

    const areStrings = getIsAString(firstObj[key]) && getIsAString(secondObj[key]);
    const isNotUserKey = key !== 'usuario' && areStrings;

    if (areNumbers && !isSku(key) && !isQuantity(key)) {
        objRef[key] = String(firstValue + secondValue);
    } else if (areScripts) {
        objRef[key] = '-';
    } else if (areDates) {
        objRef[key] = firstObj[key];
    } else if (areArrays) {
        const cleanArray = new Set([...firstObj[key], ...secondObj[key]]);
        objRef[key] = [...cleanArray];
    } else if (isNotUserKey) {
        objRef[key] = firstObj[key] + ', ' + secondObj[key];
    } else {
        objRef[key] = firstObj[key];
    }
};

const sumObjectValues = (firstObj, secondObj) => {
    const result = {};

    const hasNoValuesToSum = isEmptyObject(firstObj);
    if (hasNoValuesToSum) {
        return secondObj;
    }

    Object.keys(firstObj).forEach((key) => {
        const areObjects = getIsObject(firstObj[key]) && getIsObject(secondObj[key]);

        areObjects
            ? createPropertyWhileObject(result, [firstObj, secondObj, key])
            : createPropertyWhileNotObject(result, [firstObj, secondObj, key]);
    });

    return result;
};

export default sumObjectValues;
