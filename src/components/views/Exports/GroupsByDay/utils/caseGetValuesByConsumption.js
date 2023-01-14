import normalizeObjectsByQuantity from '../../utils/adapters/normalizeObjectByQuantity';

import { flatArray } from './shared';

const normalizeFood = (data) => {
    const foods = data.map((food) => normalizeObjectsByQuantity(food));
    return flatArray(foods);
};

const normalizeGroups = (data) => {
    const groups = data.map(({ values, grupo }) => {
        return { values: normalizeFood(values), grupo };
    });

    return flatArray(groups);
};

const caseGetValuesByConsumption = (data) => {
    const result = data.map(({ values, ...rest }) => {
        return {
            ...rest,
            values: normalizeGroups(values),
        };
    });

    return result;
};

export default caseGetValuesByConsumption;
