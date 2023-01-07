import { isEmptyObject } from '@/utils';

import { KG } from '../../constants';
import { getPropSum } from './shared';

const normalizeSumBySubGroupSmae = (prevData, newData) => {
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

export default normalizeSumBySubGroupSmae;
