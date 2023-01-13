import { isInvalidElem } from '@/utils';

import caseSumValues from './caseSumValues';
import caseGetValuesByConsumption from './caseGetValuesByConsumption';

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

            const firstSum = getObjectValuesSum(row.values, {});
            const secondSum = getObjectValuesSum(element.values, firstSum);

            result[elementIndex].values = [secondSum];
        } else {
            result.push(row);
        }
    });

    return result;
};

const getUnifiedObjectValuesSum = (data) => {
    const result = data.map((row) => {
        const elements = row.values;
        const hasMoreThanOneFoodInResult = elements.length > 1;

        if (hasMoreThanOneFoodInResult) {
            const foodValuesSum = getObjectValuesSum(elements, {});

            row.values = [foodValuesSum];
        } else {
            const hasValuesProperty = elements[0].hasOwnProperty('values');

            if (hasValuesProperty) {
                row.values = elements[0].values;
            } else {
                row.values = elements;
            }
        }
        return row;
    });

    return result;
};

const getSumByDay = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const normalizedData = caseGetValuesByConsumption(data);

    const csvData = normalizeIndividualSumsByDateAndUser(normalizedData);

    return getUnifiedObjectValuesSum(csvData);
};

export default getSumByDay;
