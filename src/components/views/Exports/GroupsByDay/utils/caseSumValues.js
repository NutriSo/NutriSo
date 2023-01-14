import { isEmptyObject } from '@/utils';

import {
    getIsAValidNumberToSum,
    getAreNumbers,
    getAreObjects,
    getAreArrays,
    getAreDates,
    getAreStrings,
    getAreScripts,
    getUniqueValuesFromArray,
    getIsAKeyToMultiply,
    getWaterFootprintValue,
} from './shared';
import caseGetParsedSum from './caseGetParsedSum';
import { INVALID_KEY_TO_SUM, SCRIPT, FACTOR_KEY } from '../constants';

const getObjectValuesSum = (objRef, params) => {
    const [firstObj, secondObj, objectKey] = params;
    const tempObj = {};

    Object.keys(firstObj[objectKey]).forEach((keyValue) => {
        const firstValue = firstObj[objectKey][keyValue];
        const secondValue = secondObj[objectKey][keyValue];

        const areNumbers = getAreNumbers(firstValue, secondValue);
        const areDates = getAreDates(firstValue, secondValue);
        const areArrays = getAreArrays(firstValue, secondValue);
        const areScripts = getAreScripts(firstValue, secondValue);
        const mustFixByFactor = getIsAKeyToMultiply(keyValue);
        const areStrings = getAreStrings(firstValue, secondValue);
        const isNotUserKey = keyValue !== INVALID_KEY_TO_SUM && areStrings;

        if (mustFixByFactor) {
            tempObj[keyValue] = getWaterFootprintValue(
                firstValue,
                secondValue,
                tempObj[FACTOR_KEY]
            );
        }

        if (areNumbers && getIsAValidNumberToSum(keyValue)) {
            tempObj[keyValue] = caseGetParsedSum(firstValue, secondValue);
        } else if (areScripts) {
            tempObj[keyValue] = SCRIPT;
        } else if (areDates) {
            tempObj[keyValue] = firstValue;
        } else if (areArrays) {
            tempObj[keyValue] = getUniqueValuesFromArray([...firstValue, ...secondValue]);
        } else if (isNotUserKey) {
            tempObj[keyValue] = firstValue + ', ' + secondValue;
        } else {
            tempObj[keyValue] = firstValue;
        }
    });

    objRef[objectKey] = tempObj;
};

const getValuesSum = (objRef, params) => {
    const [firstObj, secondObj, key] = params;

    const firstValue = firstObj[key];
    const secondValue = secondObj[key];

    const areNumbers = getAreNumbers(firstValue, secondValue);
    const areDates = getAreDates(firstValue, secondValue);
    const areArrays = getAreArrays(firstValue, secondValue);
    const areScripts = getAreScripts(firstValue, secondValue);
    const mustFixByFactor = getIsAKeyToMultiply(key);
    const areStrings = getAreStrings(firstValue, secondValue);
    const isNotUserKey = key !== INVALID_KEY_TO_SUM && areStrings;

    if (mustFixByFactor) {
        objRef[key] = getWaterFootprintValue(firstValue, secondValue, objRef[FACTOR_KEY]);
    }

    if (areNumbers && getIsAValidNumberToSum(key)) {
        objRef[key] = caseGetParsedSum(firstValue, secondValue);
    } else if (areScripts) {
        objRef[key] = SCRIPT;
    } else if (areDates) {
        objRef[key] = firstValue;
    } else if (areArrays) {
        objRef[key] = getUniqueValuesFromArray([...firstValue, ...secondValue]);
    } else if (isNotUserKey) {
        objRef[key] = firstValue + ', ' + secondValue;
    } else {
        objRef[key] = firstValue;
    }
};
// Verify how to sum the values of the objects with factor property
const caseSumValues = (firstObj, secondObj) => {
    const hasNoValuesToSum = isEmptyObject(firstObj);
    if (hasNoValuesToSum) {
        return secondObj;
    }

    const result = {};

    Object.keys(firstObj).forEach((key) => {
        const areObjects = getAreObjects(firstObj[key], secondObj[key]);

        areObjects
            ? getObjectValuesSum(result, [firstObj, secondObj, key])
            : getValuesSum(result, [firstObj, secondObj, key]);
    });

    return result;
};

export default caseSumValues;
