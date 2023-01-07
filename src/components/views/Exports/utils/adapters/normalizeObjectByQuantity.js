import { isEmptyObject } from '@/utils';

import { KG } from '../../constants';
import { getMultiplyData } from './shared';

const normalizeObjectsByQuantity = (data) => {
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

export default normalizeObjectsByQuantity;
