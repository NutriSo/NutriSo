import { isInvalidElem } from '@/utils';

import caseSumValues from './caseSumValues';

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
