import { isEmptyArray, isEmptyObject, isInvalidElem } from '../../../../utils';
import { KG } from '../constants';
// 34.
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

    const result = {
        grupoAlimento: grupoExportable,
        energiaKcal: getPropSum(prevData?.energiaKcal, energia, consumption),
        proteina: getPropSum(prevData?.proteina, proteina, consumption),
        lipidos: getPropSum(prevData?.lipidos, lipidos, consumption),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados, consumption),
        agMonoinsaturados: getPropSum(
            prevData?.agMonoinsaturados,
            agMonoinsaturados,
            consumption
        ),
        agPoliinsaturados: getPropSum(
            prevData?.adPoliinsaturados,
            adPoliinsaturados,
            consumption
        ),
        colesterol: getPropSum(prevData?.colesterol, colesterol, consumption),
        omega3: getPropSum(prevData?.omega3, omega3, consumption),
        omega6: getPropSum(prevData?.omega6, omega6, consumption),
        omega9: getPropSum(prevData?.omega9, omega9, consumption),
        hidratosDeCarbono: getPropSum(
            prevData?.hidratosDeCarbono,
            hidratosDeCarbono,
            consumption
        ),
        fibra: getPropSum(prevData?.fibra, fibra, consumption),
        fibraSoluble: getPropSum(prevData?.fibraSoluble, fibraSoluble, consumption),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble, consumption),
        azucar: getPropSum(prevData?.azucar, azucar, consumption),
        etanol: getPropSum(prevData?.etanol, etanol, consumption),
        tiamina: getPropSum(prevData?.tiamina, tiamina, consumption),
        riboflavina: getPropSum(prevData?.riboflavin, riboflavin, consumption),
        niacina: getPropSum(prevData?.niacina, niacina, consumption),
        acidoPantotenico: getPropSum(
            prevData?.acidoPantotenico,
            acidoPantotenico,
            consumption
        ),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina, consumption),
        biotina: getPropSum(prevData?.biotina, biotina, consumption),
        cobalamina: getPropSum(prevData?.cobalmina, cobalmina, consumption),
        acidoAscorbico: getPropSum(prevData?.acidoAscorbico, acidoAscorbico, consumption),
        acidoFolico: getPropSum(prevData?.acidoFolico, acidoFolico, consumption),
        vitaminaA: getPropSum(prevData?.vitaminaA, vitaminaA, consumption),
        vitaminaD: getPropSum(prevData?.vitaminaD, vitaminaD, consumption),
        vitaminaK: getPropSum(prevData?.vitaminaK, vitaminaK, consumption),
        vitaminaE: getPropSum(prevData?.vitaminaE, vitaminaE, consumption),
        calcio: getPropSum(prevData?.calcio, calcio, consumption),
        fosforo: getPropSum(prevData?.fosforo, fosforo, consumption),
        hierro: getPropSum(prevData?.hierro, hierro, consumption),
        hierroNoHem: getPropSum(prevData?.hierroNoHem, hierroNoHem, consumption),
        hierroTotal: getPropSum(prevData?.hierroTotal, hierroTotal, consumption),
        magnesio: getPropSum(prevData?.magnesio, magnesio, consumption),
        sodio: getPropSum(prevData?.sodio, sodio, consumption),
        potasio: getPropSum(prevData?.potasio, potasio, consumption),
        zinc: getPropSum(prevData?.zinc, zinc, consumption),
        selenio: getPropSum(prevData?.selenio, selenio, consumption),
        indiceGlicemico: getPropSum(prevData?.indiceGlicemico, indiceGlicemico, consumption),
        cargaGlicemica: getPropSum(prevData?.cargaGlicemica, cargaGlicemica, consumption),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getPropSum(
            prevData?.huellaHidricaTotal,
            huellaHidricaTotal,
            consumption
        ),
        huellaHidricaVerde: getPropSum(
            prevData?.huellaHidricaVerde,
            huellaHidricaVerde,
            consumption
        ),
        huellaHidricaAzul: getPropSum(
            prevData?.huellaHidricaAzul,
            huellaHidricaAzul,
            consumption
        ),
        huellaHidricaGris: getPropSum(
            prevData?.huellaHidricaGris,
            huellaHidricaGris,
            consumption
        ),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue, consumption),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue, consumption),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaCarbono, huellaCarbono, consumption),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica, consumption),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
        fosforoAmbiental: getPropSum(prevData?.rest?.fosforo, rest.fosforo, consumption),
        puntajeEcologico: getPropSum(
            prevData?.puntajeEcologico,
            puntajeEcologico,
            consumption
        ),
        precio: getPropSum(prevData?.precio, precio, consumption),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos, consumption),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles, consumption),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas, consumption),
        taninos: getPropSum(prevData?.taninos, taninos, consumption),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas, consumption),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol, consumption),
        isotiocianatos: getPropSum(prevData?.isotiocinatos, isotiocinatos, consumption),
        carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos, consumption),
        licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
        luteina: getPropSum(prevData?.luteina, luteina, consumption),
        alicina: getPropSum(prevData?.alicina, alicina, consumption),
        cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
        ufc: getPropSum(prevData?.UFC, UFC, consumption),
        benzoatoDeSodio: getPropSum(prevData?.benzoatoDeSodio, benzoatoDeSodio, consumption),
        polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
        azulBrillanteFCFoE133: getPropSum(
            prevData?.azulBrillanteFCFoE133,
            azulBrillanteFCFoE133,
            consumption
        ),
        azurrubinaOE102: getPropSum(prevData?.azurrubinaOE102, azurrubinaOE102, consumption),
        amarilloOcasoFDFoE110: getPropSum(
            prevData?.amarilloOcasoFDFoE110,
            amarilloOcasoFDFoE110,
            consumption
        ),
        tartrazinaOE102: getPropSum(prevData?.tartrazinaOE102, tartrazinaOE102, consumption),
        verdeSoE142: getPropSum(prevData?.verdeSoE142, verdeSoE142, consumption),
        negroBrillanteBNoE151: getPropSum(
            prevData?.negroBrillanteBNoE151,
            negroBrillanteBNoE151,
            consumption
        ),
        sucralosa: getPropSum(prevData?.sucralosa, sucralosa, consumption),
        estevia: getPropSum(prevData?.estevia, estevia, consumption),
        sacarina: getPropSum(prevData?.sacarina, sacarina, consumption),
        aspartame: getPropSum(prevData?.aspartame, aspartame, consumption),
        acesulfameK: getPropSum(prevData?.acesulfameK, acesulfameK, consumption),
        carboxymethylcellulose: getPropSum(
            prevData?.carboxymethylcellulose,
            carboxymethylcellulose,
            consumption
        ),
        dioxidoDeTitanio: getPropSum(
            prevData?.dioxidoDeTitanio,
            dioxidoDeTitanio,
            consumption
        ),
        monolauratoDeGlicerol: getPropSum(
            prevData?.monolauratoDeGlicerol,
            monolauratoDeGlicerol,
            consumption
        ),
    };

    return result;
};

