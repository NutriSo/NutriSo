import { isEmptyArray, isEmptyObject, isInvalidElem } from '../../../../utils';
import {
    caloriasMacronutrientes,
    vitaminas,
    minerales,
    aspectoGlucemico,
    aspectosMedioambientales,
    aspectosEconomicos,
    componentesBioactivos,
    aditivosAlimentarios,
} from '../Groups/data';
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

export const getCharacteristicColumns = () => {
    return {
        ...caloriasMacronutrientes,
        ...vitaminas,
        ...minerales,
        ...aspectoGlucemico,
        ...aspectosMedioambientales,
        ...aspectosEconomicos,
        ...componentesBioactivos,
        ...aditivosAlimentarios,
    };
};

export const normalizeDataByGroupDTO = (food, quantity) => {
    const factor = Number(
        food.aspectoMedioambiental.factorDeCorreccionParaHuellaHidricaYEGEI
    );
    const washing = Number(food.aspectoMedioambiental.aguaParaLavado);
    const cooking = Number(food.aspectoMedioambiental.aguaParaCoccion);
    const consumption = Number(food.cantidadAlimento.pesoNeto * quantity);

    const washingValue = (consumption * washing) / KG;
    const cookingValue = (consumption * cooking) / KG;
    return {
        energiaKcal: Number(food.caloriasMacronutrientes.energia * quantity),
        proteina: Number(food.caloriasMacronutrientes.proteina * quantity),
        lipidos: Number(food.caloriasMacronutrientes.lipidos * quantity),
        agSaturados: Number(food.caloriasMacronutrientes.agSaturados * quantity),
        agMonoinsaturados: Number(food.caloriasMacronutrientes.agMonoinsaturados * quantity),
        agPoliinsaturados: Number(food.caloriasMacronutrientes.adPoliinsaturados * quantity),
        colesterol: Number(food.caloriasMacronutrientes.colesterol * quantity),
        omega3: Number(food.caloriasMacronutrientes.omega3 * quantity),
        omega6: Number(food.caloriasMacronutrientes.omega6 * quantity),
        omega9: Number(food.caloriasMacronutrientes.omega9 * quantity),
        hidratosDeCarbono: Number(food.caloriasMacronutrientes.hidratosDeCarbono * quantity),
        fibra: Number(food.caloriasMacronutrientes.fibra * quantity),
        fibraInsoluble: Number(food.caloriasMacronutrientes.fibraInsoluble * quantity),
        azucar: Number(food.caloriasMacronutrientes.azucar * quantity),
        etanol: Number(food.caloriasMacronutrientes.etanol * quantity),
        tiamina: Number(food.vitaminas.tiamina * quantity),
        riboflavina: Number(food.vitaminas.riboflavin * quantity),
        niacina: Number(food.vitaminas.niacina * quantity),
        acidoPantotenico: Number(food.vitaminas.acidoPantotenico * quantity),
        piridoxina: Number(food.vitaminas.piridoxina * quantity),
        biotina: Number(food.vitaminas.biotina * quantity),
        cobalamina: Number(food.vitaminas.cobalmina * quantity),
        acidoAscorbico: Number(food.vitaminas.acidoAscorbico * quantity),
        acidoFolico: Number(food.vitaminas.acidoFolico * quantity),
        vitaminaA: Number(food.vitaminas.vitaminaA * quantity),
        vitaminaD: Number(food.vitaminas.vitaminaD * quantity),
        vitaminaK: Number(food.vitaminas.vitaminaK * quantity),
        vitaminaE: Number(food.vitaminas.vitaminaE * quantity),
        calcio: Number(food.minerales.calcio * quantity),
        fosforo: Number(food.minerales.fosforo * quantity),
        hierro: Number(food.minerales.hierro * quantity),
        hierroNoHem: Number(food.minerales.hierroNoHem * quantity),
        hierroTotal: Number(food.minerales.hierroTotal * quantity),
        magnesio: Number(food.minerales.magnesio * quantity),
        sodio: Number(food.minerales.sodio * quantity),
        potasio: Number(food.minerales.potasio * quantity),
        zinc: Number(food.minerales.zinc * quantity),
        selenio: Number(food.minerales.selenio * quantity),
        indiceGlicemico: Number(food.aspectoGlucemico.indiceGlicemico * quantity),
        cargaGlicemica: Number(food.aspectoGlucemico.cargaGlicemica * quantity),
        factorDeCorreccionParaHuellaHidricaYEGEI: factor,
        tipo: food.aspectoMedioambiental.tipo,
        lugar: food.aspectoMedioambiental.lugar,
        huellaHidricaTotal: Number(
            Number(food.aspectoMedioambiental.huellaHidricaTotal * quantity) * factor
        ),
        huellaHidricaVerde: Number(
            Number(food.aspectoMedioambiental.huellaHidricaVerde * quantity) * factor
        ),
        huellaHidricaAzul: Number(
            Number(food.aspectoMedioambiental.huellaHidricaAzul * quantity) * factor
        ),
        huellaHidricaGris: Number(
            Number(food.aspectoMedioambiental.huellaHidricaGris * quantity) * factor
        ),
        aguaParaLavado: washingValue, // revisar abajo
        aguaParaCoccion: cookingValue,
        lugarEGEI: food.aspectoMedioambiental.lugarEGEI,
        citaEGEI: food.aspectoMedioambiental.citaEGEI,
        huellaDeCarbono: Number(food.aspectoMedioambiental.huellaCarbono * quantity),
        huellaEcologica: Number(food.aspectoMedioambiental.huellaEcologica * quantity),
        usoDeSuelo: Number(food.aspectoMedioambiental.usoDeSuelo * quantity),
        energiaFosil: Number(food.aspectoMedioambiental.energiaFosil * quantity),
        nitrogeno: Number(food.aspectoMedioambiental.nitrogeno * quantity),
        fosforoAmbiental: Number(food.aspectoMedioambiental.fosforo * quantity),
        puntajeEcologico: Number(food.aspectoMedioambiental.puntajeEcologico * quantity),
        precio: food.aspectoEconomico.precio,
        lugarDeCompra: food.aspectoEconomico.lugarDeCompra,
        lugarDeVenta: food.aspectoEconomico.lugarDeVenta,
        fitoquimicos: Number(food.componentesBioactivos.fitoquimicos * quantity),
        polifenoles: Number(food.componentesBioactivos.polifenoles * quantity),
        antocianinas: Number(food.componentesBioactivos.antocianinas * quantity),
        taninos: Number(food.componentesBioactivos.taninos * quantity),
        isoflavonas: Number(food.componentesBioactivos.isoflavonas * quantity),
        resveratrol: Number(food.componentesBioactivos.resveratrol * quantity),
        isotiocianatos: Number(food.componentesBioactivos.isotiocinatos * quantity),
        carotenoides: Number(food.componentesBioactivos.caretenoides * quantity),
        betacarotenos: Number(food.componentesBioactivos.betacarotenos * quantity),
        licopeno: Number(food.componentesBioactivos.licopeno * quantity),
        luteina: Number(food.componentesBioactivos.luteina * quantity),
        alicina: Number(food.componentesBioactivos.alicina * quantity),
        cafeina: Number(food.componentesBioactivos.cafeina * quantity),
        ufc: Number(food.componentesBioactivos.UFC * quantity),
        benzoatoDeSodio: Number(food.aditivosAlimentarios.benzoatoDeSodio * quantity),
        polisorbato: Number(food.aditivosAlimentarios.polisorbato * quantity),
        azulBrillanteFCFoE133: Number(
            food.aditivosAlimentarios.azulBrillanteFCFoE133 * quantity
        ),
        azurrubinaOE102: Number(food.aditivosAlimentarios.azurrubinaOE102 * quantity),
        amarilloOcasoFDFoE110: Number(
            food.aditivosAlimentarios.amarilloOcasoFDFoE110 * quantity
        ),
        tartrazinaOE102: Number(food.aditivosAlimentarios.tartrazinaOE102 * quantity),
        verdeSoE142: Number(food.aditivosAlimentarios.verdeSoE142 * quantity),
        negroBrillanteBNoE151: Number(
            food.aditivosAlimentarios.negroBrillanteBNoE151 * quantity
        ),
        sucralosa: Number(food.aditivosAlimentarios.sucralosa * quantity),
        estevia: Number(food.aditivosAlimentarios.estevia * quantity),
        sacarina: Number(food.aditivosAlimentarios.sacarina * quantity),
        aspartame: Number(food.aditivosAlimentarios.aspartame * quantity),
        acesulfameK: Number(food.aditivosAlimentarios.acesulfameK * quantity),
        carboxymethylcellulose: Number(
            food.aditivosAlimentarios.carboxymethylcellulose * quantity
        ),
        dioxidoDeTitanio: Number(food.aditivosAlimentarios.dioxidoDeTitanio * quantity),
        monolauratoDeGlicerol: Number(
            food.aditivosAlimentarios.monolauratoDeGlicerol * quantity
        ),
        consumption,
    };
};

