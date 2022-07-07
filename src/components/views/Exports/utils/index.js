import { isEmptyArray, isEmptyObject, isInvalidElem } from '../../../../utils';
import { KG } from '../constants';

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

export const normalizeSumByGroupDTO = (prevData, newData) => {
    if (isEmptyObject(newData)) return {};

    const {
        id,
        sku,
        nombreAlimento,
        grupoExportable,
        subGrupoExportable,
        grupoAlimento,
        clasificacionExportable,
        opcionesPreparacion,
        icono,
        mensaje,
        cantidadAlimento,
        caloriasMacronutrientes,
        vitaminas,
        minerales,
        aspectoGlucemico,
        aspectoEconomico,
        aspectoMedioambiental,
        componentesBioactivos,
        aditivosAlimentarios,
        cantidad: consumption,
    } = newData;

    const {
        energia,
        proteina,
        lipidos,
        agSaturados,
        agMonoinsaturados,
        adPoliinsaturados,
        colesterol,
        omega3,
        omega6,
        omega9,
        hidratosDeCarbono,
        fibra,
        fibraSoluble,
        fibraInsoluble,
        azucar,
        etanol,
    } = caloriasMacronutrientes;

    const {
        tiamina,
        riboflavin,
        niacina,
        acidoPantotenico,
        piridoxina,
        biotina,
        cobalmina,
        acidoAscorbico,
        acidoFolico,
        vitaminaA,
        vitaminaD,
        vitaminaK,
        vitaminaE,
    } = vitaminas;

    const {
        calcio,
        fosforo,
        hierro,
        hierroNoHem,
        hierroTotal,
        magnesio,
        sodio,
        potasio,
        zinc,
        selenio,
    } = minerales;

    const { indiceGlicemico, cargaGlicemica } = aspectoGlucemico;

    const {
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo,
        lugar,
        huellaHidricaTotal,
        huellaHidricaVerde,
        huellaHidricaAzul,
        huellaHidricaGris,
        aguaParaLavado,
        aguaParaCoccion,
        lugarEGEI,
        citaEGEI,
        huellaCarbono,
        huellaEcologica,
        energiaFosil,
        usoDeSuelo,
        nitrogeno,
        puntajeEcologico,
        ...rest
    } = aspectoMedioambiental;

    const { precio, lugarDeCompra, lugarDeVenta } = aspectoEconomico;

    const {
        fitoquimicos,
        polifenoles,
        antocianinas,
        taninos,
        isoflavonas,
        resveratrol,
        isotiocinatos,
        caretenoides,
        betacarotenos,
        licopeno,
        luteina,
        alicina,
        cafeina,
        UFC,
    } = componentesBioactivos;

    const {
        benzoatoDeSodio,
        polisorbato,
        azulBrillanteFCFoE133,
        azurrubinaOE102,
        amarilloOcasoFDFoE110,
        tartrazinaOE102,
        verdeSoE142,
        negroBrillanteBNoE151,
        sucralosa,
        estevia,
        sacarina,
        aspartame,
        acesulfameK,
        carboxymethylcellulose,
        dioxidoDeTitanio,
        monolauratoDeGlicerol,
    } = aditivosAlimentarios;

    const washingValue = (consumption * aguaParaLavado) / KG;
    const cookingValue = (consumption * aguaParaCoccion) / KG;

    return {
        energiaKcal: getPropSum(prevData?.energia, energia),
        proteina: getPropSum(prevData?.proteina, proteina),
        lipidos: getPropSum(prevData?.lipidos, lipidos),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados),
        agMonoinsaturados: getPropSum(prevData?.agMonoinsaturados, agMonoinsaturados),
        agPoliinsaturados: getPropSum(prevData?.adPoliinsaturados, adPoliinsaturados),
        colesterol: getPropSum(prevData?.colesterol, colesterol),
        omega3: getPropSum(prevData?.omega3, omega3),
        omega6: getPropSum(prevData?.omega6, omega6),
        omega9: getPropSum(prevData?.omega9, omega9),
        hidratosDeCarbono: getPropSum(prevData?.hidratosDeCarbono, hidratosDeCarbono),
        fibra: getPropSum(prevData?.fibra, fibra),
        fibraSoluble: getPropSum(prevData?.fibraSoluble, fibraSoluble),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble),
        azucar: getPropSum(prevData?.azucar, azucar),
        etanol: getPropSum(prevData?.etanol, etanol),
        tiamina: getPropSum(prevData?.tiamina, tiamina),
        riboflavina: getPropSum(prevData?.riboflavin, riboflavin),
        niacina: getPropSum(prevData?.niacina, niacina),
        acidoPantotenico: getPropSum(prevData?.acidoPantotenico, acidoPantotenico),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina),
        biotina: getPropSum(prevData?.biotina, biotina),
        cobalamina: getPropSum(prevData?.cobalmina, cobalmina),
        acidoAscorbico: getPropSum(prevData?.acidoAscorbico, acidoAscorbico),
        acidoFolico: getPropSum(prevData?.acidoFolico, acidoFolico),
        vitaminaA: getPropSum(prevData?.vitaminaA, vitaminaA),
        vitaminaD: getPropSum(prevData?.vitaminaD, vitaminaD),
        vitaminaK: getPropSum(prevData?.vitaminaK, vitaminaK),
        vitaminaE: getPropSum(prevData?.vitaminaE, vitaminaE),
        calcio: getPropSum(prevData?.calcio, calcio),
        fosforo: getPropSum(prevData?.fosforo, fosforo),
        hierro: getPropSum(prevData?.hierro, hierro),
        hierroNoHem: getPropSum(prevData?.hierroNoHem, hierroNoHem),
        hierroTotal: getPropSum(prevData?.hierroTotal, hierroTotal),
        magnesio: getPropSum(prevData?.magnesio, magnesio),
        sodio: getPropSum(prevData?.sodio, sodio),
        potasio: getPropSum(prevData?.potasio, potasio),
        zinc: getPropSum(prevData?.zinc, zinc),
        selenio: getPropSum(prevData?.selenio, selenio),
        indiceGlicemico: getPropSum(prevData?.indiceGlicemico, indiceGlicemico),
        cargaGlicemica: getPropSum(prevData?.cargaGlicemica, cargaGlicemica),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getPropSum(prevData?.huellaHidricaTotal, huellaHidricaTotal),
        huellaHidricaVerde: getPropSum(prevData?.huellaHidricaVerde, huellaHidricaVerde),
        huellaHidricaAzul: getPropSum(prevData?.huellaHidricaAzul, huellaHidricaAzul),
        huellaHidricaGris: getPropSum(prevData?.huellaHidricaGris, huellaHidricaGris),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaCarbono, huellaCarbono),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno),
        fosforoAmbiental: getPropSum(prevData?.rest?.fosforo, rest.fosforo),
        puntajeEcologico: getPropSum(prevData?.puntajeEcologico, puntajeEcologico),
        precio: getPropSum(prevData?.precio, precio),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas),
        taninos: getPropSum(prevData?.taninos, taninos),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol),
        isotiocianatos: getPropSum(prevData?.isotiocinatos, isotiocinatos),
        carotenoides: getPropSum(prevData?.caretenoides, caretenoides),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos),
        licopeno: getPropSum(prevData?.licopeno, licopeno),
        luteina: getPropSum(prevData?.luteina, luteina),
        alicina: getPropSum(prevData?.alicina, alicina),
        cafeina: getPropSum(prevData?.cafeina, cafeina),
        ufc: getPropSum(prevData?.UFC, UFC),
        benzoatoDeSodio: getPropSum(prevData?.benzoatoDeSodio, benzoatoDeSodio),
        polisorbato: getPropSum(prevData?.polisorbato, polisorbato),
        azulBrillanteFCFoE133: getPropSum(
            prevData?.azulBrillanteFCFoE133,
            azulBrillanteFCFoE133
        ),
        azurrubinaOE102: getPropSum(prevData?.azurrubinaOE102, azurrubinaOE102),
        amarilloOcasoFDFoE110: getPropSum(
            prevData?.amarilloOcasoFDFoE110,
            amarilloOcasoFDFoE110
        ),
        tartrazinaOE102: getPropSum(prevData?.tartrazinaOE102, tartrazinaOE102),
        verdeSoE142: getPropSum(prevData?.verdeSoE142, verdeSoE142),
        negroBrillanteBNoE151: getPropSum(
            prevData?.negroBrillanteBNoE151,
            negroBrillanteBNoE151
        ),
        sucralosa: getPropSum(prevData?.sucralosa, sucralosa),
        estevia: getPropSum(prevData?.estevia, estevia),
        sacarina: getPropSum(prevData?.sacarina, sacarina),
        aspartame: getPropSum(prevData?.aspartame, aspartame),
        acesulfameK: getPropSum(prevData?.acesulfameK, acesulfameK),
        carboxymethylcellulose: getPropSum(
            prevData?.carboxymethylcellulose,
            carboxymethylcellulose
        ),
        dioxidoDeTitanio: getPropSum(prevData?.dioxidoDeTitanio, dioxidoDeTitanio),
        monolauratoDeGlicerol: getPropSum(
            prevData?.monolauratoDeGlicerol,
            monolauratoDeGlicerol
        ),
    };
};

