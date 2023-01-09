import dayjs from 'dayjs';

import {
    isEmptyArray,
    isEmptyObject,
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
import groups from '../data/excelGroups';
import * as calories from '../data/calories';
import * as vitamins from '../data/vitamins';
import * as minerals from '../data/minerals';
import * as glycemic from '../data/glycemic';
import * as environmental from '../data/environmental';
import * as economic from '../data/economic';
import * as bioactives from '../data/bioactives';
import * as additives from '../data/additives';
import * as extraColumns2 from '../data/extraColumns';
import * as food from '../data/foodGroups';

import normalizeSumByGroup from './adapters/normalizeSumByGroup';
import normalizeSumBySubGroup from './adapters/normalizeSumBySubGroup';
import normalizeSumByUltraProcessed from './adapters/normalizeSumByUltraProcessed';
import normalizeSumByAppropriate from './adapters/normalizeSumByAppropriate';
import normalizeSumBySubGroupSmae from './adapters/normalizeSumBySubGroupSmae';
import normalizeObjectsByQuantity from './adapters/normalizeObjectByQuantity';
import caseGetZeroData from './caseGetZeroData';
import casePropertiesOrder from './casePropertiesOrder';
import casePropertiesByDay from './casePropertiesOrderByDay';
import casePropertiesByQuantity from './casePropertiesByQuantity';

export const getIsSelected = (state, number, index) => {
    return state[number] === true && index === number;
};

export const getArrayByGroups = (groups) => {
    if (isEmptyArray(groups)) return [];

    const array = groups.map((elem) => {
        return {
            id: elem,
            values: [],
        };
    });

    return array;
};

export const normalizeArrayToExport = ({ state, group, food }) => {
    if (isInvalidElem(state) || isInvalidElem(group) || isInvalidElem(food)) return [];

    const auxState = state;
    const groupIndex = auxState.findIndex(({ id }) => id === group);

    if (groupIndex === -1) return;

    const currentState = auxState[groupIndex];
    currentState.values = [...currentState.values, food];

    auxState[groupIndex] = currentState;

    return auxState;
};

export const getRowValues = (data) => {
    if (isInvalidElem(data)) return [];

    const limpio = data.map((elem) => {
        const { fechaRegistro, idParticipante, idRegistro, ...rest } = elem;

        const normalizedValues = removeEmptyValues(rest);

        return {
            fechaRegistro,
            idRegistro,
            idParticipante,
            ...normalizedValues[0],
        };
    });

    return groupByRegId(limpio);
};

export const getRowValuesYesterday = (data) => {
    if (isInvalidElem(data)) return [];

    const limpio = data.map((elem) => {
        const { usuario, createdAt, ...rest } = elem;

        const normalizedValues = removeEmptyValues(rest);

        return {
            usuario,
            createdAt,
            ...normalizedValues[0],
        };
    });

    return limpio;
};

export const groupByRegId = (data) => {
    if (isInvalidElem(data) || isEmptyArray(data)) return;

    const idsMapped = [];
    const result = [];

    data.forEach((elem) => {
        const { fechaRegistro, id, idParticipante, idRegistro, values } = elem;

        if (idsMapped.includes(idRegistro)) {
            const index = result.findIndex((item) => item.idRegistro === idRegistro);

            if (index === -1) {
                return;
            }

            result[index].values.push({
                grupo: id,
                values,
            });

            return;
        } else {
            idsMapped.push(idRegistro);
            result.push({
                fechaRegistro,
                idRegistro,
                idParticipante,
                values: [
                    {
                        grupo: id,
                        values,
                    },
                ],
            });
        }
    });

    return result;
};

export const removeEmptyValues = (data) => {
    if (isInvalidElem(data)) return {};

    const result = [];
    const normalizedData = Object.values(data);

    normalizedData.forEach((elem) => {
        const { values } = elem;
        if (isEmptyArray(values)) return;

        result.push(elem);
    });

    return result;
};

export const unifyArrays = (data) => {
    const groupsMapped = [];
    const result = [];

    data.forEach((food) => {
        const { grupo, values } = food;

        if (groupsMapped.includes(grupo)) {
            const groupIndex = result.findIndex((item) => item.grupo === grupo);

            if (groupIndex === -1) return;

            result[groupIndex].values = [...result[groupIndex].values, ...values];
        } else {
            groupsMapped.push(grupo);
            result.push(food);
        }
    });

    return result;
};

export const unifyGroups = (data) => {
    if (isInvalidElem(data)) return [];

    const result = data.map((elem) => {
        const { values, ...rest } = elem;

        const newValues = [];
        const gruopsMapped = [];

        values.forEach((el) => {
            const { grupo, ...rest } = el;

            if (gruopsMapped.includes(grupo)) {
                const index = gruopsMapped.findIndex((e) => e === grupo);

                if (index === -1) {
                    return;
                }

                newValues[index].values.push(...rest.values);
                return;
            }

            gruopsMapped.push(grupo);
            newValues.push(el);
        });

        return { ...rest, values: newValues };
    });

    return result;
};

export const getMethodType = (num) => {
    switch (num) {
        case 1:
            return normalizeSumByGroup;
        case 2:
            return normalizeSumBySubGroup;
        case 3:
            return normalizeSumByUltraProcessed;
        case 4:
            return normalizeSumByAppropriate;
        case 5:
            return normalizeSumBySubGroupSmae;
        default:
            return normalizeSumByGroup;
    }
};

export const generateCsvRows = (data, type) => {
    if (isInvalidElem(data)) return {};

    const normalizedMethod = getMethodType(type);
    const rows = [];

    data.forEach((elem) => {
        const { idParticipante, idRegistro, fechaRegistro, values } = elem;

        let objToPush = {
            idParticipante,
            idRegistro,
            fechaRegistro,
        };

        values.forEach((group) => {
            let finalRow = {};

            const isArray = Array.isArray(group.values);

            if (isArray) {
                group.values.forEach((food) => {
                    finalRow = normalizedMethod(finalRow, food);
                });
                objToPush = { ...objToPush, ...finalRow };
                rows.push(objToPush);
            } else {
                objToPush = { ...objToPush, ...normalizedMethod(finalRow, group) };
                rows.push(objToPush);
            }
        });
    });

    return rows;
};

export const generateFinalCsvRows = (data, groupNames, users) => {
    const rows = [];
    const uniqueIds = new Set([...data.map((elem) => elem.idRegistro)]);

    const copyUnique = [...uniqueIds];

    copyUnique.forEach((id) => {
        const filteredRows = data.filter((elem) => elem.idRegistro === id);

        const newIds = filteredRows.map((elem) => {
            const idIndex = users.findIndex((e) => e === elem.idParticipante);
            if (idIndex === -1) {
                return elem;
            }

            const obj = {
                ...elem,
                idParticipante: Number(idIndex + 1),
            };

            return obj;
        });

        rows.push(newIds);
    });

    const tempRows = [];

    rows.forEach((row) => {
        let newRow = [];
        row.forEach((register, index) => {
            const { idParticipante, idRegistro, fechaRegistro } = register;
            const newRegister = casePropertiesOrder(register);

            if (isEmptyArray(newRow)) {
                newRow.push(idParticipante, idRegistro, fechaRegistro, newRegister);
            } else {
                newRow = [...newRow, newRegister];
            }
        });
        tempRows.push(newRow);
    });

    const finalRows = [];

    const tempGroups = [];

    tempRows.forEach((elem) => {
        const aux = [];

        elem.forEach((value) => {
            const isArray = Array.isArray(value);

            if (!isArray) {
                return;
            }

            aux.push(value);
        });

        tempGroups.push(aux);
    });

    tempRows.forEach((elem, index) => {
        const tempAux = tempGroups[index];

        const zeroArray = groupNames.map((group) => caseGetZeroData(group));

        const indexes = [];

        tempAux.forEach((temp) => {
            const groupName = temp[0];

            const zeroIndex = zeroArray.findIndex((e) => e[0] === groupName);

            if (zeroIndex === -1) {
                return;
            }

            indexes.push(zeroIndex);
        });

        indexes.forEach((index, innerIndex) => {
            zeroArray[index] = tempAux[innerIndex];
        });

        const rowToPush = [];

        elem.forEach((value) => {
            const isArray = Array.isArray(value);

            if (!isArray) {
                rowToPush.push(value);
            }
        });

        rowToPush.push(...zeroArray.flat());
        finalRows.push(rowToPush);
    });

    return finalRows;
};

export const getFinalColumns = (columns, maxColumns) => {
    const newColumns = columns;

    for (let i = 0; i < maxColumns - 1; i++) {
        newColumns.push(
            ...food.groupColumns0,
            ...extraColumns2.extraColumns0,
            ...calories.caloriasMacronutrientes0,
            ...vitamins.vitaminas0,
            ...minerals.minerales0,
            ...glycemic.aspectoGlucemico0,
            ...environmental.aspectosMedioambientales0,
            ...economic.aspectosEconomicos0,
            ...bioactives.componentesBioactivos0,
            ...additives.aditivosAlimentarios0
        );
    }

    const finalColumns = [];
    newColumns.forEach((columnProps) => {
        finalColumns.push(columnProps.title);
    });

    return finalColumns;
};

export const getFinalColumnsByDay = (columns, maxColumns) => {
    const newColumns = columns;

    for (let i = 0; i < maxColumns - 1; i++) {
        newColumns.push(
            ...calories.caloriasMacronutrientes0,
            ...vitamins.vitaminas0,
            ...minerals.minerales0,
            ...glycemic.aspectoGlucemico0,
            ...environmental.aspectosMedioambientales0,
            ...economic.aspectosEconomicos0,
            ...bioactives.componentesBioactivos0,
            ...additives.aditivosAlimentarios0
        );
    }

    const finalColumns = [];
    newColumns.forEach((columnProps) => {
        finalColumns.push(columnProps.title);
    });

    return finalColumns;
};

export const getMultiplyData = (value, quantity) => {
    return Number(value * quantity);
};

export const normalizeValuesByConsumption = (data) => {
    const result = data.map((row) => {
        const { values, ...rest } = row;

        const firstObj = {
            ...rest,
        };

        const firstGroups = values
            .map((group) => {
                const alimentos = group.values;
                const grupo = group.grupo;

                const secondObj = {
                    grupo,
                };

                const foods = alimentos
                    .map((alimento) => normalizeObjectsByQuantity(alimento))
                    .flat(2);

                secondObj.values = foods;
                return secondObj;
            })
            .flat(2);

        firstObj.values = firstGroups;

        return firstObj;
    });

    return result;
};

export const normalizeDataByDateAndUser = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const objetosIterados = [];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante } = row;

        const yaIterado = objetosIterados.some((obj) => {
            return (
                obj.fechaRegistro === fechaRegistro && obj.idParticipante === idParticipante
            );
        });

        if (!yaIterado) {
            objetosIterados.push(row);
        } else {
            const found = objetosIterados.find(
                (ite) =>
                    ite.fechaRegistro === fechaRegistro &&
                    ite.idParticipante === idParticipante
            );

            let suma = {};

            row.values.forEach((grupo) => {
                const { values } = grupo;

                values.forEach((alimento) => {
                    suma = sumObjectValues(suma, alimento);
                });
            });

            found.values.forEach((grupo) => {
                const { values } = grupo;

                values?.forEach((alimento) => {
                    suma = sumObjectValues(suma, alimento);
                });
            });

            found.values = [suma];
        }
    });

    return objetosIterados;
};

