import {
  isEmptyArray,
  isEmptyObject,
  isInvalidElem,
  isNumberType,
  getIsAScript,
  getIsArray,
  getIsAString,
  getIsANumber,
} from "@/utils";
import groups from "../data/excelGroups";
import keys from "../data/excelKeys";
import { KG } from "../constants";
import * as calories from "../data/calories";
import * as vitamins from "../data/vitamins";
import * as minerals from "../data/minerals";
import * as glycemic from "../data/glycemic";
import * as environmental from "../data/environmental";
import * as economic from "../data/economic";
import * as bioactives from "../data/bioactives";
import * as additives from "../data/additives";
import * as extraColumns2 from "../data/extraColumns";
import * as food from "../data/foodGroups";

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
  if (isInvalidElem(state) || isInvalidElem(group) || isInvalidElem(food))
    return [];

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
    fibraInsoluble: getPropSum(
      prevData?.fibraInsoluble,
      fibraInsoluble,
      consumption
    ),
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
    acidoAscorbico: getPropSum(
      prevData?.acidoAscorbico,
      acidoAscorbico,
      consumption
    ),
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
    indiceGlicemico: getPropSum(
      prevData?.indiceGlicemico,
      indiceGlicemico,
      consumption
    ),
    cargaGlicemica: getPropSum(
      prevData?.cargaGlicemica,
      cargaGlicemica,
      consumption
    ),
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
    aguaParaLavado: getPropSum(
      prevData?.aguaParaLavado,
      washingValue,
      consumption
    ),
    aguaParaCoccion: getPropSum(
      prevData?.aguaParaCoccion,
      cookingValue,
      consumption
    ),
    lugarEGEI: lugarEGEI,
    citaEGEI: citaEGEI,
    huellaDeCarbono: getPropSum(
      prevData?.huellaCarbono,
      huellaCarbono,
      consumption
    ),
    huellaEcologica: getPropSum(
      prevData?.huellaEcologica,
      huellaEcologica,
      consumption
    ),
    usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
    energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
    nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
    fosforoAmbiental: getPropSum(
      prevData?.rest?.fosforo,
      rest.fosforo,
      consumption
    ),
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
    isotiocianatos: getPropSum(
      prevData?.isotiocinatos,
      isotiocinatos,
      consumption
    ),
    carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
    betacarotenos: getPropSum(
      prevData?.betacarotenos,
      betacarotenos,
      consumption
    ),
    licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
    luteina: getPropSum(prevData?.luteina, luteina, consumption),
    alicina: getPropSum(prevData?.alicina, alicina, consumption),
    cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
    ufc: getPropSum(prevData?.UFC, UFC, consumption),
    benzoatoDeSodio: getPropSum(
      prevData?.benzoatoDeSodio,
      benzoatoDeSodio,
      consumption
    ),
    polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
    azulBrillanteFCFoE133: getPropSum(
      prevData?.azulBrillanteFCFoE133,
      azulBrillanteFCFoE133,
      consumption
    ),
    azurrubinaOE102: getPropSum(
      prevData?.azurrubinaOE102,
      azurrubinaOE102,
      consumption
    ),
    amarilloOcasoFDFoE110: getPropSum(
      prevData?.amarilloOcasoFDFoE110,
      amarilloOcasoFDFoE110,
      consumption
    ),
    tartrazinaOE102: getPropSum(
      prevData?.tartrazinaOE102,
      tartrazinaOE102,
      consumption
    ),
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
    fibraInsoluble: getPropSum(
      prevData?.fibraInsoluble,
      fibraInsoluble,
      consumption
    ),
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
    acidoAscorbico: getPropSum(
      prevData?.acidoAscorbico,
      acidoAscorbico,
      consumption
    ),
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
    indiceGlicemico: getPropSum(
      prevData?.indiceGlicemico,
      indiceGlicemico,
      consumption
    ),
    cargaGlicemica: getPropSum(
      prevData?.cargaGlicemica,
      cargaGlicemica,
      consumption
    ),
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
    aguaParaLavado: getPropSum(
      prevData?.aguaParaLavado,
      washingValue,
      consumption
    ),
    aguaParaCoccion: getPropSum(
      prevData?.aguaParaCoccion,
      cookingValue,
      consumption
    ),
    lugarEGEI: lugarEGEI,
    citaEGEI: citaEGEI,
    huellaDeCarbono: getPropSum(
      prevData?.huellaCarbono,
      huellaCarbono,
      consumption
    ),
    huellaEcologica: getPropSum(
      prevData?.huellaEcologica,
      huellaEcologica,
      consumption
    ),
    usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
    energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
    nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
    fosforoAmbiental: getPropSum(
      prevData?.rest?.fosforo,
      rest.fosforo,
      consumption
    ),
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
    isotiocianatos: getPropSum(
      prevData?.isotiocinatos,
      isotiocinatos,
      consumption
    ),
    carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
    betacarotenos: getPropSum(
      prevData?.betacarotenos,
      betacarotenos,
      consumption
    ),
    licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
    luteina: getPropSum(prevData?.luteina, luteina, consumption),
    alicina: getPropSum(prevData?.alicina, alicina, consumption),
    cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
    ufc: getPropSum(prevData?.UFC, UFC, consumption),
    benzoatoDeSodio: getPropSum(
      prevData?.benzoatoDeSodio,
      benzoatoDeSodio,
      consumption
    ),
    polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
    azulBrillanteFCFoE133: getPropSum(
      prevData?.azulBrillanteFCFoE133,
      azulBrillanteFCFoE133,
      consumption
    ),
    azurrubinaOE102: getPropSum(
      prevData?.azurrubinaOE102,
      azurrubinaOE102,
      consumption
    ),
    amarilloOcasoFDFoE110: getPropSum(
      prevData?.amarilloOcasoFDFoE110,
      amarilloOcasoFDFoE110,
      consumption
    ),
    tartrazinaOE102: getPropSum(
      prevData?.tartrazinaOE102,
      tartrazinaOE102,
      consumption
    ),
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
    fibraInsoluble: getPropSum(
      prevData?.fibraInsoluble,
      fibraInsoluble,
      consumption
    ),
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
    acidoAscorbico: getPropSum(
      prevData?.acidoAscorbico,
      acidoAscorbico,
      consumption
    ),
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
    indiceGlicemico: getPropSum(
      prevData?.indiceGlicemico,
      indiceGlicemico,
      consumption
    ),
    cargaGlicemica: getPropSum(
      prevData?.cargaGlicemica,
      cargaGlicemica,
      consumption
    ),
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
    aguaParaLavado: getPropSum(
      prevData?.aguaParaLavado,
      washingValue,
      consumption
    ),
    aguaParaCoccion: getPropSum(
      prevData?.aguaParaCoccion,
      cookingValue,
      consumption
    ),
    lugarEGEI: lugarEGEI,
    citaEGEI: citaEGEI,
    huellaDeCarbono: getPropSum(
      prevData?.huellaCarbono,
      huellaCarbono,
      consumption
    ),
    huellaEcologica: getPropSum(
      prevData?.huellaEcologica,
      huellaEcologica,
      consumption
    ),
    usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
    energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
    nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
    fosforoAmbiental: getPropSum(
      prevData?.rest?.fosforo,
      rest.fosforo,
      consumption
    ),
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
    isotiocianatos: getPropSum(
      prevData?.isotiocinatos,
      isotiocinatos,
      consumption
    ),
    carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
    betacarotenos: getPropSum(
      prevData?.betacarotenos,
      betacarotenos,
      consumption
    ),
    licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
    luteina: getPropSum(prevData?.luteina, luteina, consumption),
    alicina: getPropSum(prevData?.alicina, alicina, consumption),
    cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
    ufc: getPropSum(prevData?.UFC, UFC, consumption),
    benzoatoDeSodio: getPropSum(
      prevData?.benzoatoDeSodio,
      benzoatoDeSodio,
      consumption
    ),
    polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
    azulBrillanteFCFoE133: getPropSum(
      prevData?.azulBrillanteFCFoE133,
      azulBrillanteFCFoE133,
      consumption
    ),
    azurrubinaOE102: getPropSum(
      prevData?.azurrubinaOE102,
      azurrubinaOE102,
      consumption
    ),
    amarilloOcasoFDFoE110: getPropSum(
      prevData?.amarilloOcasoFDFoE110,
      amarilloOcasoFDFoE110,
      consumption
    ),
    tartrazinaOE102: getPropSum(
      prevData?.tartrazinaOE102,
      tartrazinaOE102,
      consumption
    ),
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
    fibraInsoluble: getPropSum(
      prevData?.fibraInsoluble,
      fibraInsoluble,
      consumption
    ),
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
    acidoAscorbico: getPropSum(
      prevData?.acidoAscorbico,
      acidoAscorbico,
      consumption
    ),
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
    indiceGlicemico: getPropSum(
      prevData?.indiceGlicemico,
      indiceGlicemico,
      consumption
    ),
    cargaGlicemica: getPropSum(
      prevData?.cargaGlicemica,
      cargaGlicemica,
      consumption
    ),
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
    aguaParaLavado: getPropSum(
      prevData?.aguaParaLavado,
      washingValue,
      consumption
    ),
    aguaParaCoccion: getPropSum(
      prevData?.aguaParaCoccion,
      cookingValue,
      consumption
    ),
    lugarEGEI: lugarEGEI,
    citaEGEI: citaEGEI,
    huellaDeCarbono: getPropSum(
      prevData?.huellaCarbono,
      huellaCarbono,
      consumption
    ),
    huellaEcologica: getPropSum(
      prevData?.huellaEcologica,
      huellaEcologica,
      consumption
    ),
    usoDeSuelo: getPropSum(prevData?.usoDeSuelo, usoDeSuelo, consumption),
    energiaFosil: getPropSum(prevData?.energiaFosil, energiaFosil, consumption),
    nitrogeno: getPropSum(prevData?.nitrogeno, nitrogeno, consumption),
    fosforoAmbiental: getPropSum(
      prevData?.rest?.fosforo,
      rest.fosforo,
      consumption
    ),
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
    isotiocianatos: getPropSum(
      prevData?.isotiocinatos,
      isotiocinatos,
      consumption
    ),
    carotenoides: getPropSum(prevData?.caretenoides, caretenoides, consumption),
    betacarotenos: getPropSum(
      prevData?.betacarotenos,
      betacarotenos,
      consumption
    ),
    licopeno: getPropSum(prevData?.licopeno, licopeno, consumption),
    luteina: getPropSum(prevData?.luteina, luteina, consumption),
    alicina: getPropSum(prevData?.alicina, alicina, consumption),
    cafeina: getPropSum(prevData?.cafeina, cafeina, consumption),
    ufc: getPropSum(prevData?.UFC, UFC, consumption),
    benzoatoDeSodio: getPropSum(
      prevData?.benzoatoDeSodio,
      benzoatoDeSodio,
      consumption
    ),
    polisorbato: getPropSum(prevData?.polisorbato, polisorbato, consumption),
    azulBrillanteFCFoE133: getPropSum(
      prevData?.azulBrillanteFCFoE133,
      azulBrillanteFCFoE133,
      consumption
    ),
    azurrubinaOE102: getPropSum(
      prevData?.azurrubinaOE102,
      azurrubinaOE102,
      consumption
    ),
    amarilloOcasoFDFoE110: getPropSum(
      prevData?.amarilloOcasoFDFoE110,
      amarilloOcasoFDFoE110,
      consumption
    ),
    tartrazinaOE102: getPropSum(
      prevData?.tartrazinaOE102,
      tartrazinaOE102,
      consumption
    ),
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

  if (isNaN(firstValue)) return secondValue * Number(consumption);

  if (isNaN(secondValue) && !isNaN(firstValue))
    return firstValue * Number(consumption);

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