export const normalizeSumByGroupDTO = (prevData, newData) => {
    if (isEmptyObject(newData)) return {};

    const {
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
        consumption,
    } = newData;

    const washingValue = (consumption * aguaParaLavado) / KG;
    const cookingValue = (consumption * aguaParaCoccion) / KG;

    return {
        energiaKcal: getPropSum(prevData?.energiaKcal, energiaKcal),
        proteina: getPropSum(prevData?.proteina, proteina),
        lipidos: getPropSum(prevData?.lipidos, lipidos),
        agSaturados: getPropSum(prevData?.agSaturados, agSaturados),
        agMonoinsaturados: getPropSum(prevData?.agMonoinsaturados, agMonoinsaturados),
        agPoliinsaturados: getPropSum(prevData?.agPoliinsaturados, agPoliinsaturados),
        colesterol: getPropSum(prevData?.colesterol, colesterol),
        omega3: getPropSum(prevData?.omega3, omega3),
        omega6: getPropSum(prevData?.omega6, omega6),
        omega9: getPropSum(prevData?.omega9, omega9),
        hidratosDeCarbono: getPropSum(prevData?.hidratosDeCarbono, hidratosDeCarbono),
        fibra: getPropSum(prevData?.fibra, fibra),
        fibraInsoluble: getPropSum(prevData?.fibraInsoluble, fibraInsoluble),
        azucar: getPropSum(prevData?.azucar, azucar),
        etanol: getPropSum(prevData?.etanol, etanol),
        tiamina: getPropSum(prevData?.tiamina, tiamina),
        riboflavina: getPropSum(prevData?.riboflavina, riboflavina),
        niacina: getPropSum(prevData?.niacina, niacina),
        acidoPantotenico: getPropSum(prevData?.acidoPantotenico, acidoPantotenico),
        piridoxina: getPropSum(prevData?.piridoxina, piridoxina),
        biotina: getPropSum(prevData?.biotina, biotina),
        cobalamina: getPropSum(prevData?.cobalamina, cobalamina),
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
        tipo: newData?.tipo,
        lugar: newData?.lugar,
        huellaHidricaTotal: getPropSum(prevData?.huellaHidricaTotal, huellaHidricaTotal),
        huellaHidricaVerde: getPropSum(prevData?.huellaHidricaVerde, huellaHidricaVerde),
        huellaHidricaAzul: getPropSum(prevData?.huellaHidricaAzul, huellaHidricaAzul),
        huellaHidricaGris: getPropSum(prevData?.huellaHidricaGris, huellaHidricaGris),
        aguaParaLavado: getPropSum(prevData?.aguaParaLavado, washingValue),
        aguaParaCoccion: getPropSum(prevData?.aguaParaCoccion, cookingValue),
        lugarEGEI: newData?.lugarEGEI,
        citaEGEI: newData?.lugarEGEI,
        huellaDeCarbono: getPropSum(prevData?.huellaDeCarbono, huellaDeCarbono),
        huellaEcologica: getPropSum(prevData?.huellaEcologica, huellaEcologica),
        usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo),
        energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil),
        nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno),
        fosforoAmbiental: getPropSum(prevData?.fosforoAmbiental, fosforoAmbiental),
        puntajeEcologico: getPropSum(prevData?.puntajeEcologico, puntajeEcologico),
        precio: getPropSum(prevData?.precio, precio),
        lugarDeCompra: newData?.lugarDeCompra,
        lugarDeVenta: newData?.lugarDeVenta,
        fitoquimicos: getPropSum(prevData?.fitoquimicos, fitoquimicos),
        polifenoles: getPropSum(prevData?.polifenoles, polifenoles),
        antocianinas: getPropSum(prevData?.antocianinas, antocianinas),
        taninos: getPropSum(prevData?.taninos, taninos),
        isoflavonas: getPropSum(prevData?.isoflavonas, isoflavonas),
        resveratrol: getPropSum(prevData?.resveratrol, resveratrol),
        isotiocianatos: getPropSum(prevData?.isotiocianatos, isotiocianatos),
        carotenoides: getPropSum(prevData?.carotenoides, carotenoides),
        betacarotenos: getPropSum(prevData?.betacarotenos, betacarotenos),
        licopeno: getPropSum(prevData?.licopeno, licopeno),
        luteina: getPropSum(prevData?.luteina, luteina),
        alicina: getPropSum(prevData?.alicina, alicina),
        cafeina: getPropSum(prevData?.cafeina, cafeina),
        ufc: getPropSum(prevData?.ufc, ufc),
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