export const normalizeSumBySubGroupDTO = (prevData, newData) => {
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

    const result = {
        grupoAlimento: subGrupoExportable,
        energiaKcal: getPropSum(prevData?.energiaKcal, energia, consumption),
        proteina: getPropSum(prevData?.proteina, proteina, consumption),
        lipidos: getPropSum(prevData?.lipidos, lipidos, consumption),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados, consumption),
        agMonoinsaturados: getPropSum(
            prevData?.agMonoinsaturados,
            agMonoinsaturados,
            consumption
        ),
        agPoliinsaturados: getPropSum(
            prevData?.adPoliinsaturados,
            adPoliinsaturados,
            consumption
        ),
        colesterol: getPropSum(prevData?.colesterol, colesterol, consumption),
        omega3: getPropSum(prevData?.omega3, omega3, consumption),
        omega6: getPropSum(prevData?.omega6, omega6, consumption),
        omega9: getPropSum(prevData?.omega9, omega9, consumption),
        hidratosDeCarbono: getPropSum(
            prevData?.hidratosDeCarbono,
            hidratosDeCarbono,
            consumption
        ),
        fibra: getPropSum(prevData?.fibra, fibra, consumption),
        fibraSoluble: getPropSum(prevData?.fibraSoluble, fibraSoluble, consumption),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble, consumption),
        azucar: getPropSum(prevData?.azucar, azucar, consumption),
        etanol: getPropSum(prevData?.etanol, etanol, consumption),
        tiamina: getPropSum(prevData?.tiamina, tiamina, consumption),
        riboflavina: getPropSum(prevData?.riboflavin, riboflavin, consumption),
        niacina: getPropSum(prevData?.niacina, niacina, consumption),
        acidoPantotenico: getPropSum(
            prevData?.acidoPantotenico,
            acidoPantotenico,
            consumption
        ),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina, consumption),
        biotina: getPropSum(prevData?.biotina, biotina, consumption),
        cobalamina: getPropSum(prevData?.cobalmina, cobalmina, consumption),
        acidoAscorbico: getPropSum(prevData?.acidoAscorbico, acidoAscorbico, consumption),
        acidoFolico: getPropSum(prevData?.acidoFolico, acidoFolico, consumption),
        vitaminaA: getPropSum(prevData?.vitaminaA, vitaminaA, consumption),
        vitaminaD: getPropSum(prevData?.vitaminaD, vitaminaD, consumption),
        vitaminaK: getPropSum(prevData?.vitaminaK, vitaminaK, consumption),
        vitaminaE: getPropSum(prevData?.vitaminaE, vitaminaE, consumption),
        calcio: getPropSum(prevData?.calcio, calcio, consumption),
        fosforo: getPropSum(prevData?.fosforo, fosforo, consumption),
        hierro: getPropSum(prevData?.hierro, hierro, consumption),
        hierroNoHem: getPropSum(prevData?.hierroNoHem, hierroNoHem, consumption),
        hierroTotal: getPropSum(prevData?.hierroTotal, hierroTotal, consumption),
        magnesio: getPropSum(prevData?.magnesio, magnesio, consumption),
        sodio: getPropSum(prevData?.sodio, sodio, consumption),
        potasio: getPropSum(prevData?.potasio, potasio, consumption),
        zinc: getPropSum(prevData?.zinc, zinc, consumption),
        selenio: getPropSum(prevData?.selenio, selenio, consumption),
        indiceGlicemico: getPropSum(prevData?.indiceGlicemico, indiceGlicemico, consumption),
        cargaGlicemica: getPropSum(prevData?.cargaGlicemica, cargaGlicemica, consumption),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getPropSum(
            prevData?.huellaHidricaTotal,
            huellaHidricaTotal,
            consumption
        ),
        huellaHidricaVerde: getPropSum(
            prevData?.huellaHidricaVerde,
            huellaHidricaVerde,
            consumption
        ),
        huellaHidricaAzul: getPropSum(
            prevData?.huellaHidricaAzul,
            huellaHidricaAzul,
            consumption
        ),
        huellaHidricaGris: getPropSum(
            prevData?.huellaHidricaGris,
            huellaHidricaGris,
            consumption
        ),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue, consumption),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue, consumption),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaCarbono, huellaCarbono, consumption),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica, consumption),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
        fosforoAmbiental: getPropSum(prevData?.rest?.fosforo, rest.fosforo, consumption),
        puntajeEcologico: getPropSum(
            prevData?.puntajeEcologico,
            puntajeEcologico,
            consumption
        ),
        precio: getPropSum(prevData?.precio, precio, consumption),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos, consumption),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles, consumption),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas, consumption),
        taninos: getPropSum(prevData?.taninos, taninos, consumption),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas, consumption),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol, consumption),
        isotiocianatos: getPropSum(prevData?.isotiocinatos, isotiocinatos, consumption),
        carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos, consumption),
        licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
        luteina: getPropSum(prevData?.luteina, luteina, consumption),
        alicina: getPropSum(prevData?.alicina, alicina, consumption),
        cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
        ufc: getPropSum(prevData?.UFC, UFC, consumption),
        benzoatoDeSodio: getPropSum(prevData?.benzoatoDeSodio, benzoatoDeSodio, consumption),
        polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
        azulBrillanteFCFoE133: getPropSum(
            prevData?.azulBrillanteFCFoE133,
            azulBrillanteFCFoE133,
            consumption
        ),
        azurrubinaOE102: getPropSum(prevData?.azurrubinaOE102, azurrubinaOE102, consumption),
        amarilloOcasoFDFoE110: getPropSum(
            prevData?.amarilloOcasoFDFoE110,
            amarilloOcasoFDFoE110,
            consumption
        ),
        tartrazinaOE102: getPropSum(prevData?.tartrazinaOE102, tartrazinaOE102, consumption),
        verdeSoE142: getPropSum(prevData?.verdeSoE142, verdeSoE142, consumption),
        negroBrillanteBNoE151: getPropSum(
            prevData?.negroBrillanteBNoE151,
            negroBrillanteBNoE151,
            consumption
        ),
        sucralosa: getPropSum(prevData?.sucralosa, sucralosa, consumption),
        estevia: getPropSum(prevData?.estevia, estevia, consumption),
        sacarina: getPropSum(prevData?.sacarina, sacarina, consumption),
        aspartame: getPropSum(prevData?.aspartame, aspartame, consumption),
        acesulfameK: getPropSum(prevData?.acesulfameK, acesulfameK, consumption),
        carboxymethylcellulose: getPropSum(
            prevData?.carboxymethylcellulose,
            carboxymethylcellulose,
            consumption
        ),
        dioxidoDeTitanio: getPropSum(
            prevData?.dioxidoDeTitanio,
            dioxidoDeTitanio,
            consumption
        ),
        monolauratoDeGlicerol: getPropSum(
            prevData?.monolauratoDeGlicerol,
            monolauratoDeGlicerol,
            consumption
        ),
    };

    return result;
};