export const getPropSum = (firstProp, secondProp) => {
    const firstValue = Number(firstProp);
    const secondValue = Number(secondProp);

    if (isNaN(firstValue)) return secondValue;

    if (isNaN(secondValue) && !isNaN(firstValue)) return firstValue;

    if (isNaN(secondValue)) return 0;

    return firstValue + secondValue;
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

export const groupByRegId = (data) => {
    if (isInvalidElem(data) || isEmptyArray(data)) return;

    const idsMapped = [];
    const result = [];

    data.forEach((elem) => {
        const { fechaRegistro, id, idParticipante, idRegistro, values } = elem;

        if (idsMapped.includes(idRegistro)) {
            const index = result.findIndex((item) => item.idRegistro === idRegistro);

            if (index === -1) return;

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
    const result = data.map((elem) => {
        const { values, ...rest } = elem;

        const newValues = [];
        const gruopsMapped = [];

        values.forEach((el) => {
            const { grupo, ...rest } = el;

            if (gruopsMapped.includes(grupo)) {
                const index = gruopsMapped.findIndex((e) => e === grupo);

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

export const finalRows = (data) => {
    if (isInvalidElem(data)) return {};

    const rows = [];

    data.forEach((elem) => {
        const { idParticipante, idRegistro, fechaRegistro, values } = elem;

        let objToPush = {
            idParticipante,
            idRegistro,
            fechaRegistro,
        };

        values.forEach((group) => {
            const { grupo, values } = group;

            objToPush.grupoAlimento = grupo;

            let finalRow = {};

            values.forEach((food) => {
                finalRow = normalizeSumByGroupDTO(finalRow, food);
            });

            objToPush = { ...objToPush, ...finalRow };

            rows.push(objToPush);
        });
    });

    return rows;
};