export const getDetailsByGroups = (data) => {
    const result = [];
    data.forEach((row) => {
        const { idParticipante, idRegistro, fechaRegistro, ...rest } = row;

        const { values } = rest;

        const newRow = {
            idParticipante,
            idRegistro,
            fechaRegistro,
        };

        const dataToMap = unifyArrays(values);

        dataToMap.forEach((group, index) => {
            const { grupo, values: alimentos } = group;

            newRow[`grupoExcel_${index}`] = grupo;

            alimentos.forEach((food) => {
                const { cantidad } = food;

                const {
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
                } = normalizeDataByGroupDTO(food, Number(cantidad));

                newRow[`energiaKcal_${index}`] = energiaKcal;
                newRow[`proteina_${index}`] = proteina;
                newRow[`lipidos_${index}`] = lipidos;
                newRow[`agSaturados_${index}`] = agSaturados;
                newRow[`agMonoinsaturados_${index}`] = agMonoinsaturados;
                newRow[`agPoliinsaturados_${index}`] = agPoliinsaturados;
                newRow[`colesterol_${index}`] = colesterol;
                newRow[`omega3_${index}`] = omega3;
                newRow[`omega6_${index}`] = omega6;
                newRow[`omega9_${index}`] = omega9;
                newRow[`hidratosDeCarbono_${index}`] = hidratosDeCarbono;
                newRow[`fibra_${index}`] = fibra;
                newRow[`fibraInsoluble_${index}`] = fibraInsoluble;
                newRow[`azucar_${index}`] = azucar;
                newRow[`etanol_${index}`] = etanol;
                newRow[`tiamina_${index}`] = tiamina;
                newRow[`riboflavina_${index}`] = riboflavina;
                newRow[`niacina_${index}`] = niacina;
                newRow[`acidoPantotenico_${index}`] = acidoPantotenico;
                newRow[`piridoxina_${index}`] = piridoxina;
                newRow[`biotina_${index}`] = biotina;
                newRow[`cobalamina_${index}`] = cobalamina;
                newRow[`acidoAscorbico_${index}`] = acidoAscorbico;
                newRow[`acidoFolico_${index}`] = acidoFolico;
                newRow[`vitaminaA_${index}`] = vitaminaA;
                newRow[`vitaminaD_${index}`] = vitaminaD;
                newRow[`vitaminaK_${index}`] = vitaminaK;
                newRow[`vitaminaE_${index}`] = vitaminaE;
                newRow[`calcio_${index}`] = calcio;
                newRow[`fosforo_${index}`] = fosforo;
                newRow[`hierro_${index}`] = hierro;
                newRow[`hierroNoHem_${index}`] = hierroNoHem;
                newRow[`hierroTotal_${index}`] = hierroTotal;
                newRow[`magnesio_${index}`] = magnesio;
                newRow[`sodio_${index}`] = sodio;
                newRow[`potasio_${index}`] = potasio;
                newRow[`zinc_${index}`] = zinc;
                newRow[`selenio_${index}`] = selenio;
                newRow[`indiceGlicemico_${index}`] = indiceGlicemico;
                newRow[`cargaGlicemica_${index}`] = cargaGlicemica;
                newRow[`factorDeCorreccionParaHuellaHidricaYEGEI_${index}`] =
                    factorDeCorreccionParaHuellaHidricaYEGEI;
                newRow[`tipo_${index}`] = tipo;
                newRow[`lugar_${index}`] = lugar;
                newRow[`huellaHidricaTotal_${index}`] = huellaHidricaTotal;
                newRow[`huellaHidricaVerde_${index}`] = huellaHidricaVerde;
                newRow[`huellaHidricaAzul_${index}`] = huellaHidricaAzul;
                newRow[`huellaHidricaGris_${index}`] = huellaHidricaGris;
                newRow[`aguaParaLavado_${index}`] = aguaParaLavado;
                newRow[`aguaParaCoccion_${index}`] = aguaParaCoccion;
                newRow[`lugarEGEI_${index}`] = lugarEGEI;
                newRow[`citaEGEI_${index}`] = citaEGEI;
                newRow[`huellaDeCarbono_${index}`] = huellaDeCarbono;
                newRow[`huellaEcologica_${index}`] = huellaEcologica;
                newRow[`usoDeSuelo_${index}`] = usoDeSuelo;
                newRow[`energiaFosil_${index}`] = energiaFosil;
                newRow[`nitrogeno_${index}`] = nitrogeno;
                newRow[`fosforoAmbiental_${index}`] = fosforoAmbiental;
                newRow[`puntajeEcologico_${index}`] = puntajeEcologico;
                newRow[`precio_${index}`] = precio;
                newRow[`lugarDeCompra_${index}`] = lugarDeCompra;
                newRow[`lugarDeVenta_${index}`] = lugarDeVenta;
                newRow[`fitoquimicos_${index}`] = fitoquimicos;
                newRow[`polifenoles_${index}`] = polifenoles;
                newRow[`antocianinas_${index}`] = antocianinas;
                newRow[`taninos_${index}`] = taninos;
                newRow[`isoflavonas_${index}`] = isoflavonas;
                newRow[`sucralosa_${index}`] = sucralosa;
                newRow[`resveratrol_${index}`] = resveratrol;
                newRow[`isotiocianatos_${index}`] = isotiocianatos;
                newRow[`carotenoides_${index}`] = carotenoides;
                newRow[`betacarotenos_${index}`] = betacarotenos;
                newRow[`licopeno_${index}`] = licopeno;
                newRow[`luteina_${index}`] = luteina;
                newRow[`alicina_${index}`] = alicina;
                newRow[`cafeina_${index}`] = cafeina;
                newRow[`ufc_${index}`] = ufc;
                newRow[`benzoatoDeSodio_${index}`] = benzoatoDeSodio;
                newRow[`polisorbato_${index}`] = polisorbato;
                newRow[`azulBrillanteFCFoE133_${index}`] = azulBrillanteFCFoE133;
                newRow[`azurrubinaOE102_${index}`] = azurrubinaOE102;
                newRow[`amarilloOcasoFDFoE110_${index}`] = amarilloOcasoFDFoE110;
                newRow[`tartrazinaOE102_${index}`] = tartrazinaOE102;
                newRow[`verdeSoE142_${index}`] = verdeSoE142;
                newRow[`negroBrillanteBNoE151_${index}`] = negroBrillanteBNoE151;
                newRow[`estevia_${index}`] = estevia;
                newRow[`sacarina_${index}`] = sacarina;
                newRow[`aspartame_${index}`] = aspartame;
                newRow[`acesulfameK_${index}`] = acesulfameK;
                newRow[`carboxymethylcellulose_${index}`] = carboxymethylcellulose;
                newRow[`dioxidoDeTitanio_${index}`] = dioxidoDeTitanio;
                newRow[`monolauratoDeGlicerol_${index}`] = monolauratoDeGlicerol;

                result.push(newRow);
            });
        });
    });

    return result;
};

