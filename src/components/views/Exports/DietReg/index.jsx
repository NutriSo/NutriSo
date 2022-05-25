import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';

import { message } from 'antd';
import dayjs from 'dayjs';

import ButtonsArea from '../../../commons/ButtonsArea';

const KG = 1000;

const DietReg = ({ selected = false, setLoading }) => {
    const [exportData, setExportData] = useState([]);
    const [fileReady, setFileReady] = useState(false);

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFileReady(false);
        };
    }, [selected]);

    const getExportData = async () => {
        console.log('Obteniendo datos de exportación...');
        try {
            const { data } = await apiURL.get('registroDietetico');

            const exportedData = [];

            if (data?.length > 0)
                data.map(async (elem, dataIndex) => {
                    const userInfo = await getUserData(elem.usuario);

                    const foodArrayInfo = await Promise.all(
                        elem.alimentos.map(async (food) => await getFoodData(food.id))
                    );

                    foodArrayInfo.forEach((food, foodIndex) => {
                        const indexFood = elem.alimentos.findIndex((item) => item.id === food.id);

                        const correctFood = elem.alimentos[indexFood];

                        const quantity = Number(correctFood.cantidad ?? 1); // Agregar la unidad de medida.
                        const factor = Number(food.aspectoMedioambiental.factorDeCorreccionParaHuellaHidricaYEGEI);
                        const washing = Number(food.aspectoMedioambiental.aguaParaLavado);
                        const cooking = Number(food.aspectoMedioambiental.aguaParaCoccion);
                        const consumption = Number(food.cantidadAlimento.pesoNeto);

                        const washingValue = (quantity * consumption * washing) / KG;
                        const cookingValue = (quantity * consumption * cooking) / KG;

                        const newData = {
                            idParticipante: elem.usuario,
                            nombre: `${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}`,
                            // Existen 2 posibles fechas aquí. La fecha en la que se creó el registro, o la fecha en la que dice que se realizó el consumo.
                            fechaRegistro: dayjs(elem.horario).format('DD/MM/YYYY'),
                            horario: dayjs(elem.horario).format('HH:mm'),
                            categoriaRegistro: elem.tipo,
                            idAlimento: food.id,
                            alimento: food.nombreAlimento,
                            cantidad: quantity,
                            gramos: food.cantidadAlimento.pesoNeto,
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
                            azulBrillanteFCFoE133: Number(food.aditivosAlimentarios.azulBrillanteFCFoE133 * quantity),
                            azurrubinaOE102: Number(food.aditivosAlimentarios.azurrubinaOE102 * quantity),
                            amarilloOcasoFDFoE110: Number(food.aditivosAlimentarios.amarilloOcasoFDFoE110 * quantity),
                            tartrazinaOE102: Number(food.aditivosAlimentarios.tartrazinaOE102 * quantity),
                            verdeSoE142: Number(food.aditivosAlimentarios.verdeSoE142 * quantity),
                            negroBrillanteBNoE151: Number(food.aditivosAlimentarios.negroBrillanteBNoE151 * quantity),
                            sucralosa: Number(food.aditivosAlimentarios.sucralosa * quantity),
                            estevia: Number(food.aditivosAlimentarios.estevia * quantity),
                            sacarina: Number(food.aditivosAlimentarios.sacarina * quantity),
                            aspartame: Number(food.aditivosAlimentarios.aspartame * quantity),
                            acesulfameK: Number(food.aditivosAlimentarios.acesulfameK * quantity),
                            carboxymethylcellulose: Number(food.aditivosAlimentarios.carboxymethylcellulose * quantity),
                            dioxidoDeTitanio: Number(food.aditivosAlimentarios.dioxidoDeTitanio * quantity),
                            monolauratoDeGlicerol: Number(food.aditivosAlimentarios.monolauratoDeGlicerol * quantity),
                        };

                        setExportData([...exportedData, newData]);
                        exportedData.push(newData);
                        console.log(`Food[${foodIndex}]-Data[${dataIndex}]`);
                    });

                    if (dataIndex === data.length - 1) {
                        setFileReady(true);
                        setLoading(false);
                    }
                });
        } catch (error) {
            setFileReady(false);
            message.error('Error al obtener los datos');
            console.groupCollapsed('[Exports] getExportData');
            console.error(error);
            console.groupEnd();
        }
    };

    const getFoodData = async (id) => {
        try {
            const { data } = await apiURL.get(`alimentos/${id}`);

            return data;
        } catch (error) {
            message.error('Error al obtener los datos de alimentos');
            console.groupCollapsed('[Exports] getFoodData');
            console.error(error);
            console.groupEnd();
        }
    };

    const getUserData = async (id) => {
        try {
            const { data } = await apiURL.get(`/informacionUsuarios/individual?usuario=${id}`);

            return data;
        } catch (error) {
            message.error('Error al obtener los datos del usuario');
            console.groupCollapsed('[Exports] getUserData');
            console.error(error);
            console.groupEnd();
        }
    };

    return (
        <ButtonsArea
            fileReady={fileReady}
            xlsxData={{
                columns: columns,
                data: exportData,
                fileName: `Registros dietéticos total ${dayjs(new Date()).format('DD-MM-YYYY')}`,
            }}
        />
    );
};

