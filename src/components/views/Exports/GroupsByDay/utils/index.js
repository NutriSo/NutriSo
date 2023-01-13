import { isInvalidElem } from '@/utils';

import caseSumValues from './caseSumValues';
import caseGetValuesByConsumption from './caseGetValuesByConsumption';

const getIsCurrentObjectAlreadyIterated = (source, date, userId) => {
    return source.some(
        (element) => element.fechaRegistro === date && element.idParticipante === userId
    );
};

const normalizeDataByDateAndUser = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const iteratedObjects = [];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante } = row;

        const alreadyIterated = getIsCurrentObjectAlreadyIterated(
            iteratedObjects,
            fechaRegistro,
            idParticipante
        );

        if (alreadyIterated) {
            const found = iteratedObjects.find(
                (ite) =>
                    ite.fechaRegistro === fechaRegistro &&
                    ite.idParticipante === idParticipante
            );

            let currentSum = {};

            row.values.forEach((grupo) => {
                const { values } = grupo;

                values.forEach((alimento) => {
                    currentSum = caseSumValues(currentSum, alimento);
                });
            });

            found.values.forEach((grupo) => {
                const { values } = grupo;

                values?.forEach((alimento) => {
                    currentSum = caseSumValues(currentSum, alimento);
                });
            });

            found.values = [currentSum];
            return;
        }

        iteratedObjects.push(row);
    });
    console.log(iteratedObjects);
    return iteratedObjects;
};

const getSumByDay = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const normalizedData = caseGetValuesByConsumption(data);

    const iteratedObjects = normalizeDataByDateAndUser(normalizedData);

    iteratedObjects.forEach((row) => {
        const elements = row.values;
        const hasMoreThanOneElement = elements.length > 1;

        if (hasMoreThanOneElement) {
            let suma = {};

            elements.forEach((grupo) => {
                const { values } = grupo;

                values.forEach((alimento) => {
                    suma = caseSumValues(suma, alimento);
                });
            });

            row.values = [suma];
        } else {
            const hasValuesProperty = elements[0].hasOwnProperty('values');

            if (hasValuesProperty) {
                row.values = elements[0].values;
            } else {
                row.values = elements;
            }
        }
    });

    return iteratedObjects;
};

export default getSumByDay;
