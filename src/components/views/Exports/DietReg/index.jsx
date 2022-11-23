import React, { useState, useEffect } from 'react';

import { message } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import ButtonsArea from '@/components/commons/ButtonsArea';

import { columns } from './data';
import { KG } from '../constants';

const DietReg = ({ selected = false, setLoading, users }) => {
    const [exportData, setExportData] = useState([]);
    const [fileReady, setFileReady] = useState(false);

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFileReady(false);
        };
    }, [selected]);

    const handleCancel = () => {
        setFileReady(false);
        setExportData([]);
        setLoading(false);
    };

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
                        const indexFood = elem.alimentos.findIndex(
                            (item) => item.id === food.id
                        );

                        const correctFood = elem.alimentos[indexFood];

                        const quantity = Number(correctFood.cantidad ?? 1); // Agregar la unidad de medida.
                        const factor = Number(
                            food.aspectoMedioambiental
                                .factorDeCorreccionParaHuellaHidricaYEGEI
                        );
                        const washing = Number(food.aspectoMedioambiental.aguaParaLavado);
                        const cooking = Number(food.aspectoMedioambiental.aguaParaCoccion);
                        const consumption = Number(food.cantidadAlimento.pesoNeto * quantity);

                        const washingValue = (consumption * washing) / KG;
                        const cookingValue = (consumption * cooking) / KG;

                        const idIndex = users.findIndex((e) => e === elem.usuario);

                        const newData = {
                            idParticipante: Number(idIndex + 1),
                            nombre: `${userInfo.nombre} ${userInfo.apellidoPaterno} ${userInfo.apellidoMaterno}`,
                            // Existen 2 posibles fechas aquí. La fecha en la que se creó el registro, o la fecha en la que dice que se realizó el consumo.
                            fechaRegistro: dayjs(elem.horario).format('DD/MM/YYYY'),
                            // horarioRegistro: dayjs(elem.horario).format('DD/MM/YYYY HH:mm'),
                            horario: dayjs(elem.horario).format('HH:mm'),
                            categoriaRegistro: elem.tipo,
                            idAlimento: food.id,
                            alimento: food.nombreAlimento,
                            cantidad: quantity,
                            gramos: Number(food.cantidadAlimento.pesoNeto * quantity),
                            energiaKcal: Number(
                                food.caloriasMacronutrientes.energia * quantity
                            ),
                            proteina: Number(
                                food.caloriasMacronutrientes.proteina * quantity
                            ),
                            lipidos: Number(food.caloriasMacronutrientes.lipidos * quantity),
                            agSaturados: Number(
                                food.caloriasMacronutrientes.agSaturados * quantity
                            ),
                            agMonoinsaturados: Number(
                                food.caloriasMacronutrientes.agMonoinsaturados * quantity
                            ),
                            agPoliinsaturados: Number(
                                food.caloriasMacronutrientes.adPoliinsaturados * quantity
                            ),
                            colesterol: Number(
                                food.caloriasMacronutrientes.colesterol * quantity
                            ),
                            omega3: Number(food.caloriasMacronutrientes.omega3 * quantity),
                            omega6: Number(food.caloriasMacronutrientes.omega6 * quantity),
                            omega9: Number(food.caloriasMacronutrientes.omega9 * quantity),
                            hidratosDeCarbono: Number(
                                food.caloriasMacronutrientes.hidratosDeCarbono * quantity
                            ),
                            fibra: Number(food.caloriasMacronutrientes.fibra * quantity),
                            fibraInsoluble: Number(
                                food.caloriasMacronutrientes.fibraInsoluble * quantity
                            ),
                            azucar: Number(food.caloriasMacronutrientes.azucar * quantity),
                            etanol: Number(food.caloriasMacronutrientes.etanol * quantity),
                            tiamina: Number(food.vitaminas.tiamina * quantity),
                            riboflavina: Number(food.vitaminas.riboflavin * quantity),
                            niacina: Number(food.vitaminas.niacina * quantity),
                            acidoPantotenico: Number(
                                food.vitaminas.acidoPantotenico * quantity
                            ),
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
                            indiceGlicemico: Number(
                                food.aspectoGlucemico.indiceGlicemico * quantity
                            ),
                            cargaGlicemica: Number(
                                food.aspectoGlucemico.cargaGlicemica * quantity
                            ),
                            factorDeCorreccionParaHuellaHidricaYEGEI: factor,
                            tipo: food.aspectoMedioambiental.tipo,
                            lugar: food.aspectoMedioambiental.lugar,
                            huellaHidricaTotal: Number(
                                Number(
                                    food.aspectoMedioambiental.huellaHidricaTotal * quantity
                                ) * factor
                            ),
                            huellaHidricaVerde: Number(
                                Number(
                                    food.aspectoMedioambiental.huellaHidricaVerde * quantity
                                ) * factor
                            ),
                            huellaHidricaAzul: Number(
                                Number(
                                    food.aspectoMedioambiental.huellaHidricaAzul * quantity
                                ) * factor
                            ),
                            huellaHidricaGris: Number(
                                Number(
                                    food.aspectoMedioambiental.huellaHidricaGris * quantity
                                ) * factor
                            ),
                            aguaParaLavado: washingValue, // revisar abajo
                            aguaParaCoccion: cookingValue,
                            lugarEGEI: food.aspectoMedioambiental.lugarEGEI,
                            citaEGEI: food.aspectoMedioambiental.citaEGEI,
                            huellaDeCarbono: Number(
                                food.aspectoMedioambiental.huellaCarbono * quantity
                            ),
                            huellaEcologica: Number(
                                food.aspectoMedioambiental.huellaEcologica * quantity
                            ),
                            usoDeSuelo: Number(
                                food.aspectoMedioambiental.usoDeSuelo * quantity
                            ),
                            energiaFosil: Number(
                                food.aspectoMedioambiental.energiaFosil * quantity
                            ),
                            nitrogeno: Number(
                                food.aspectoMedioambiental.nitrogeno * quantity
                            ),
                            fosforoAmbiental: Number(
                                food.aspectoMedioambiental.fosforo * quantity
                            ),
                            puntajeEcologico: Number(
                                food.aspectoMedioambiental.puntajeEcologico * quantity
                            ),
                            precio: food.aspectoEconomico.precio,
                            lugarDeCompra: food.aspectoEconomico.lugarDeCompra,
                            lugarDeVenta: food.aspectoEconomico.lugarDeVenta,
                            fitoquimicos: Number(
                                food.componentesBioactivos.fitoquimicos * quantity
                            ),
                            polifenoles: Number(
                                food.componentesBioactivos.polifenoles * quantity
                            ),
                            antocianinas: Number(
                                food.componentesBioactivos.antocianinas * quantity
                            ),
                            taninos: Number(food.componentesBioactivos.taninos * quantity),
                            isoflavonas: Number(
                                food.componentesBioactivos.isoflavonas * quantity
                            ),
                            resveratrol: Number(
                                food.componentesBioactivos.resveratrol * quantity
                            ),
                            isotiocianatos: Number(
                                food.componentesBioactivos.isotiocinatos * quantity
                            ),
                            carotenoides: Number(
                                food.componentesBioactivos.caretenoides * quantity
                            ),
                            betacarotenos: Number(
                                food.componentesBioactivos.betacarotenos * quantity
                            ),
                            licopeno: Number(food.componentesBioactivos.licopeno * quantity),
                            luteina: Number(food.componentesBioactivos.luteina * quantity),
                            alicina: Number(food.componentesBioactivos.alicina * quantity),
                            cafeina: Number(food.componentesBioactivos.cafeina * quantity),
                            ufc: Number(food.componentesBioactivos.UFC * quantity),
                            benzoatoDeSodio: Number(
                                food.aditivosAlimentarios.benzoatoDeSodio * quantity
                            ),
                            polisorbato: Number(
                                food.aditivosAlimentarios.polisorbato * quantity
                            ),
                            azulBrillanteFCFoE133: Number(
                                food.aditivosAlimentarios.azulBrillanteFCFoE133 * quantity
                            ),
                            azurrubinaOE102: Number(
                                food.aditivosAlimentarios.azurrubinaOE102 * quantity
                            ),
                            amarilloOcasoFDFoE110: Number(
                                food.aditivosAlimentarios.amarilloOcasoFDFoE110 * quantity
                            ),
                            tartrazinaOE102: Number(
                                food.aditivosAlimentarios.tartrazinaOE102 * quantity
                            ),
                            verdeSoE142: Number(
                                food.aditivosAlimentarios.verdeSoE142 * quantity
                            ),
                            negroBrillanteBNoE151: Number(
                                food.aditivosAlimentarios.negroBrillanteBNoE151 * quantity
                            ),
                            sucralosa: Number(food.aditivosAlimentarios.sucralosa * quantity),
                            estevia: Number(food.aditivosAlimentarios.estevia * quantity),
                            sacarina: Number(food.aditivosAlimentarios.sacarina * quantity),
                            aspartame: Number(food.aditivosAlimentarios.aspartame * quantity),
                            acesulfameK: Number(
                                food.aditivosAlimentarios.acesulfameK * quantity
                            ),
                            carboxymethylcellulose: Number(
                                food.aditivosAlimentarios.carboxymethylcellulose * quantity
                            ),
                            dioxidoDeTitanio: Number(
                                food.aditivosAlimentarios.dioxidoDeTitanio * quantity
                            ),
                            monolauratoDeGlicerol: Number(
                                food.aditivosAlimentarios.monolauratoDeGlicerol * quantity
                            ),
                        };

                        setExportData([...exportedData, newData]);
                        exportedData.push(newData);
                        console.log(`Food[${foodIndex}]-Data[${dataIndex}]`);
                    });

                    if (dataIndex === data.length - 1) {
                        setTimeout(() => {
                            setFileReady(true);
                            setLoading(false);
                        }, 1000);
                    }
                });
        } catch (error) {
            handleCancel();
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
            handleCancel();
            message.error('Error al obtener los datos de alimentos');
            console.groupCollapsed('[Exports] getFoodData');
            console.error(error);
            console.groupEnd();
        }
    };

    const getUserData = async (id) => {
        try {
            const { data } = await apiURL.get(
                `/informacionUsuarios/individual?usuario=${id}`
            );

            return data;
        } catch (error) {
            handleCancel();
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
                fileName: `Registros dietéticos total ${dayjs(new Date()).format(
                    'DD-MM-YYYY'
                )}`,
            }}
        />
    );
};

export default DietReg;