export const generateCsvRows = (data) => {
    const foodsByGroup = [];

    data.forEach((row) => {
        const { idParticipante, idRegistro, fechaRegistro, ...rest } = row;

        const grupoExcelValues = Object.keys(rest).filter((value) => {
            const text = 'grupoExcel_';

            if (value.includes(text)) {
                const number = Number(value.split(text)[1]);
                return number;
            }
        });

        foodsByGroup.push(grupoExcelValues);

        if (grupoExcelValues.length > 0) {
            return;
        }
    });

    const result = [];
    const foodDetails = [];

    data.forEach((elem, index) => {
        const aux = foodsByGroup[index];
        const size = aux.length;

        const { idParticipante, idRegistro, fechaRegistro, ...rest } = elem;

        // const groups = new Array(size).fill([]);

        // for (let i = 0; i < size; i++) {
        //     Object.entries(rest).forEach(([key, value]) => {
        //         const splitted = Number(key.split('_')[1]);
        //         if (splitted === i) {
        //             groups[i].push({ [key]: value });
        //         } else return;
        //     });
        // }
        // console.log('después', { groups, index });
    });
};

// Por cada registro crear una fila.
// Por cada fila, agregar las columnas necesarias dependiendo de la cantidad
// de alimentos que tenga en el array.

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
        console.log({ values });
        values.forEach((food) => {
            console.log({ food });
        });
    });
};
