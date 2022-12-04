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
import keys from '../data/excelKeys';
import { KG } from '../constants';
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

    const grams = consumption * Number(cantidadAlimento.pesoNeto);

    const result = {
        grupoAlimento: grupoExportable,
        gramos: grams,
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
        cantidad: consumption,
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

    const grams = consumption * Number(cantidadAlimento.pesoNeto);

    const result = {
        grupoAlimento: subGrupoExportable,
        gramos: grams,
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
        cantidad: consumption,
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

    const grams = consumption * Number(cantidadAlimento.pesoNeto);

    const result = {
        grupoAlimento: clasificacionExportable,
        gramos: grams,
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
        cantidad: consumption,
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

    const grams = consumption * Number(cantidadAlimento.pesoNeto);

    const result = {
        grupoAlimento: subGrupoAdecuada,
        gramos: grams,
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
        cantidad: consumption,
    };

    return result;
};

export const normalizeSumBySubGroupSmaeDTO = (prevData, newData) => {
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

    const grams = consumption * Number(cantidadAlimento.pesoNeto);

    const result = {
        grupoAlimento: grupoAlimento,
        gramos: grams,
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
        cantidad: consumption,
    };

    return result;
};

export const getPropSum = (firstProp, secondProp, consumption) => {
    const firstValue = Number(firstProp);
    const secondValue = Number(secondProp);

    if (isNaN(firstValue)) return secondValue * Number(consumption);

    if (isNaN(secondValue) && !isNaN(firstValue)) return firstValue * Number(consumption);

    if (isNaN(secondValue)) return 0;

    return firstValue * Number(consumption) + secondValue * Number(consumption);
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
            return normalizeSumByGroupDTO;
        case 2:
            return normalizeSumBySubGroupDTO;
        case 3:
            return normalizeSumByUltraProcessedDTO;
        case 4:
            return normalizeSumByAppropriateDTO;
        case 5:
            return normalizeSumBySubGroupSmaeDTO;
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

export const generateFinalCsvRows = (data, type, users) => {
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
        row.forEach((register) => {
            const { idParticipante, idRegistro, fechaRegistro } = register;
            const newRegister = normalizePropsOrder(register);

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

        const zeroArray = groups[type].map((group) => getZeroData(group));

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
    console.log({ finalRows, tempRows });
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

export const normalizePropsOrder = (data) => {
    if (isInvalidElem(data)) return '';

    const result = [];

    const {
        grupoAlimento,
        gramos,
        energiaKcal,
        proteina,
        lipidos,
        agSaturados,
        agMonoinsaturados,
        agPoliinsaturados,
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
        tiamina,
        riboflavina,
        niacina,
        acidoPantotenico,
        piridoxina,
        biotina,
        cobalamina,
        acidoAscorbico,
        acidoFolico,
        vitaminaA,
        vitaminaD,
        vitaminaK,
        vitaminaE,
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
        indiceGlicemico,
        cargaGlicemica,
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
        huellaDeCarbono,
        huellaEcologica,
        usoDeSuelo,
        energiaFosil,
        nitrogeno,
        fosforoAmbiental,
        puntajeEcologico,
        precio,
        lugarDeCompra,
        lugarDeVenta,
        fitoquimicos,
        polifenoles,
        antocianinas,
        taninos,
        isoflavonas,
        resveratrol,
        isotiocianatos,
        carotenoides,
        betacarotenos,
        licopeno,
        luteina,
        alicina,
        cafeina,
        ufc,
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
    } = data;

    result.push(grupoAlimento);
    result.push(gramos);
    result.push(energiaKcal);
    result.push(proteina);
    result.push(lipidos);
    result.push(agSaturados);
    result.push(agMonoinsaturados);
    result.push(agPoliinsaturados);
    result.push(colesterol);
    result.push(omega3);
    result.push(omega6);
    result.push(omega9);
    result.push(hidratosDeCarbono);
    result.push(fibra);
    result.push(fibraInsoluble);
    result.push(fibraSoluble);
    result.push(azucar);
    result.push(etanol);
    result.push(tiamina);
    result.push(riboflavina);
    result.push(niacina);
    result.push(acidoPantotenico);
    result.push(piridoxina);
    result.push(biotina);
    result.push(cobalamina);
    result.push(acidoAscorbico);
    result.push(acidoFolico);
    result.push(vitaminaA);
    result.push(vitaminaD);
    result.push(vitaminaK);
    result.push(vitaminaE);
    result.push(calcio);
    result.push(fosforo);
    result.push(hierro);
    result.push(hierroNoHem);
    result.push(hierroTotal);
    result.push(magnesio);
    result.push(sodio);
    result.push(potasio);
    result.push(zinc);
    result.push(selenio);
    result.push(indiceGlicemico);
    result.push(cargaGlicemica);
    result.push(factorDeCorreccionParaHuellaHidricaYEGEI);
    result.push(tipo);
    result.push(lugar);
    result.push(huellaHidricaTotal);
    result.push(huellaHidricaVerde);
    result.push(huellaHidricaAzul);
    result.push(huellaHidricaGris);
    result.push(aguaParaLavado);
    result.push(aguaParaCoccion);
    result.push(lugarEGEI);
    result.push(citaEGEI);
    result.push(huellaDeCarbono);
    result.push(huellaEcologica);
    result.push(usoDeSuelo);
    result.push(energiaFosil);
    result.push(nitrogeno);
    result.push(fosforoAmbiental);
    result.push(puntajeEcologico);
    result.push(precio);
    result.push(lugarDeCompra);
    result.push(lugarDeVenta);
    result.push(fitoquimicos);
    result.push(polifenoles);
    result.push(antocianinas);
    result.push(taninos);
    result.push(isoflavonas);
    result.push(resveratrol);
    result.push(isotiocianatos);
    result.push(carotenoides);
    result.push(betacarotenos);
    result.push(licopeno);
    result.push(luteina);
    result.push(alicina);
    result.push(cafeina);
    result.push(ufc);
    result.push(benzoatoDeSodio);
    result.push(polisorbato);
    result.push(azulBrillanteFCFoE133);
    result.push(azurrubinaOE102);
    result.push(amarilloOcasoFDFoE110);
    result.push(tartrazinaOE102);
    result.push(verdeSoE142);
    result.push(negroBrillanteBNoE151);
    result.push(sucralosa);
    result.push(estevia);
    result.push(sacarina);
    result.push(aspartame);
    result.push(acesulfameK);
    result.push(carboxymethylcellulose);
    result.push(dioxidoDeTitanio);
    result.push(monolauratoDeGlicerol);

    return result;
};

export const normalizePropsByDayOrder = (data) => {
    if (isInvalidElem(data)) return '';

    const result = [];

    const {
        acesulfameK,
        acidoAscorbico,
        acidoFolico,
        acidoPantotenico,
        agMonoinsaturados,
        agPoliinsaturados,
        agSaturados,
        aguaParaCoccion,
        aguaParaLavado,
        alicina,
        amarilloOcasoFDFoE110,
        antocianinas,
        aspartame,
        azucar,
        azulBrillanteFCFoE133,
        azurrubinaOE102,
        benzoatoDeSodio,
        betacarotenos,
        biotina,
        cafeina,
        calcio,
        carboxymethylcellulose,
        cargaGlicemica,
        carotenoides,
        citaEGEI,
        cobalamina,
        colesterol,
        dioxidoDeTitanio,
        energiaFosil,
        energiaKcal,
        estevia,
        etanol,
        factorDeCorreccionParaHuellaHidricaYEGEI,
        fibra,
        fibraInsoluble,
        fibraSoluble,
        fitoquimicos,
        fosforo,
        fosforoAmbiental,
        hidratosDeCarbono,
        hierro,
        hierroNoHem,
        hierroTotal,
        huellaDeCarbono,
        huellaEcologica,
        huellaHidricaAzul,
        huellaHidricaGris,
        huellaHidricaTotal,
        huellaHidricaVerde,
        indiceGlicemico,
        isoflavonas,
        isotiocianatos,
        licopeno,
        lipidos,
        lugar,
        lugarDeCompra,
        lugarDeVenta,
        lugarEGEI,
        luteina,
        magnesio,
        monolauratoDeGlicerol,
        negroBrillanteBNoE151,
        niacina,
        nitrogeno,
        omega3,
        omega6,
        omega9,
        piridoxina,
        polifenoles,
        polisorbato,
        potasio,
        precio,
        proteina,
        puntajeEcologico,
        resveratrol,
        riboflavina,
        sacarina,
        selenio,
        sodio,
        sucralosa,
        taninos,
        tartrazinaOE102,
        tiamina,
        tipo,
        ufc,
        usoDeSuelo,
        verdeSoE142,
        vitaminaA,
        vitaminaD,
        vitaminaE,
        vitaminaK,
        zinc,
    } = data;

    result.push(energiaKcal);
    result.push(proteina);
    result.push(lipidos);
    result.push(agSaturados);
    result.push(agMonoinsaturados);
    result.push(agPoliinsaturados);
    result.push(colesterol);
    result.push(omega3);
    result.push(omega6);
    result.push(omega9);
    result.push(hidratosDeCarbono);
    result.push(fibra);
    result.push(fibraSoluble);
    result.push(fibraInsoluble);
    result.push(azucar);
    result.push(etanol);
    result.push(tiamina);
    result.push(riboflavina);
    result.push(niacina);
    result.push(acidoPantotenico);
    result.push(piridoxina);
    result.push(biotina);
    result.push(cobalamina);
    result.push(acidoAscorbico);
    result.push(acidoFolico);
    result.push(vitaminaA);
    result.push(vitaminaD);
    result.push(vitaminaK);
    result.push(vitaminaE);
    result.push(calcio);
    result.push(fosforo);
    result.push(hierro);
    result.push(hierroNoHem);
    result.push(hierroTotal);
    result.push(magnesio);
    result.push(sodio);
    result.push(potasio);
    result.push(zinc);
    result.push(selenio);
    result.push(indiceGlicemico);
    result.push(cargaGlicemica);
    result.push(factorDeCorreccionParaHuellaHidricaYEGEI);
    result.push(tipo);
    result.push(lugar);
    result.push(huellaHidricaTotal);
    result.push(huellaHidricaVerde);
    result.push(huellaHidricaAzul);
    result.push(huellaHidricaGris);
    result.push(aguaParaLavado);
    result.push(aguaParaCoccion);
    result.push(lugarEGEI);
    result.push(citaEGEI);
    result.push(huellaDeCarbono);
    result.push(huellaEcologica);
    result.push(usoDeSuelo);
    result.push(energiaFosil);
    result.push(nitrogeno);
    result.push(fosforoAmbiental);
    result.push(puntajeEcologico);
    result.push(precio);
    result.push(lugarDeCompra);
    result.push(lugarDeVenta);
    result.push(fitoquimicos);
    result.push(polifenoles);
    result.push(antocianinas);
    result.push(taninos);
    result.push(isoflavonas);
    result.push(resveratrol);
    result.push(isotiocianatos);
    result.push(carotenoides);
    result.push(betacarotenos);
    result.push(licopeno);
    result.push(luteina);
    result.push(alicina);
    result.push(cafeina);
    result.push(ufc);
    result.push(benzoatoDeSodio);
    result.push(polisorbato);
    result.push(azulBrillanteFCFoE133);
    result.push(azurrubinaOE102);
    result.push(amarilloOcasoFDFoE110);
    result.push(tartrazinaOE102);
    result.push(verdeSoE142);
    result.push(negroBrillanteBNoE151);
    result.push(sucralosa);
    result.push(estevia);
    result.push(sacarina);
    result.push(aspartame);
    result.push(acesulfameK);
    result.push(carboxymethylcellulose);
    result.push(dioxidoDeTitanio);
    result.push(monolauratoDeGlicerol);

    return result;
};

export const getZeroData = (name) => {
    const result = [];

    result.push(name);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push('');
    result.push('');
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push('');
    result.push('');
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);
    result.push(0);

    return result;
};

export const getMultiplyData = (value, quantity) => {
    return Number(value * quantity);
};

export const normalizeObjectsByQuantity = (data) => {
    if (isEmptyObject(data)) return {};

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
    } = data;

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
        energiaKcal: getMultiplyData(energia, consumption),
        proteina: getMultiplyData(proteina, consumption),
        lipidos: getMultiplyData(lipidos, consumption),
        agSaturados: getMultiplyData(agSaturados, consumption),
        agMonoinsaturados: getMultiplyData(agMonoinsaturados, consumption),
        agPoliinsaturados: getMultiplyData(adPoliinsaturados, consumption),
        colesterol: getMultiplyData(colesterol, consumption),
        omega3: getMultiplyData(omega3, consumption),
        omega6: getMultiplyData(omega6, consumption),
        omega9: getMultiplyData(omega9, consumption),
        hidratosDeCarbono: getMultiplyData(hidratosDeCarbono, consumption),
        fibra: getMultiplyData(fibra, consumption),
        fibraSoluble: getMultiplyData(fibraSoluble, consumption),
        fibraInsoluble: getMultiplyData(fibraInsoluble, consumption),
        azucar: getMultiplyData(azucar, consumption),
        etanol: getMultiplyData(etanol, consumption),
        tiamina: getMultiplyData(tiamina, consumption),
        riboflavina: getMultiplyData(riboflavin, consumption),
        niacina: getMultiplyData(niacina, consumption),
        acidoPantotenico: getMultiplyData(acidoPantotenico, consumption),
        piridoxina: getMultiplyData(piridoxina, consumption),
        biotina: getMultiplyData(biotina, consumption),
        cobalamina: getMultiplyData(cobalmina, consumption),
        acidoAscorbico: getMultiplyData(acidoAscorbico, consumption),
        acidoFolico: getMultiplyData(acidoFolico, consumption),
        vitaminaA: getMultiplyData(vitaminaA, consumption),
        vitaminaD: getMultiplyData(vitaminaD, consumption),
        vitaminaK: getMultiplyData(vitaminaK, consumption),
        vitaminaE: getMultiplyData(vitaminaE, consumption),
        calcio: getMultiplyData(calcio, consumption),
        fosforo: getMultiplyData(fosforo, consumption),
        hierro: getMultiplyData(hierro, consumption),
        hierroNoHem: getMultiplyData(hierroNoHem, consumption),
        hierroTotal: getMultiplyData(hierroTotal, consumption),
        magnesio: getMultiplyData(magnesio, consumption),
        sodio: getMultiplyData(sodio, consumption),
        potasio: getMultiplyData(potasio, consumption),
        zinc: getMultiplyData(zinc, consumption),
        selenio: getMultiplyData(selenio, consumption),
        indiceGlicemico: getMultiplyData(indiceGlicemico, consumption),
        cargaGlicemica: getMultiplyData(cargaGlicemica, consumption),
        factorDeCorreccionParaHuellaHidricaYEGEI,
        tipo: tipo,
        lugar: lugar,
        huellaHidricaTotal: getMultiplyData(huellaHidricaTotal, consumption),
        huellaHidricaVerde: getMultiplyData(huellaHidricaVerde, consumption),
        huellaHidricaAzul: getMultiplyData(huellaHidricaAzul, consumption),
        huellaHidricaGris: getMultiplyData(huellaHidricaGris, consumption),
        aguaParaLavado: getMultiplyData(washingValue, consumption),
        aguaParaCoccion: getMultiplyData(cookingValue, consumption),
        lugarEGEI: lugarEGEI,
        citaEGEI: citaEGEI,
        huellaDeCarbono: getMultiplyData(huellaCarbono, consumption),
        huellaEcologica: getMultiplyData(huellaEcologica, consumption),
        usoDeSuelo: getMultiplyData(usoDeSuelo, consumption),
        energiaFosil: getMultiplyData(energiaFosil, consumption),
        nitrogeno: getMultiplyData(nitrogeno, consumption),
        fosforoAmbiental: getMultiplyData(rest.fosforo, consumption),
        puntajeEcologico: getMultiplyData(puntajeEcologico, consumption),
        precio: getMultiplyData(precio, consumption),
        lugarDeCompra: lugarDeCompra,
        lugarDeVenta: lugarDeVenta,
        fitoquimicos: getMultiplyData(fitoquimicos, consumption),
        polifenoles: getMultiplyData(polifenoles, consumption),
        antocianinas: getMultiplyData(antocianinas, consumption),
        taninos: getMultiplyData(taninos, consumption),
        isoflavonas: getMultiplyData(isoflavonas, consumption),
        resveratrol: getMultiplyData(resveratrol, consumption),
        isotiocianatos: getMultiplyData(isotiocinatos, consumption),
        carotenoides: getMultiplyData(caretenoides, consumption),
        betacarotenos: getMultiplyData(betacarotenos, consumption),
        licopeno: getMultiplyData(licopeno, consumption),
        luteina: getMultiplyData(luteina, consumption),
        alicina: getMultiplyData(alicina, consumption),
        cafeina: getMultiplyData(cafeina, consumption),
        ufc: getMultiplyData(UFC, consumption),
        benzoatoDeSodio: getMultiplyData(benzoatoDeSodio, consumption),
        polisorbato: getMultiplyData(polisorbato, consumption),
        azulBrillanteFCFoE133: getMultiplyData(azulBrillanteFCFoE133, consumption),
        azurrubinaOE102: getMultiplyData(azurrubinaOE102, consumption),
        amarilloOcasoFDFoE110: getMultiplyData(amarilloOcasoFDFoE110, consumption),
        tartrazinaOE102: getMultiplyData(tartrazinaOE102, consumption),
        verdeSoE142: getMultiplyData(verdeSoE142, consumption),
        negroBrillanteBNoE151: getMultiplyData(negroBrillanteBNoE151, consumption),
        sucralosa: getMultiplyData(sucralosa, consumption),
        estevia: getMultiplyData(estevia, consumption),
        sacarina: getMultiplyData(sacarina, consumption),
        aspartame: getMultiplyData(aspartame, consumption),
        acesulfameK: getMultiplyData(acesulfameK, consumption),
        carboxymethylcellulose: getMultiplyData(carboxymethylcellulose, consumption),
        dioxidoDeTitanio: getMultiplyData(dioxidoDeTitanio, consumption),
        monolauratoDeGlicerol: getMultiplyData(monolauratoDeGlicerol, consumption),
    };

    return result;
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

                values.forEach((alimento) => {
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
        // objRef[key] = String(firstValue + secondValue);
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

export const generateFinalCsvRowsByDay = (data) => {
    const tempFirstsValues = [];
    const tempRows = [];

    const participants = new Set([...data.map((elem) => elem.idParticipante)]);
    const copyParticipants = [...participants];

    data.forEach((row) => {
        const { fechaRegistro, idParticipante, idRegistro } = row;
        const newRegister = normalizePropsByDayOrder(row);

        const idIndex = copyParticipants.findIndex((elem) => elem === idParticipante);

        tempRows.push(newRegister);
        if (idIndex === -1) {
            tempFirstsValues.push({ 0: idParticipante, 1: idRegistro, 2: fechaRegistro });
            return;
        }

        tempFirstsValues.push({ 0: Number(idIndex + 1), 1: idRegistro, 2: fechaRegistro });
    });

    const rowsAsStrings = [];

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
