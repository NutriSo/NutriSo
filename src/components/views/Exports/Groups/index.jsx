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
    getRowValues,
    getDetailsByGroups,
    generateCsvRows,
} from '../utils';

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
            const groupsAux = [];

            const res = data.map(async (elem, dataIndex) => {
                const { usuario, horario, alimentos, id } = elem;

                const aux = alimentos.map(async (el) => {
                    const res = await getFoodData(el.id);

                    return {
                        ...res,
                        idRegistro: id,
                        usuario,
                        horario,
                        cantidad: el.cantidad,
                    };
                });

                return await Promise.all(aux);
            });

            const alimentos = await Promise.all(res);
            const foodArrayInfo = [...alimentos.flat(2)];

            foodArrayInfo.forEach((food) => {
                const { usuario, horario, idRegistro, grupoExportable } = food;

                const isPartOfGroup = groups[keys.grupoExportable].includes(grupoExportable);

                if (!isPartOfGroup) return;

                const date = dayjs(horario).format('DD/MM/YYYY');

                const newData = {
                    idRegistro,
                    idParticipante: usuario,
                    fechaRegistro: date,
                };

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
                groupsAux.push(newState);
            });

            setUsersData(usersAux);
            setFoodReady(true);
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

            const unified = rows.map((elem) => {
                const { values, ...rest } = elem;

                const newValues = values.reduce((group, value) => {
                    const { grupo } = value;

                    group[grupo] = group[grupo] ?? [];
                    group[grupo].push(value);

                    return group;
                }, {});

                return { ...rest, values: newValues };
            });
            console.log({ rows, unified });
            //const exportedData = getDetailsByGroups(rows);
            // const hola = generateCsvRows(exportedData);
            //  console.log({ hola, usersData, rows, testeando });
            // setExportData(exportedData);
            // setTimeout(() => {
            //     onFileReady();
            // }, 1000);
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
