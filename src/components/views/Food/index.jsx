import { useState, useEffect } from 'react';

import { message, Progress } from 'antd';
import apiURL from '../../../axios/axiosConfig';

import ImportData from '../../commons/ImportData';

import './Food.scss';

const Food = () => {
    const [fileData, setFileData] = useState([]);
    const [percent, setPercent] = useState(0);
    const [foods, setFoods] = useState([]);

    let currentIndex = 0;

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        fileData.length > 0 && hadleRequest();

        return () => {
            currentIndex = 0;
            setPercent(0);
            setFoods([]);
        };
    }, [fileData.length]);

    const hadleRequest = () => {
        setPercent(0);
        fileData.map((row, index) => {
            const rowValues = Object.values(row);

            const aux = rowValues[15] ?? 'N/A';

            const isString = typeof aux === 'string' || aux instanceof String;
            let opciones = [];
            if (isString) opciones = rowValues[15].split(',');

            const data = {
                sku: `${rowValues[0]}`,
                nombreAlimento: `${rowValues[1] ?? 'N/A'}`,
                grupoExportable: `${rowValues[2] ?? 'N/A'}`,
                subGrupoExportable: `${rowValues[3] ?? 'N/A'}`,
                grupoAlimento: `${rowValues[4] ?? 'N/A'}`,
                mensaje: {
                    nutricional: `${rowValues[5] ?? 'N/A'}`,
                    ambiental: `${rowValues[6] ?? 'N/A'}`,
                    mensajeEconomia: `${rowValues[7] ?? 'N/A'}`,
                    mensajeCulturaSociedad: `${rowValues[8] ?? 'N/A'}`,
                },

                icono: {
                    iconoNutricional: `${rowValues[9] ?? '4'}`,
                    iconoAmbiental: `${rowValues[10] ?? '4'}`,
                    iconoEconomia: `${rowValues[11] ?? '4'}`,
                    iconoCulturaSociedad: `${rowValues[12] ?? '4'}`,
                },
                imagen: `${rowValues[13] ?? 'N/A'}`,
                clasificacionExportable: `${rowValues[14] ?? 'N/A'}`,
                opcionesPreparacion: opciones,
                cantidadAlimento: {
                    cantidadSugerida: rowValues[16] ?? 0,
                    unidad: `${rowValues[17] ?? 'N/A'}`,
                    pesoNeto: `${rowValues[18] ?? '0'}`,
                },
                caloriasMacronutrientes: {
                    energia: `${rowValues[19] ?? '0'}`,
                    proteina: `${rowValues[20] ?? '0'}`,
                    lipidos: `${rowValues[21] ?? '0'}`,
                    agSaturados: `${rowValues[22] ?? '0'}`,
                    agMonoinsaturados: `${rowValues[23] ?? '0'}`,
                    adPoliinsaturados: `${rowValues[24] ?? '0'}`,
                    colesterol: `${rowValues[25] ?? '0'}`,
                    omega3: `${rowValues[26] ?? '0'}`,
                    omega6: `${rowValues[27] ?? '0'}`,
                    omega9: `${rowValues[28] ?? '0'}`,
                    hidratosDeCarbono: `${rowValues[29] ?? '0'}`,
                    fibra: `${rowValues[30] ?? '0'}`,
                    fibraInsoluble: `${rowValues[31] ?? '0'}`,
                    fibraSoluble: `${rowValues[32] ?? '0'}`,
                    azucar: `${rowValues[33] ?? '0'}`,
                    etanol: `${rowValues[34] ?? '0'}`,
                },
                vitaminas: {
                    tiamina: `${rowValues[35] ?? '0'}`,
                    riboflavin: `${rowValues[36] ?? '0'}`,
                    niacina: `${rowValues[37] ?? '0'}`,
                    acidoPantotenico: `${rowValues[38] ?? '0'}`,
                    piridoxina: `${rowValues[39] ?? '0'}`,
                    biotina: `${rowValues[40] ?? '0'}`,
                    cobalmina: `${rowValues[41] ?? '0'}`,
                    acidoAscorbico: `${rowValues[42] ?? '0'}`,
                    acidoFolico: `${rowValues[43] ?? '0'}`,
                    vitaminaA: `${rowValues[44] ?? '0'}`,
                    vitaminaD: `${rowValues[45] ?? '0'}`,
                    vitaminaK: `${rowValues[46] ?? '0'}`,
                    vitaminaE: `${rowValues[47] ?? '0'}`,
                },
                minerales: {
                    calcio: `${rowValues[48] ?? '0'}`,
                    fosforo: `${rowValues[49] ?? '0'}`,
                    hierro: `${rowValues[50] ?? '0'}`,
                    hierroNoHem: `${rowValues[51] ?? '0'}`,
                    hierroTotal: `${
                        Number(rowValues[50] + rowValues[51]) ?? '0'
                    }`,
                    magnesio: `${rowValues[52] ?? '0'}`,
                    sodio: `${rowValues[53] ?? '0'}`,
                    potasio: `${rowValues[54] ?? '0'}`,
                    zinc: `${rowValues[55] ?? '0'}`,
                    selenio: `${rowValues[56] ?? '0'}`,
                },
                aspectoGlucemico: {
                    indiceGlicemico: `${rowValues[57] ?? '0'}`,
                    cargaGlicemica: `${rowValues[58] ?? '0'}`,
                },
                aspectoMedioambiental: {
                    factorDeCorreccionParaHuellaHidricaYEGEI:
                        rowValues[59] ?? 0,
                    tipo: `${rowValues[60] ?? 'N/A'}`,
                    lugar: `${rowValues[61] ?? 'N/A'}`,
                    huellaHidricaTotal: `${
                        Number(rowValues[62]) +
                        Number(rowValues[63]) +
                        Number(rowValues[64])
                    }`,
                    huellaHidricaVerde: `${rowValues[62] ?? '0'}`,
                    huellaHidricaAzul: `${rowValues[63] ?? '0'}`,
                    huellaHidricaGris: `${rowValues[64] ?? '0'}`,
                    aguaParaLavado: `${rowValues[65] ?? '0'}`,
                    aguaParaCoccion: `${rowValues[66] ?? '0'}`,
                    lugarEGEI: `${rowValues[67] ?? '0'}`,
                    citaEGEI: `${rowValues[68] ?? '0'}`,
                    huellaCarbono: `${rowValues[69] ?? '0'}`, // EGEI.
                    huellaEcologica: `${rowValues[70] ?? '0'}`,
                    usoDeSuelo: `${rowValues[71] ?? '0'}`,
                    energiaFosil: `${rowValues[72] ?? '0'}`,
                    nitrogeno: `${rowValues[73] ?? '0'}`,
                    fosforo: `${rowValues[74] ?? '0'}`,
                    puntajeEcologico: rowValues[75] ?? 0,
                },
                aspectoEconomico: {
                    precio: rowValues[76] ?? 0,
                    lugarDeCompra: `${rowValues[77] ?? 'N/A'}`,
                    lugarDeVenta: `${rowValues[78] ?? 'N/A'}`,
                },
                componentesBioactivos: {
                    fitoquimicos: `${rowValues[79] ?? '0'}`,
                    polifenoles: `${rowValues[80] ?? '0'}`,
                    antocianinas: `${rowValues[81] ?? '0'}`,
                    taninos: `${rowValues[82] ?? '0'}`,
                    isoflavonas: `${rowValues[83] ?? '0'}`,
                    resveratrol: `${rowValues[84] ?? '0'}`,
                    isotiocinatos: `${rowValues[85] ?? '0'}`,
                    caretenoides: `${rowValues[86] ?? '0'}`,
                    betacarotenos: `${rowValues[87] ?? '0'}`,
                    licopeno: `${rowValues[88] ?? '0'}`,
                    luteina: `${rowValues[89] ?? '0'}`,
                    alicina: `${rowValues[90] ?? '0'}`,
                    cafeina: `${rowValues[91] ?? '0'}`,
                    UFC: `${rowValues[92] ?? '0'}`,
                },
                aditivosAlimentarios: {
                    benzoatoDeSodio: `${rowValues[93] ?? '0'}`,
                    polisorbato: `${rowValues[94] ?? '0'}`,
                    azulBrillanteFCFoE133: `${rowValues[95] ?? '0'}`,
                    azurrubinaOE102: `${rowValues[96] ?? '0'}`,
                    amarilloOcasoFDFoE110: `${rowValues[97] ?? '0'}`,
                    tartrazinaOE102: `${rowValues[98] ?? '0'}`,
                    verdeSoE142: `${rowValues[99] ?? '0'}`,
                    negroBrillanteBNoE151: `${rowValues[100] ?? '0'}`,
                    sucralosa: `${rowValues[101] ?? '0'}`,
                    estevia: `${rowValues[102] ?? '0'}`,
                    sacarina: `${rowValues[103] ?? '0'}`,
                    aspartame: `${rowValues[104] ?? '0'}`,
                    acesulfameK: `${rowValues[105] ?? '0'}`,
                    carboxymethylcellulose: `${rowValues[106] ?? '0'}`,
                    dioxidoDeTitanio: `${rowValues[107] ?? '0'}`,
                    monolauratoDeGlicerol: `${rowValues[108] ?? '0'}`,
                },
                atributosAdicionales: [
                    {
                        atributoAdicional: `${rowValues[109] ?? 'N/A'}`,
                    },
                ],
                marca: `${rowValues[108] ?? ''}`,
            };

            postFoods(data, index);
        });
    };
    const onSuccess = (data) => {
        setFileData(data);
    };

    const postFoods = async (food, index) => {
        try {
            const response = await apiURL.post('/importarAlimentos', food);

            if (response.data.message === 'El alimento ya existe') {
                await patchFood(food, index);
            }
            if (response.status === 200) {
                console.log(`[${index}] STATUS: ${response.status}`);
                currentIndex = index > currentIndex ? index : currentIndex;
                setPercent(
                    currentIndex === 0
                        ? 100
                        : Math.ceil((currentIndex / foods.length) * 100)
                );
            }
        } catch (error) {
            return message.error(
                `Error al importar el alimento - ${error.message} [actualización]`
            );
        }
    };

    const patchFood = async (food, index) => {
        try {
            const response = await apiURL.patch('/importarAlimentos', food);
            if (response.status === 200) {
                console.log(`[${index}] STATUS: ${response.status}`);
                currentIndex = index > currentIndex ? index : currentIndex;
                setPercent(
                    currentIndex === 0
                        ? 100
                        : Math.ceil((currentIndex / foods.length) * 100)
                );
            }
        } catch (error) {
            return message.error(
                `Error al importar el alimento - ${error.message}`
            );
        }
    };

    return (
        <div className='foodContainer'>
            <ImportData onSuccess={onSuccess} className='item' />
            {percent === 100 ? (
                <Progress
                    type='circle'
                    percent={percent}
                    format={() => '¡Éxito!'}
                    className='item'
                />
            ) : (
                <Progress type='circle' percent={percent} className='item' />
            )}
        </div>
    );
};

export default Food;
