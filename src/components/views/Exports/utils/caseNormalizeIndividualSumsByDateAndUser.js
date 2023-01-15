import {
    isInvalidElem,
    getIsArray,
    getIsANumber,
    isQuantity,
    getIsAScript,
    isValidDate,
    isEmptyObject,
    isSku,
    getIsObject,
    getIsAString,
} from '@/utils';

import caseSumValues from './caseSumValues';

const createPropertyWhileObject = (objRef, params) => {
    const [firstObj, secondObj, key] = params;
    const tempObj = {};

    Object.keys(firstObj[key]).forEach((key2) => {
        const firstValue2 = Number(firstObj[key][key2]);
        const secondValue2 = Number(secondObj[key][key2]);

        const esNum12 = getIsANumber(firstObj[key][key2]);
        const esNum22 = getIsANumber(secondObj[key][key2]);

        if (esNum12 && esNum22 && !isSku(key2) && !isQuantity(key)) {
            tempObj[key2] = String(Number(firstValue2 + secondValue2).toFixed(4));
        } else if (getIsAScript(firstObj[key][key2]) || getIsAScript(secondObj[key][key2])) {
            tempObj[key2] = '-';
        } else if (isQuantity(key)) {
            // objRef[key] = String(firstValue + secondValue);
            // console.log('cantidad obj', { firstValue, secondValue, esNum1, esNum2 });
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

    const esNum1 = getIsANumber(firstObj[key]);
    const esNum2 = getIsANumber(secondObj[key]);

    const date1 = isValidDate(firstObj[key]);
    const date2 = isValidDate(secondObj[key]);

    if (esNum1 && esNum2 && !isSku(key) && !isQuantity(key)) {
        objRef[key] = String(firstValue + secondValue);
    } else if (getIsAScript(firstObj[key]) || getIsAScript(secondObj[key])) {
        objRef[key] = '-';
    } else if (date1 && date2) {
        objRef[key] = firstObj[key];
    } else if (getIsArray(firstObj[key]) && getIsArray(secondObj[key])) {
        const cleanArray = new Set([...firstObj[key], ...secondObj[key]]);
        objRef[key] = [...cleanArray];
    } else if (
        getIsAString(firstObj[key]) &&
        getIsAString(secondObj[key] && key !== 'usuario')
    ) {
        objRef[key] = firstObj[key] + ', ' + secondObj[key];
    } else if (isQuantity(key)) {
        // console.log('cantidad', { firstValue, secondValue, esNum1, esNum2 });
    } else {
        objRef[key] = firstObj[key];
    }
};

const sumObjectValues = (firstObj, secondObj) => {
    const result = {};

    if (isEmptyObject(firstObj)) {
        return secondObj;
    }

    Object.keys(firstObj).forEach((key) => {
        const areObjects = getIsObject(firstObj[key]) && getIsObject(secondObj[key]);

        if (areObjects) {
            createPropertyWhileObject(result, [firstObj, secondObj, key]);
        } else {
            createPropertyWhileNotObject(result, [firstObj, secondObj, key]);
        }
    });

    return result;
};

const getCurrentObjectHasAlreadyBeenIterated = (source, date, userId) => {
    return source.some(
        (element) => element.fechaRegistro === date && element.idParticipante === userId
    );
};

const getIndexObjectToModify = (source, date, userId) => {
    return source.findIndex(
        (element) => element.fechaRegistro === date && element.idParticipante === userId
    );
};

const getObjectValuesSum = (source, currentSum) => {
    let newSum = currentSum;

    source.forEach((group) => {
        const foodData = group.values;

        foodData?.forEach((food) => {
            newSum = caseSumValues(newSum, food);
        });
    });

    return newSum;
};

const normalizeIndividualSumsByDateAndUser = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const result = [];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante } = row;

        const alreadyIterated = getCurrentObjectHasAlreadyBeenIterated(
            result,
            fechaRegistro,
            idParticipante
        );

        if (alreadyIterated) {
            const elementIndex = getIndexObjectToModify(
                result,
                fechaRegistro,
                idParticipante
            );
            const element = result[elementIndex];

            const sumOfFirstObjectValues = getObjectValuesSum(row.values, {});
            const sumOfSecondObjectValues = getObjectValuesSum(
                element.values,
                sumOfFirstObjectValues
            );

            result[elementIndex].values = [sumOfSecondObjectValues];
        } else {
            result.push(row);
        }
    });

    return result;
};

const caseNormalizeIndividualSumsByDateAndUser = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    return normalizeIndividualSumsByDateAndUser(data);
};

export default caseNormalizeIndividualSumsByDateAndUser;