export default DietReg;

export const columns = [
    {
        title: 'No. Participante',
        dataIndex: 'idParticipante',
        key: 'idParticipante',
        width: 60,
    },
    {
        title: 'Participante',
        dataIndex: 'nombre',
        key: 'nombre',
        width: 100,
    },
    {
        title: 'Fecha de registro',
        dataIndex: 'fechaRegistro',
        key: 'fechaRegistro',
        width: 30,
    },
    {
        title: 'Horario',
        dataIndex: 'horario',
        key: 'horario',
        width: 30,
    },
    {
        title: 'Categoria',
        dataIndex: 'categoriaRegistro',
        key: 'categoriaRegistro',
        width: 50,
    },
    {
        title: 'ID alimento',
        dataIndex: 'idAlimento',
        key: 'idAlimento',
        width: 60,
    },
    {
        title: 'Alimento',
        dataIndex: 'alimento',
        key: 'alimento',
        width: 100,
    },
    {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
        width: 30,
    },
    {
        title: 'Gramos',
        dataIndex: 'gramos',
        key: 'gramos',
        width: 30,
    },
    {
        title: 'Energía (Kcal)',
        dataIndex: 'energiaKcal',
        key: 'energiaKcal',
        width: 30,
    },
    {
        title: 'Proteína (g)',
        dataIndex: 'proteina',
        key: 'proteina',
        width: 30,
    },
    {
        title: 'Lipidos (g)',
        dataIndex: 'lipidos',
        key: 'lipidos',
        width: 30,
    },
    {
        title: 'AG Saturados (g)',
        dataIndex: 'agSaturados',
        key: 'agSaturados',
        width: 30,
    },
    {
        title: 'AG Monoinsaturados (g)',
        dataIndex: 'agMonoinsaturados',
        key: 'agMonoinsaturados',
        width: 30,
    },
    {
        title: 'AG Poliinsaturados (g)',
        dataIndex: 'agPoliinsaturados',
        key: 'agPoliinsaturados',
        width: 30,
    },
    {
        title: 'Colesterol (mg)',
        dataIndex: 'colesterol',
        key: 'colesterol',
        width: 30,
    },
    {
        title: 'Omega 3 (mg)',
        dataIndex: 'omega3',
        key: 'omega3',
        width: 30,
    },
    {
        title: 'Omega 6 (mg)',
        dataIndex: 'omega6',
        key: 'omega6',
        width: 30,
    },
    {
        title: 'Omega 9 (mg)',
        dataIndex: 'omega9',
        key: 'omega9',
        width: 30,
    },
    {
        title: 'Hidratos de carbono',
        dataIndex: 'hidratosDeCarbono',
        key: 'hidratosDeCarbono',
        width: 30,
    },
    {
        title: 'Fibra (g)',
        dataIndex: 'fibra',
        key: 'fibra',
        width: 30,
    },
    {
        title: 'Fibra insoluble (g)',
        dataIndex: 'fibraInsoluble',
        key: 'fibraInsoluble',
        width: 30,
    },
    {
        title: 'Azúcar (g)',
        dataIndex: 'azucar',
        key: 'azucar',
        width: 30,
    },
    {
        title: 'Etanol (g)',
        dataIndex: 'etanol',
        key: 'etanol',
        width: 30,
    },
    {
        title: 'Tiamina (mg)',
        dataIndex: 'tiamina',
        key: 'tiamina',
        width: 30,
    },
    {
        title: 'Riboflavina (mg)',
        dataIndex: 'riboflavina',
        key: 'riboflavina',
        width: 30,
    },
    {
        title: 'Niacina (mg)',
        dataIndex: 'niacina',
        key: 'niacina',
        width: 30,
    },
    {
        title: 'Ácido pantoténico (mg)',
        dataIndex: 'acidoPantotenico',
        key: 'acidoPantotenico',
        width: 30,
    },
    {
        title: 'Piridoxina (mg)',
        dataIndex: 'piridoxina',
        key: 'piridoxina',
        width: 30,
    },
    {
        title: 'Biotina (mg)',
        dataIndex: 'biotina',
        key: 'biotina',
        width: 30,
    },
    {
        title: 'Cobalamina (mg)',
        dataIndex: 'cobalamina',
        key: 'cobalamina',
        width: 30,
    },
    {
        title: 'Ácido ascórbico (mg)',
        dataIndex: 'acidoAscorbico',
        key: 'acidoAscorbico',
        width: 30,
    },
    {
        title: 'Ácido fólico (µg)',
        dataIndex: 'acidoFolico',
        key: 'acidoFolico',
        width: 30,
    },
    {
        title: 'Vitamina A (µg RE)',
        dataIndex: 'vitaminaA',
        key: 'vitaminaA',
        width: 30,
    },
    {
        title: 'Vitamina D (µg RE)',
        dataIndex: 'vitaminaD',
        key: 'vitaminaD',
        width: 30,
    },
    {
        title: 'Vitamina K (µg)',
        dataIndex: 'vitaminaK',
        key: 'vitaminaK',
        width: 30,
    },
    {
        title: 'Vitamina E (µg)',
        dataIndex: 'vitaminaE',
        key: 'vitaminaE',
        width: 30,
    },
    {
        title: 'Calcio (mg)',
        dataIndex: 'calcio',
        key: 'calcio',
        width: 30,
    },
    {
        title: 'Fósforo (mg)',
        dataIndex: 'fosforo',
        key: 'fosforo',
        width: 30,
    },
    {
        title: 'Hierro (mg)',
        dataIndex: 'hierro',
        key: 'hierro',
        width: 30,
    },
    {
        title: 'Hierro NO HEM (mg)',
        dataIndex: 'hierroNoHem',
        key: 'hierroNoHem',
        width: 30,
    },
    {
        title: 'Hierro total (mg)',
        dataIndex: 'hierroTotal',
        key: 'hierroTotal',
        width: 30,
    },
    {
        title: 'Magnesio (mg)',
        dataIndex: 'magnesio',
        key: 'magnesio',
        width: 30,
    },
    {
        title: 'Sodio (mg)',
        dataIndex: 'sodio',
        key: 'sodio',
        width: 30,
    },
    {
        title: 'Potasio (mg)',
        dataIndex: 'potasio',
        key: 'potasio',
        width: 30,
    },
    {
        title: 'Zinc (mg)',
        dataIndex: 'zinc',
        key: 'zinc',
        width: 30,
    },
    {
        title: 'Selenio (mg)',
        dataIndex: 'selenio',
        key: 'selenio',
        width: 30,
    },
    {
        title: 'Índice glicémico',
        dataIndex: 'indiceGlicemico',
        key: 'indiceGlicemico',
        width: 30,
    },
    {
        title: 'Carga glicémica',
        dataIndex: 'cargaGlicemica',
        key: 'cargaGlicemica',
        width: 30,
    },
    {
        title: 'Factor de corrección para Huella Hídrica y EGEI',
        dataIndex: 'factorDeCorreccionParaHuellaHidricaYEGEI',
        key: 'factorDeCorreccionParaHuellaHidricaYEGEI',
        width: 30,
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
        width: 30,
    },
    {
        title: 'Huella hidrica total (litros por kilo)',
        dataIndex: 'huellaHidricaTotal',
        key: 'huellaHidricaTotal',
        width: 30,
    },
    {
        title: 'Huella hídrica verde (litros por kilo)',
        dataIndex: 'huellaHidricaVerde',
        key: 'huellaHidricaVerde',
        width: 30,
    },
    {
        title: 'Huella hídrica azul (litros por kilo)',
        dataIndex: 'huellaHidricaAzul',
        key: 'huellaHidricaAzul',
        width: 30,
    },
    {
        title: 'Huella Hidríca gris (litros por kilo)',
        dataIndex: 'huellaHidricaGris',
        key: 'huellaHidricaGris',
        width: 30,
    },
    {
        title: 'Agua para lavado (litros por kilogramo de alimento)',
        dataIndex: 'aguaParaLavado',
        key: 'aguaParaLavado',
        width: 30,
    },
    {
        title: 'Agua para cocción (litros por kilogramo de alimento)',
        dataIndex: 'aguaParaCoccion',
        key: 'aguaParaCoccion',
        width: 30,
    },
    {
        title: 'Lugar EGEI',
        dataIndex: 'lugarEGEI',
        key: 'lugarEGEI',
        width: 30,
    },
    {
        title: 'Cita EGEI',
        dataIndex: 'citaEGEI',
        key: 'citaEGEI',
        width: 30,
    },
    {
        title: 'Huella de carbono',
        dataIndex: 'huellaDeCarbono',
        key: 'huellaDeCarbono',
        width: 30,
    },
    {
        title: 'Huella ecológica',
        dataIndex: 'huellaEcologica',
        key: 'huellaEcologica',
        width: 30,
    },
    {
        title: 'Uso de suelo',
        dataIndex: 'usoDeSuelo',
        key: 'usoDeSuelo',
        width: 30,
    },
    {
        title: 'Energía Fósil',
        dataIndex: 'energiaFosil',
        key: 'energiaFosil',
        width: 30,
    },
    {
        title: 'Nitrogeno',
        dataIndex: 'nitrogeno',
        key: 'nitrogeno',
        width: 30,
    },
    {
        title: 'Fósforo ambiental',
        dataIndex: 'fosforoAmbiental',
        key: 'fosforoAmbiental',
        width: 30,
    },
    {
        title: 'Puntaje ecológico',
        dataIndex: 'puntajeEcologico',
        key: 'puntajeEcologico',
        width: 30,
    },
    {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
        width: 30,
    },
    {
        title: 'Lugar de compra',
        dataIndex: 'lugarDeCompra',
        key: 'lugarDeCompra',
        width: 30,
    },
    {
        title: 'Lugar de venta',
        dataIndex: 'lugarDeVenta',
        key: 'lugarDeVenta',
        width: 30,
    },
    {
        title: 'Fitoquímicos',
        dataIndex: 'fitoquimicos',
        key: 'fitoquimicos',
        width: 30,
    },
    {
        title: 'Polifenoles',
        dataIndex: 'polifenoles',
        key: 'polifenoles',
        width: 30,
    },
    {
        title: 'Antocianinas',
        dataIndex: 'antocianinas',
        key: 'antocianinas',
        width: 30,
    },
    {
        title: 'Taninos',
        dataIndex: 'taninos',
        key: 'taninos',
        width: 30,
    },
    {
        title: 'Isoflavonas',
        dataIndex: 'isoflavonas',
        key: 'isoflavonas',
        width: 30,
    },
    {
        title: 'Resveratrol',
        dataIndex: 'resveratrol',
        key: 'resveratrol',
        width: 30,
    },
    {
        title: 'Isotiocianatos',
        dataIndex: 'isotiocianatos',
        key: 'isotiocianatos',
        width: 30,
    },
    {
        title: 'Carotenoides',
        dataIndex: 'carotenoides',
        key: 'carotenoides',
        width: 30,
    },
    {
        title: 'Betacarotenos',
        dataIndex: 'betacarotenos',
        key: 'betacarotenos',
        width: 30,
    },
    {
        title: 'Licopeno',
        dataIndex: 'licopeno',
        key: 'licopeno',
        width: 30,
    },
    {
        title: 'Luteína',
        dataIndex: 'luteina',
        key: 'luteina',
        width: 30,
    },
    {
        title: 'Alicina',
        dataIndex: 'alicina',
        key: 'alicina',
        width: 30,
    },
    {
        title: 'Cafeína',
        dataIndex: 'cafeina',
        key: 'cafeina',
        width: 30,
    },
    {
        title: 'UFC',
        dataIndex: 'ufc',
        key: 'ufc',
        width: 30,
    },
    {
        title: 'Benzoato de sodio',
        dataIndex: 'benzoatoDeSodio',
        key: 'benzoatoDeSodio',
        width: 30,
    },
    {
        title: 'Polisorbato',
        dataIndex: 'polisorbato',
        key: 'polisorbato',
        width: 30,
    },
    {
        title: 'Azul brillante FCF o E 133',
        dataIndex: 'azulBrillanteFCFoE133',
        key: 'azulBrillanteFCFoE133',
        width: 30,
    },
    {
        title: 'Azorrubina o E 122',
        dataIndex: 'azurrubinaOE102',
        key: 'azurrubinaOE102',
        width: 30,
    },
    {
        title: 'Amarillo ocaso FDF o E 110',
        dataIndex: 'amarilloOcasoFDFoE110',
        key: 'amarilloOcasoFDFoE110',
        width: 30,
    },
    {
        title: 'Tartrazina o E 102',
        dataIndex: 'tartrazinaOE102',
        key: 'tartrazinaOE102',
        width: 30,
    },
    {
        title: 'Verde S o E 142',
        dataIndex: 'verdeSoE142',
        key: 'verdeSoE142',
        width: 30,
    },
    {
        title: 'Negro brillante BN o E 151',
        dataIndex: 'negroBrillanteBNoE151',
        key: 'negroBrillanteBNoE151',
        width: 30,
    },
    {
        title: 'Sucralosa',
        dataIndex: 'sucralosa',
        key: 'sucralosa',
        width: 30,
    },
    {
        title: 'Estevia',
        dataIndex: 'estevia',
        key: 'estevia',
        width: 30,
    },
    {
        title: 'Sacarina',
        dataIndex: 'sacarina',
        key: 'sacarina',
        width: 30,
    },
    {
        title: 'Aspartame',
        dataIndex: 'aspartame',
        key: 'aspartame',
        width: 30,
    },
    {
        title: 'Acesulfame k',
        dataIndex: 'acesulfameK',
        key: 'acesulfameK',
        width: 30,
    },
    {
        title: 'Carboxymethylcellulose',
        dataIndex: 'carboxymethylcellulose',
        key: 'carboxymethylcellulose',
        width: 30,
    },
    {
        title: 'Dióxido de titanio',
        dataIndex: 'dioxidoDeTitanio',
        key: 'dioxidoDeTitanio',
        width: 30,
    },
    {
        title: 'Monolaurato de glicerol',
        dataIndex: 'monolauratoDeGlicerol',
        key: 'monolauratoDeGlicerol',
        width: 30,
    },
];
