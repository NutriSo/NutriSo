import { isInvalidElem } from '@/utils';

import caseGetWashingValue from './caseGetWashingValue';
import caseGetCookingValue from './caseGetCookingValue';
import getRowsDataStructure from '../adapters/rowsData';
import { textToNumber, getMultiply } from './shared';

export const normalizeResponse = (data, userIds) => {
    if (isInvalidElem(data)) {
        return [];
    }
    const { users, registers } = data;

    const result = [];

    for (const row of registers) {
        const informationId = users.findIndex((user) => user.usuario === row.usuario);
        const userID = userIds.findIndex((id) => id === row.usuario);

        row.alimentos.forEach((food) => {
            const foodDetails = food.id;

            const quantity = textToNumber(food.cantidad);
            const factor = textToNumber(
                foodDetails.aspectoMedioambiental.factorDeCorreccionParaHuellaHidricaYEGEI
            );

            const washing = textToNumber(foodDetails.aspectoMedioambiental.aguaParaLavado);
            const cooking = textToNumber(foodDetails.aspectoMedioambiental.aguaParaCoccion);
            const consumption = getMultiply(foodDetails.cantidadAlimento.pesoNeto, quantity);

            const washingValue = caseGetWashingValue(consumption, washing);
            const cookingValue = caseGetCookingValue(consumption, cooking);

            result.push(
                getRowsDataStructure({
                    userId: userID + 1,
                    userName: `${users[informationId].nombre} ${users[informationId].apellidoPaterno} ${users[informationId].apellidoMaterno}`,
                    category: row.tipo,
                    date: row.horario,
                    registerDate: row.createdAt,
                    food: foodDetails,
                    quantity,
                    factor,
                    washingValue,
                    cookingValue,
                })
            );
        });
    }

    return result;
};
