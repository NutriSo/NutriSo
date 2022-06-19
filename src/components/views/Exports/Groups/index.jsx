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
    removeEmptyValues,
    getRowValues,
    unifyArrays,
    getFoodRow,
} from '../utils';
import { KG } from '../constants';
import { isEmptyObject, removeDuplicatedByKey, waitFor } from '../../../../utils';

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
    const [exportData, setExportData] = useState(null);
    const [fileReady, setFileReady] = useState(false);
    const [groupState, setGroupsState] = useState([]);

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
        setExportData(null);
        setLoading(false);
    };

    const getExportData = async () => {
        console.log('Obteniendo datos de exportación...');
        try {
            const { data } = await apiURL.get('registroDietetico');

            if (data?.length <= 0) {
                message.error('No hay datos para exportar');
                handleCancel();
                return;
            }

            const usersAux = [];

            data.map(async (elem, dataIndex) => {
                const { usuario, horario, alimentos, id } = elem;

                const foodArrayInfo = await Promise.all(
                    alimentos.map(async (el) => {
                        const res = await getFoodData(el.id);

                        return {
                            ...res,
                            cantidad: el.cantidad,
                        };
                    })
                );
                const date = dayjs(horario).format('DD/MM/YYYY');

                const newData = {
                    idParticipante: usuario,
                    idRegistro: id,
                    fechaRegistro: date,
                };

                foodArrayInfo.forEach((food) => {
                    const { grupoExportable } = food;

                    const isPartOfGroup =
                        groups[keys.grupoExportable].includes(grupoExportable);

                    if (!isPartOfGroup) return;

                    const newState = normalizeArrayToExport({
                        state: getArrayByGroups(groups[keys.grupoExportable]),
                        group: grupoExportable,
                        food,
                    });
                    const auxSuper = {
                        ...newData,
                        ...newState,
                    };
                    usersAux.push(auxSuper);
                    setGroupsState((s) => [...s, newState]);
                });
                // if (dataIndex === data.length - 1) {
                //     setTimeout(() => {
                //         setFoodReady(true);
                //     }, 2000);
                // }
                // if (dataIndex === data.length - 1) {
                //     setTimeout(() => {
                //         onFileReady();
                //     }, 1000);
                // }
            });

            setTimeout(() => {
                setUsersData(usersAux);
                setFoodReady(true);
            }, 2000);
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
            const rows = getRowValues(usersData);
            const exportedData = getFoodRow(rows);

            setExportData(exportedData);
            setTimeout(() => {
                onFileReady();
            }, 1000);
        } catch (error) {
            handleCancel();
            message.error('Ocurrió un error al armar los datos para exportar');
            console.groupCollapsed('[Exports] createExportData');
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
                fileName: `Grupos ${dayjs(new Date()).format('DD-MM-YYYY')}`,
            }}
        />
    );
};

export default Groups;