export const normalizeSumByUltraProcessedDTO = (prevData, newData) => {
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

    const result = {
        grupoAlimento: clasificacionExportable,
        energiaKcal: getPropSum(prevData?.energiaKcal, energia, consumption),
        proteina: getPropSum(prevData?.proteina, proteina, consumption),
        lipidos: getPropSum(prevData?.lipidos, lipidos, consumption),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados, consumption),
        agMonoinsaturados: getPropSum(
            prevData?.agMonoinsaturados,
            agMonoinsaturados,
            consumption
        ),
        agPoliinsaturados: getPropSum(
            prevData?.adPoliinsaturados,
            adPoliinsaturados,
            consumption
        ),
        colesterol: getPropSum(prevData?.colesterol, colesterol, consumption),
        omega3: getPropSum(prevData?.omega3, omega3, consumption),
        omega6: getPropSum(prevData?.omega6, omega6, consumption),
        omega9: getPropSum(prevData?.omega9, omega9, consumption),
        hidratosDeCarbono: getPropSum(
            prevData?.hidratosDeCarbono,
            hidratosDeCarbono,
            consumption
        ),
        fibra: getPropSum(prevData?.fibra, fibra, consumption),
        fibraSoluble: getPropSum(prevData?.fibraSoluble, fibraSoluble, consumption),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble, consumption),
        azucar: getPropSum(prevData?.azucar, azucar, consumption),
        etanol: getPropSum(prevData?.etanol, etanol, consumption),
        tiamina: getPropSum(prevData?.tiamina, tiamina, consumption),
        riboflavina: getPropSum(prevData?.riboflavin, riboflavin, consumption),
        niacina: getPropSum(prevData?.niacina, niacina, consumption),
        acidoPantotenico: getPropSum(
            prevData?.acidoPantotenico,
            acidoPantotenico,
            consumption
        ),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina, consumption),
        biotina: getPropSum(prevData?.biotina, biotina, consumption),
        cobalamina: getPropSum(prevData?.cobalmina, cobalmina, consumption),
        acidoAscorbico: getPropSum(prevData?.acidoAscorbico, acidoAscorbico, consumption),
        acidoFolico: getPropSum(prevData?.acidoFolico, acidoFolico, consumption),
        vitaminaA: getPropSum(prevData?.vitaminaA, vitaminaA, consumption),
        vitaminaD: getPropSum(prevData?.vitaminaD, vitaminaD, consumption),
        vitaminaK: getPropSum(prevData?.vitaminaK, vitaminaK, consumption),
        vitaminaE: getPropSum(prevData?.vitaminaE, vitaminaE, consumption),
        calcio: getPropSum(prevData?.calcio, calcio, consumption),
        fosforo: getPropSum(prevData?.fosforo, fosforo, consumption),
        hierro: getPropSum(prevData?.hierro, hierro, consumption),
        hierroNoHem: getPropSum(prevData?.hierroNoHem, hierroNoHem, consumption),
        hierroTotal: getPropSum(prevData?.hierroTotal, hierroTotal, consumption),
        magnesio: getPropSum(prevData?.magnesio, magnesio, consumption),
        sodio: getPropSum(prevData?.sodio, sodio, consumption),
        potasio: getPropSum(prevData?.potasio, potasio, consumption),
        zinc: getPropSum(prevData?.zinc, zinc, consumption),
        selenio: getPropSum(prevData?.selenio, selenio, consumption),
        indiceGlicemico: getPropSum(prevData?.indiceGlicemico, indiceGlicemico, consumption),
        cargaGlicemica: getPropSum(prevData?.cargaGlicemica, cargaGlicemica, consumption),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getPropSum(
            prevData?.huellaHidricaTotal,
            huellaHidricaTotal,
            consumption
        ),
        huellaHidricaVerde: getPropSum(
            prevData?.huellaHidricaVerde,
            huellaHidricaVerde,
            consumption
        ),
        huellaHidricaAzul: getPropSum(
            prevData?.huellaHidricaAzul,
            huellaHidricaAzul,
            consumption
        ),
        huellaHidricaGris: getPropSum(
            prevData?.huellaHidricaGris,
            huellaHidricaGris,
            consumption
        ),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue, consumption),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue, consumption),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaCarbono, huellaCarbono, consumption),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica, consumption),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
        fosforoAmbiental: getPropSum(prevData?.rest?.fosforo, rest.fosforo, consumption),
        puntajeEcologico: getPropSum(
            prevData?.puntajeEcologico,
            puntajeEcologico,
            consumption
        ),
        precio: getPropSum(prevData?.precio, precio, consumption),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos, consumption),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles, consumption),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas, consumption),
        taninos: getPropSum(prevData?.taninos, taninos, consumption),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas, consumption),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol, consumption),
        isotiocianatos: getPropSum(prevData?.isotiocinatos, isotiocinatos, consumption),
        carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos, consumption),
        licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
        luteina: getPropSum(prevData?.luteina, luteina, consumption),
        alicina: getPropSum(prevData?.alicina, alicina, consumption),
        cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
        ufc: getPropSum(prevData?.UFC, UFC, consumption),
        benzoatoDeSodio: getPropSum(prevData?.benzoatoDeSodio, benzoatoDeSodio, consumption),
        polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
        azulBrillanteFCFoE133: getPropSum(
            prevData?.azulBrillanteFCFoE133,
            azulBrillanteFCFoE133,
            consumption
        ),
        azurrubinaOE102: getPropSum(prevData?.azurrubinaOE102, azurrubinaOE102, consumption),
        amarilloOcasoFDFoE110: getPropSum(
            prevData?.amarilloOcasoFDFoE110,
            amarilloOcasoFDFoE110,
            consumption
        ),
        tartrazinaOE102: getPropSum(prevData?.tartrazinaOE102, tartrazinaOE102, consumption),
        verdeSoE142: getPropSum(prevData?.verdeSoE142, verdeSoE142, consumption),
        negroBrillanteBNoE151: getPropSum(
            prevData?.negroBrillanteBNoE151,
            negroBrillanteBNoE151,
            consumption
        ),
        sucralosa: getPropSum(prevData?.sucralosa, sucralosa, consumption),
        estevia: getPropSum(prevData?.estevia, estevia, consumption),
        sacarina: getPropSum(prevData?.sacarina, sacarina, consumption),
        aspartame: getPropSum(prevData?.aspartame, aspartame, consumption),
        acesulfameK: getPropSum(prevData?.acesulfameK, acesulfameK, consumption),
        carboxymethylcellulose: getPropSum(
            prevData?.carboxymethylcellulose,
            carboxymethylcellulose,
            consumption
        ),
        dioxidoDeTitanio: getPropSum(
            prevData?.dioxidoDeTitanio,
            dioxidoDeTitanio,
            consumption
        ),
        monolauratoDeGlicerol: getPropSum(
            prevData?.monolauratoDeGlicerol,
            monolauratoDeGlicerol,
            consumption
        ),
    };

    return result;
};

