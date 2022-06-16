import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';

import { message } from 'antd';
import dayjs from 'dayjs';

import ButtonsArea from '../../../commons/ButtonsArea';
import {
    baseColumns,
    caloriasMacronutrientes,
    vitaminas,
    minerales,
    aspectoGlucemico,
    aspectosMedioambientales,
    aspectosEconomicos,
    componentesBioactivos,
    aditivosAlimentarios,
    extraColumns,
} from './data';
import { KG } from '../constants';

const Groups = ({ selected = false, setLoading }) => {
    const [columns, setColumns] = useState([...baseColumns, ...extraColumns]);
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

            if (data?.length <= 0) {
                message.error('No hay datos para exportar');
                setFileReady(false);
                return;
            }

            data.map(async (elem, dataIndex) => {
                const foodArrayInfo = await Promise.all(
                    elem.alimentos.map(async ({ id }) => await getFoodData(id))
                );

                const date = dayjs(elem.horario).format('DD/MM/YYYY');

                foodArrayInfo.forEach((food, foodIndex) => {
                    const indexFood = elem.alimentos.findIndex((item) => item.id === food.id);

                    const correctFood = elem.alimentos[indexFood];

                    const quantity = Number(correctFood.cantidad ?? 1);
                    const factor = Number(
                        food.aspectoMedioambiental.factorDeCorreccionParaHuellaHidricaYEGEI
                    );
                    const washing = Number(food.aspectoMedioambiental.aguaParaLavado);
                    const cooking = Number(food.aspectoMedioambiental.aguaParaCoccion);
                    const consumption = Number(food.cantidadAlimento.pesoNeto * quantity);

                    const washingValue = (consumption * washing) / KG;
                    const cookingValue = (consumption * cooking) / KG;

                    const newData = {
                        idParticipante: elem.usuario,
                        idRegistro: elem.id,
                        fechaRegistro: date,
                    };
                    setColumns((s) => [
                        ...s,
                        ...caloriasMacronutrientes,
                        ...vitaminas,
                        ...minerales,
                        ...aspectoGlucemico,
                        ...aspectosMedioambientales,
                        ...aspectosEconomicos,
                        ...componentesBioactivos,
                        ...aditivosAlimentarios,
                        ...extraColumns,
                    ]);
                    setExportData([...exportedData, newData]);
                    exportedData.push(newData);
                });

                if (dataIndex === data.length - 1) {
                    // setFileReady(true);
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
    console.log(columns);
    return (
        <ButtonsArea
            fileReady={fileReady}
            xlsxData={{
                columns: columns,
                data: exportData,
                fileName: `Grupos ${dayjs(new Date()).format('DD-MM-YYYY')}`,
            }}
        />
    );
};

export default Groups;