export const generateFinalCsvRows = (data, type) => {
  const rows = [];
  const uniqueIds = new Set([...data.map((elem) => elem.idRegistro)]);
  const participants = new Set([...data.map((elem) => elem.idParticipante)]);

  const copyUnique = [...uniqueIds];
  const copyParticipants = [...participants];

  copyUnique.forEach((id) => {
    const filteredRows = data.filter((elem) => elem.idRegistro === id);

    const newIds = filteredRows.map((elem) => {
      const idIndex = copyParticipants.findIndex(
        (e) => e === elem.idParticipante
      );
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

  const normalizedKeysToColumnNames = [];

  rows.forEach((row) => {
    row.forEach(
      ({ idParticipante, idRegistro, fechaRegistro, ...rest }, index) => {
        const newRest = {};

        Object.keys(rest).forEach((key) => {
          newRest[key] = rest[key];
          newRest[`${key}${index}`] = rest[key];

          delete rest[key];
        });

        normalizedKeysToColumnNames.push({
          idParticipante,
          idRegistro,
          fechaRegistro,
          ...newRest,
        });
      }
    );
  });

  const tempRows = [];

  rows.forEach((row) => {
    let newRow = [];
    row.forEach((register, index) => {
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

  tempRows.forEach((elem) => {
    const row = elem
      .map((e) => e)
      .reduce((acc, curr) => {
        const isArray = Array.isArray(curr);
        if (isArray) {
          const [name] = curr;
          const tempArray = groups[type].map((elem) => getZeroData(elem));
          const arrIndex = tempArray.findIndex((elem) => elem[0] === name);
          tempArray.splice(arrIndex, 1, curr);

          return acc.concat(...tempArray);
        } else {
          return acc.concat(curr);
        }
      }, []);
    const maxColumnsData = groups[type].length * 93 + 3;
    finalRows.push(row.slice(0, maxColumnsData));
  });

  return finalRows;
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

export const getFinalColumns = (columns, maxColumns) => {
  const newColumns = columns;

  for (let i = 0; i < maxColumns - 1; i++) {
    newColumns.push(
      ...food[`groupColumns${0}`],
      ...extraColumns2[`extraColumns${0}`],
      ...calories[`caloriasMacronutrientes${0}`],
      ...vitamins[`vitaminas${0}`],
      ...minerals[`minerales${0}`],
      ...glycemic[`aspectoGlucemico${0}`],
      ...environmental[`aspectosMedioambientales${0}`],
      ...economic[`aspectosEconomicos2`],
      ...bioactives[`componentesBioactivos${0}`],
      ...additives[`aditivosAlimentarios${0}`]
    );
  }

  const finalColumns = [];
  newColumns.forEach((columnProps) => {
    finalColumns.push(columnProps.title);
  });

  return finalColumns;
};

export const normalizePropsOrder = (data) => {
  if (isInvalidElem(data)) return "";

  const result = [];

  const {
    grupoAlimento,
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
  result.push("");
  result.push("");
  result.push(0);
  result.push(0);
  result.push(0);
  result.push(0);
  result.push(0);
  result.push(0);
  result.push("");
  result.push("");
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
//2
export const getSumByDay = (data, type) => {
  if (isInvalidElem(data)) {
    return [];
  }

  const objetosIterados = [];
  const aux = [];
  const sumMapped = [];
  const sum = [];
  const repe = {};
  console.log("aux: ", aux);

  const normalizedMethod = getMethodType(type);
  /*aux.forEach((sum) => {
    const { fechaRegistro, idParticipante } = aux;
    console.log(fechaRegistro);
  });*/
  console.log({ data });
  data.forEach((row) => {
    const { fechaRegistro, idParticipante } = row;

    const yaIterado = objetosIterados.some((obj) => {
      return (
        obj.fechaRegistro === fechaRegistro &&
        obj.idParticipante === idParticipante
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

      found.values.forEach((grupo) => {
        const { values } = grupo;

        values.forEach((alimento) => {
          suma = sumObjectValues(suma, alimento);
          // console.log({ suma, alimento });
        });
      });

      objetosIterados.push(suma);
    }
  });
  console.log("objetosIterados: ", objetosIterados);
  // data.forEach((row) => {
  //     const alimentos = row.values;
  //     let objToPush = {
  //         idParticipante: row.idParticipante,
  //         idRegistro: row.idRegistro,
  //         fechaRegistro: row.fechaRegistro,
  //     };
  //     //console.log(row.fechaRegistro);
  //     console.log('row: ', row);
  //     if (row.idParticipante === aux.idParticipante) {
  //         console.log('repe');
  //         sum.push(row);
  //         console.log('sum', sum);
  //     } else {
  //     }

  //  /   alimentos.forEach((grupo) => {
  //         const { values, ...rest } = grupo;
  //         let finalSum = {};

  //         values.forEach((alimento) => {
  //             finalSum = normalizedMethod(finalSum, alimento);
  //         });

  //         objToPush = { ...objToPush, ...finalSum };

  //         //console.log("row", row);
  //         aux.push(objToPush);
  //     });
  // });

  return aux;
};

export const sumObjectValues = (firstObj, secondObj) => {
  const result = {};

  if (isEmptyObject(firstObj)) {
    return secondObj;
  }

  console.log({ firstObj, secondObj });
  Object.keys(firstObj).forEach((key) => {
    const firstValue = Number(firstObj[key]);
    const secondValue = Number(secondObj[key]);

    if (getIsANumber(firstObj[key]) && getIsANumber(secondObj[key])) {
      result[key] = String(firstValue + secondValue);
    } else if (getIsAScript(firstObj[key]) || getIsAScript(secondObj[key])) {
      result[key] = "-";
    } else if (getIsArray(firstObj[key]) && getIsArray(secondObj[key])) {
      //result[key] = firstObj[key];
      // console.log("Ahora si");
    } else if (getIsArray(firstValue) && getIsArray(secondValue)) {
      //result[key] = firstObj[key];
      // console.log("Ahora si2");
    } else if (getIsAString(firstObj[key]) && getIsAString(secondObj[key])) {
      result[key] = firstObj[key] + ", " + secondObj[key];
      // console.log(result[key]);
    } else if (firstObj[key] === "cantidad" && secondObj[key] === "cantidad") {
      result[key] = String(firstValue + secondValue);
    } else {
      result[key] = firstObj[key];
    }
  });
  console.log({ result });
  return result;
};
