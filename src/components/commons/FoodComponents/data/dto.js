import { isInvalidElem } from '../../../../utils';

export const generateFormDTO = (data) => {
    if (isInvalidElem(data) || Array.isArray(data)) return [];

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
        imagen,
        marca,
    } = data;
    const { nutricional, ambiental, mensajeEconomia, mensajeCulturaSociedad } = mensaje;
    const { iconoNutricional, iconoAmbiental, iconoEconomia, iconoCulturaSociedad } = icono;
    const { cantidadSugerida, unidad, pesoNeto } = cantidadAlimento;
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
        puntajeEcologico,
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

    return [
        {
            name: 'pName',
            value: nombreAlimento,
        },
        {
            name: 'pSku',
            value: sku,
        },
        {
            name: 'pGroupE',
            value: grupoExportable,
        },
        {
            name: 'pSubGroupE',
            value: subGrupoExportable,
        },
        {
            name: 'pClasE',
            value: clasificacionExportable,
        },
        {
            name: 'pGroupAli',
            value: grupoAlimento,
        },
        {
            name: 'mNutri',
            value: nutricional,
        },
        {
            name: 'mAmbien',
            value: ambiental,
        },
        {
            name: 'mEcono',
            value: mensajeEconomia,
        },
        {
            name: 'mCult_Soci',
            value: mensajeCulturaSociedad,
        },
        {
            name: 'sugerida',
            value: cantidadSugerida,
        },
        {
            name: 'unidad',
            value: unidad,
        },
        {
            name: 'pesoneto',
            value: pesoNeto,
        },
        {
            name: 'energia',
            value: energia,
        },
        {
            name: 'proteina',
            value: proteina,
        },
        {
            name: 'lipidos',
            value: lipidos,
        },
        {
            name: 'saturados',
            value: agSaturados,
        },
        {
            name: 'monoinsaturados',
            value: agMonoinsaturados,
        },
        {
            name: 'polinsaturados',
            value: adPoliinsaturados,
        },
        {
            name: 'colesterol',
            value: colesterol,
        },
        {
            name: 'omega3',
            value: omega3,
        },
        {
            name: 'omega6',
            value: omega6,
        },
        {
            name: 'omega9',
            value: omega9,
        },
        {
            name: 'hdratoscarbono',
            value: hidratosDeCarbono,
        },
        {
            name: 'fibra',
            value: fibra,
        },
        {
            name: 'fibrainsoluble',
            value: fibraInsoluble,
        },
        {
            name: 'fibrasoluble',
            value: fibraSoluble,
        },
        {
            name: 'azucar',
            value: azucar,
        },
        {
            name: 'etanol',
            value: etanol,
        },
        {
            name: 'tiamina',
            value: tiamina,
        },
        {
            name: 'riboflavin',
            value: riboflavin,
        },
        {
            name: 'niacina',
            value: niacina,
        },
        {
            name: 'acidopantotenico',
            value: acidoPantotenico,
        },
        {
            name: 'piridoxina',
            value: piridoxina,
        },
        {
            name: 'biotina',
            value: biotina,
        },
        {
            name: 'cobalmina',
            value: cobalmina,
        },
        {
            name: 'acidoascorbico',
            value: acidoAscorbico,
        },
        {
            name: 'acidofolico',
            value: acidoFolico,
        },
        {
            name: 'vitaminaA',
            value: vitaminaA,
        },
        {
            name: 'vitaminaD',
            value: vitaminaD,
        },
        {
            name: 'vitaminaE',
            value: vitaminaE,
        },
        {
            name: 'vitaminaK',
            value: vitaminaK,
        },
        {
            name: 'calcio',
            value: calcio,
        },
        {
            name: 'fosforo1',
            value: fosforo,
        },
        {
            name: 'hierro',
            value: hierro,
        },
        {
            name: 'hierronohem',
            value: hierroNoHem,
        },
        {
            name: 'hierrototal',
            value: hierroTotal,
        },
        {
            name: 'magnesio',
            value: magnesio,
        },
        {
            name: 'sodio',
            value: sodio,
        },
        {
            name: 'selenio',
            value: selenio,
        },
        {
            name: 'potasio',
            value: potasio,
        },
        {
            name: 'zinc',
            value: zinc,
        },
        {
            name: 'opcionesPreparacion',
            value: opcionesPreparacion,
        },
    ];
};