export const getSumByDay = (data) => {
    if (isInvalidElem(data)) {
        return [];
    }

    const normalizedData = normalizeValuesByConsumption(data);

    const objetosIterados = normalizeDataByDateAndUser(normalizedData);

    objetosIterados.forEach((row) => {
        const elements = row.values;
        const hasMoreThanOneElement = elements.length > 1;

        if (hasMoreThanOneElement) {
            let suma = {};

            elements.forEach((grupo) => {
                const { values } = grupo;

                values.forEach((alimento) => {
                    suma = sumObjectValues(suma, alimento);
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

    return objetosIterados;
};

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
            console.log('cantidad obj', { firstValue, secondValue, esNum1, esNum2 });
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
        console.log('cantidad', { firstValue, secondValue, esNum1, esNum2 });
    } else {
        objRef[key] = firstObj[key];
    }
};

export const sumObjectValues = (firstObj, secondObj) => {
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

export const generateCsvRowsByDay = (data) => {
    if (isInvalidElem(data)) {
        return {};
    }

    const rows = [];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante, idRegistro, values } = row;

        const objToPush = {
            fechaRegistro,
            idParticipante,
            idRegistro,
            ...values[0],
        };

        rows.push(objToPush);
    });

    return rows;
};

export const generateCsvRowsYesterday = (data) => {
    if (isInvalidElem(data)) {
        return {};
    }

    const rows = [];

    data.forEach((row) => {
        const { values } = row;

        const objToPush = {
            ...values[0],
        };

        rows.push(objToPush);
    });

    return rows;
};

export const generateFinalCsvRowsByDay = (data, type, users) => {
    const tempFirstsValues = [];
    const tempRows = [];
    const rowsAsStrings = [];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante, idRegistro } = row;
        const newRegister = casePropertiesByDay(row);

        const idIndex = users.findIndex((e) => e === idParticipante);
        tempRows.push(newRegister);
        if (idIndex === -1) {
            tempFirstsValues.push({
                0: idParticipante,
                1: idRegistro,
                2: fechaRegistro,
            });
            return;
        }

        tempFirstsValues.push({
            0: Number(idIndex + 1),
            1: idRegistro,
            2: fechaRegistro,
        });
    });

    Object.values(tempRows).forEach((rowObject, index) => {
        const auxRow = [];
        Object.values(rowObject).forEach((rowValue) => {
            auxRow.push(rowValue);
        });

        auxRow.unshift(
            tempFirstsValues[index][0],
            tempFirstsValues[index][1],
            tempFirstsValues[index][2]
        );

        rowsAsStrings.push(auxRow);
    });

    return rowsAsStrings;
};

export const normalizeAlimentosYesterday = (row, array, objPush) => {
    row.forEach((alimentos) => {
        const { id, cantidad, nombre } = alimentos;

        if (id) {
            const newArray1 = [
                array[0],
                id.id,
                nombre,
                cantidad,
                id.cantidadAlimento.pesoNeto,
                dayjs(array[1]).format('DD/MM/YYYY'),
                ...casePropertiesByQuantity(id),
            ];
            objPush.push(newArray1);
        }
    });
};
