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
import groups from '../data/excelGroups';
import keys from '../data/excelKeys';
import {
    getArrayByGroups,
    normalizeArrayToExport,
    getCharacteristicColumns,
    normalizeDataByGroupDTO,
    normalizeSumByGroupDTO,
} from '../utils';
import { KG } from '../constants';
import { isEmptyObject } from '../../../../utils';

const Groups = ({ selected = false, setLoading }) => {
    const [columns, setColumns] = useState([
        ...baseColumns,
        ...extraColumns,
        ...caloriasMacronutrientes,
        ...vitaminas,
        ...minerales,
        ...aspectoGlucemico,
        ...aspectosMedioambientales,
        ...aspectosEconomicos,
        ...componentesBioactivos,
        ...aditivosAlimentarios,
    ]);
    const [foodReady, setFoodReady] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [fileReady, setFileReady] = useState(false);
    const [groupState, setGroupsState] = useState(
        getArrayByGroups(groups[keys.grupoExportable])
    );

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFileReady(false);
        };
    }, [selected]);

    useEffect(() => {
        foodReady && createExportData();
    }, [foodReady]);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };

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

                    const newData = {
                        idParticipante: elem.usuario,
                        idRegistro: elem.id,
                        fechaRegistro: date,
                    };

                    const isPartOfGroup = groups[keys.grupoExportable].includes(
                        food.grupoExportable
                    );

                    if (isPartOfGroup) {
                        const newState = normalizeArrayToExport({
                            state: groupState,
                            group: food.grupoExportable,
                            food,
                        });
                        setGroupsState(newState);
                    }
                    setUsersData([...exportedData, newData]);
                    exportedData.push(newData);
                });
                if (dataIndex === data.length - 1) {
                    setTimeout(() => {
                        setFoodReady(true);
                    }, 1000);
                }
                // if (dataIndex === data.length - 1) {
                //     setTimeout(() => {
                //         onFileReady();
                //     }, 1000);
                // }
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

    const createExportData = () => {
        console.log('Armando los datos de exportación...');
        try {
            groupState.forEach((elem, index) => {
                const { id: grupo, values: alimentosPorGrupo } = elem;

                let results = {};

                alimentosPorGrupo.forEach((food) => {
                    const quantity = Number(food.cantidad ?? 1);
                    const newState = normalizeDataByGroupDTO(food, quantity);
                    results = normalizeSumByGroupDTO(results, newState);
                });

                if (!isEmptyObject(results)) setExportData([...exportData, results]);
            });
        } catch (error) {
            handleCancel();
            message.error('Ocurrió un error al armar los datos para exportar');
            console.groupCollapsed('[Exports] createExportData');
            console.error(error);
            console.groupEnd();
        }
    };
    console.log({ exportData, usersData });
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