export const normalizeSumByAppropriateDTO = (prevData, newData) => {
    if (isEmptyObject(newData)) return {};

    const {
        id,
        sku,
        nombreAlimento,
        grupoExportable,
        subGrupoExportable,
        grupoAlimento,
        clasificacionExportable,
        subGrupoAdecuada,
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

    const result = {
        grupoAlimento: subGrupoAdecuada,
        energiaKcal: getPropSum(prevData?.energiaKcal, energia, consumption),
        proteina: getPropSum(prevData?.proteina, proteina, consumption),
        lipidos: getPropSum(prevData?.lipidos, lipidos, consumption),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados, consumption),
        agMonoinsaturados: getPropSum(
            prevData?.agMonoinsaturados,
            agMonoinsaturados,
            consumption
        ),
        agPoliinsaturados: getPropSum(
            prevData?.adPoliinsaturados,
            adPoliinsaturados,
            consumption
        ),
        colesterol: getPropSum(prevData?.colesterol, colesterol, consumption),
        omega3: getPropSum(prevData?.omega3, omega3, consumption),
        omega6: getPropSum(prevData?.omega6, omega6, consumption),
        omega9: getPropSum(prevData?.omega9, omega9, consumption),
        hidratosDeCarbono: getPropSum(
            prevData?.hidratosDeCarbono,
            hidratosDeCarbono,
            consumption
        ),
        fibra: getPropSum(prevData?.fibra, fibra, consumption),
        fibraSoluble: getPropSum(prevData?.fibraSoluble, fibraSoluble, consumption),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble, consumption),
        azucar: getPropSum(prevData?.azucar, azucar, consumption),
        etanol: getPropSum(prevData?.etanol, etanol, consumption),
        tiamina: getPropSum(prevData?.tiamina, tiamina, consumption),
        riboflavina: getPropSum(prevData?.riboflavin, riboflavin, consumption),
        niacina: getPropSum(prevData?.niacina, niacina, consumption),
        acidoPantotenico: getPropSum(
            prevData?.acidoPantotenico,
            acidoPantotenico,
            consumption
        ),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina, consumption),
        biotina: getPropSum(prevData?.biotina, biotina, consumption),
        cobalamina: getPropSum(prevData?.cobalmina, cobalmina, consumption),
        acidoAscorbico: getPropSum(prevData?.acidoAscorbico, acidoAscorbico, consumption),
        acidoFolico: getPropSum(prevData?.acidoFolico, acidoFolico, consumption),
        vitaminaA: getPropSum(prevData?.vitaminaA, vitaminaA, consumption),
        vitaminaD: getPropSum(prevData?.vitaminaD, vitaminaD, consumption),
        vitaminaK: getPropSum(prevData?.vitaminaK, vitaminaK, consumption),
        vitaminaE: getPropSum(prevData?.vitaminaE, vitaminaE, consumption),
        calcio: getPropSum(prevData?.calcio, calcio, consumption),
        fosforo: getPropSum(prevData?.fosforo, fosforo, consumption),
        hierro: getPropSum(prevData?.hierro, hierro, consumption),
        hierroNoHem: getPropSum(prevData?.hierroNoHem, hierroNoHem, consumption),
        hierroTotal: getPropSum(prevData?.hierroTotal, hierroTotal, consumption),
        magnesio: getPropSum(prevData?.magnesio, magnesio, consumption),
        sodio: getPropSum(prevData?.sodio, sodio, consumption),
        potasio: getPropSum(prevData?.potasio, potasio, consumption),
        zinc: getPropSum(prevData?.zinc, zinc, consumption),
        selenio: getPropSum(prevData?.selenio, selenio, consumption),
        indiceGlicemico: getPropSum(prevData?.indiceGlicemico, indiceGlicemico, consumption),
        cargaGlicemica: getPropSum(prevData?.cargaGlicemica, cargaGlicemica, consumption),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getPropSum(
            prevData?.huellaHidricaTotal,
            huellaHidricaTotal,
            consumption
        ),
        huellaHidricaVerde: getPropSum(
            prevData?.huellaHidricaVerde,
            huellaHidricaVerde,
            consumption
        ),
        huellaHidricaAzul: getPropSum(
            prevData?.huellaHidricaAzul,
            huellaHidricaAzul,
            consumption
        ),
        huellaHidricaGris: getPropSum(
            prevData?.huellaHidricaGris,
            huellaHidricaGris,
            consumption
        ),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue, consumption),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue, consumption),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaCarbono, huellaCarbono, consumption),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica, consumption),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
        fosforoAmbiental: getPropSum(prevData?.rest?.fosforo, rest.fosforo, consumption),
        puntajeEcologico: getPropSum(
            prevData?.puntajeEcologico,
            puntajeEcologico,
            consumption
        ),
        precio: getPropSum(prevData?.precio, precio, consumption),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos, consumption),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles, consumption),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas, consumption),
        taninos: getPropSum(prevData?.taninos, taninos, consumption),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas, consumption),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol, consumption),
        isotiocianatos: getPropSum(prevData?.isotiocinatos, isotiocinatos, consumption),
        carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos, consumption),
        licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
        luteina: getPropSum(prevData?.luteina, luteina, consumption),
        alicina: getPropSum(prevData?.alicina, alicina, consumption),
        cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
        ufc: getPropSum(prevData?.UFC, UFC, consumption),
        benzoatoDeSodio: getPropSum(prevData?.benzoatoDeSodio, benzoatoDeSodio, consumption),
        polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
        azulBrillanteFCFoE133: getPropSum(
            prevData?.azulBrillanteFCFoE133,
            azulBrillanteFCFoE133,
            consumption
        ),
        azurrubinaOE102: getPropSum(prevData?.azurrubinaOE102, azurrubinaOE102, consumption),
        amarilloOcasoFDFoE110: getPropSum(
            prevData?.amarilloOcasoFDFoE110,
            amarilloOcasoFDFoE110,
            consumption
        ),
        tartrazinaOE102: getPropSum(prevData?.tartrazinaOE102, tartrazinaOE102, consumption),
        verdeSoE142: getPropSum(prevData?.verdeSoE142, verdeSoE142, consumption),
        negroBrillanteBNoE151: getPropSum(
            prevData?.negroBrillanteBNoE151,
            negroBrillanteBNoE151,
            consumption
        ),
        sucralosa: getPropSum(prevData?.sucralosa, sucralosa, consumption),
        estevia: getPropSum(prevData?.estevia, estevia, consumption),
        sacarina: getPropSum(prevData?.sacarina, sacarina, consumption),
        aspartame: getPropSum(prevData?.aspartame, aspartame, consumption),
        acesulfameK: getPropSum(prevData?.acesulfameK, acesulfameK, consumption),
        carboxymethylcellulose: getPropSum(
            prevData?.carboxymethylcellulose,
            carboxymethylcellulose,
            consumption
        ),
        dioxidoDeTitanio: getPropSum(
            prevData?.dioxidoDeTitanio,
            dioxidoDeTitanio,
            consumption
        ),
        monolauratoDeGlicerol: getPropSum(
            prevData?.monolauratoDeGlicerol,
            monolauratoDeGlicerol,
            consumption
        ),
    };

    return result;
};

