import { isInvalidElem } from '../../../../utils';

export const generateFormDTO = (data) => {
    //console.log(data)
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
            name: 'indiceglicemico',
            value: indiceGlicemico,
        },
        {
            name: 'cargaglicemica',
            value: cargaGlicemica,
        },
        {
            name: 'fchh',
            value: factorDeCorreccionParaHuellaHidricaYEGEI,
        },
        {
            name: 'puntajeecologico',
            value: puntajeEcologico,
        },
        {
            name: 'tipo',
            value: tipo,
        },
        {
            name: 'lugar',
            value: lugar,
        },
        {
            name: 'hht',
            value: huellaHidricaTotal,
        },
        {
            name: 'hhv',
            value: huellaHidricaVerde,
        },
        {
            name: 'hha',
            value: huellaHidricaAzul,
        },
        {
            name: 'hhg',
            value: huellaHidricaGris,
        },
        {
            name: 'agualavado',
            value: aguaParaLavado,
        },
        {
            name: 'aguacoccion',
            value: aguaParaCoccion,
        },
        {
            name: 'lugaregei',
            value: lugarEGEI,
        },
        {
            name: 'citaegei',
            value: citaEGEI,
        },
        {
            name: 'hcarbono',
            value: huellaCarbono,
        },
        {
            name: 'hecologica',
            value: huellaEcologica,
        },
        {
            name: 'energiafosil',
            value: energiaFosil,
        },
        {
            name: 'usosuelo',
            value: usoDeSuelo,
        },
        {
            name: 'nitrogeno',
            value: nitrogeno,
        },
        {
            name: 'fosforo2',
            value: rest.fosforo,
        },
        {
            name: 'precio',
            value: precio,
        },
        {
            name: 'lugarcompra',
            value: lugarDeCompra,
        },
        {
            name: 'lugarventa',
            value: lugarDeVenta,
        },
        {
            name: 'fitoquimicos',
            value: fitoquimicos,
        },
        {
            name: 'polifenoles',
            value: polifenoles,
        },
        {
            name: 'antocianinas',
            value: antocianinas,
        },
        {
            name: 'taninos',
            value: taninos,
        },
        {
            name: 'isoflavonas',
            value: isoflavonas,
        },
        {
            name: 'reserveratrol',
            value: resveratrol,
        },
        {
            name: 'isotiocinatos',
            value: isotiocinatos,
        },
        {
            name: 'caretenoides',
            value: caretenoides,
        },
        {
            name: 'betacarotenos',
            value: betacarotenos,
        },
        {
            name: 'licopeno',
            value: licopeno,
        },
        {
            name: 'luteina',
            value: luteina,
        },
        {
            name: 'alicina',
            value: alicina,
        },
        {
            name: 'cafeina',
            value: cafeina,
        },
        {
            name: 'ufc',
            value: UFC,
        },
        {
            name: 'benzoatodesodio',
            value: benzoatoDeSodio,
        },
        {
            name: 'polisorbato',
            value: polisorbato,
        },
        {
            name: 'fcf',
            value: azulBrillanteFCFoE133,
        },
        {
            name: 'azorrubina',
            value: azurrubinaOE102,
        },
        {
            name: 'fdf',
            value: amarilloOcasoFDFoE110,
        },
        {
            name: 'tartrazina',
            value: tartrazinaOE102,
        },
        {
            name: 'e142',
            value: verdeSoE142,
        },
        {
            name: 'bn',
            value: negroBrillanteBNoE151,
        },
        {
            name: 'sucralosa',
            value: sucralosa,
        },
        {
            name: 'stevia',
            value: estevia,
        },
        {
            name: 'sacarina',
            value: sacarina,
        },
        {
            name: 'aspartame',
            value: aspartame,
        },
        {
            name: 'acesulfame',
            value: acesulfameK,
        },
        {
            name: 'carboxy',
            value: carboxymethylcellulose,
        },
        {
            name: 'dioxidodetitanio',
            value: dioxidoDeTitanio,
        },
        {
            name: 'glicerol',
            value: monolauratoDeGlicerol,
        },
        {
            name: 'marca',
            value: marca,
        },

        {
            name: 'imagen',
            value: imagen,
        },
        {
            name: 'opcionesPreparacion',
            value: opcionesPreparacion,
        },

        {
            name: 'iconoNutricional',
            value: iconoNutricional,
        },
        {
            name: 'iconoAmbiental',
            value: iconoAmbiental,
        },
        {
            name: 'iconoEconomia',
            value: iconoEconomia,
        },
        {
            name: 'iconoCulturaSociedad',
            value: iconoCulturaSociedad,
        },
    ];
};