export const getPropSum = (firstProp, secondProp, consumption) => {
    const firstValue = Number(firstProp);
    const secondValue = Number(secondProp);

    if (isNaN(firstValue)) return secondValue * consumption;

    if (isNaN(secondValue) && !isNaN(firstValue)) return firstValue * consumption;

    if (isNaN(secondValue)) return 0;

    return firstValue * consumption + secondValue * consumption;
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
    if (isInvalidElem(data)) return [];

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

export const getMethodType = (num) => {
    switch (num) {
        case 1:
            return normalizeSumByGroupDTO;
        case 2:
            return normalizeSumBySubGroupDTO;
        case 3:
            return normalizeSumByUltraProcessedDTO;
        case 4:
            return normalizeSumByAppropriateDTO;
        default:
            return normalizeSumByGroupDTO;
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

            group.values.forEach((food) => {
                finalRow = normalizedMethod(finalRow, food);
            });
            objToPush = { ...objToPush, ...finalRow };

            rows.push(objToPush);
        });
    });

    return rows;
};

export const generateFinalCsvRows = (data) => {
    const rows = [];
    const uniqueIds = new Set([...data.map((elem) => elem.idRegistro)]);

    uniqueIds.forEach((id) => {
        const filteredRows = data.filter((elem) => elem.idRegistro === id);

        rows.push(filteredRows);
    });

    const tempRows = [];

    rows.forEach((row) => {
        row.forEach(({ idParticipante, idRegistro, fechaRegistro, ...rest }, index) => {
            const newRest = {};

            Object.keys(rest).forEach((key) => {
                newRest[key] = rest[key];
                newRest[`${key}${index}`] = rest[key];

                delete rest[key];
            });

            tempRows.push({
                idParticipante,
                idRegistro,
                fechaRegistro,
                ...newRest,
            });
        });
    });

    const finalRows = [];
    console.log({ tempRows });

    let id = '';

    tempRows.forEach((row) => {
        const { idRegistro } = row;

        if (id !== idRegistro) {
            id = idRegistro;
            return;
        }
    });
};

export const getMaxGroupByReg = (arreglo, callback) => {
    let variable = 0;
    let contador = 0;
    let cuenta = 0;
    arreglo.map((p) => {
        cuenta = 0;

        arreglo.map((x) => {
            if (p.idRegistro === x.idRegistro) {
                cuenta++;
            }
        });
        if (cuenta > contador) {
            contador = cuenta;
            variable = p;
        }
    });
    callback(contador);
};
