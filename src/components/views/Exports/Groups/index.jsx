import React, { useState, useEffect } from 'react';

import { message } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import { isEmptyArray } from '@/utils';
import CustomExport from '@/components/commons/CustomExport';

import { baseColumns } from '../data';
import * as calories from '../data/calories';
import * as vitamins from '../data/vitamins';
import * as minerals from '../data/minerals';
import * as glycemic from '../data/glycemic';
import * as environmental from '../data/environmental';
import * as economic from '../data/economic';
import * as bioactives from '../data/bioactives';
import * as additives from '../data/additives';
import * as extraColumns2 from '../data/extraColumns';
import * as food from '../data/foodGroups';
import groups from '../data/excelGroups';
import keys from '../data/excelKeys';
import {
    getArrayByGroups,
    normalizeArrayToExport,
    getRowValues,
    generateCsvRows,
    unifyGroups,
    generateFinalCsvRows,
    getFinalColumns,
} from '../utils';

const Groups = ({ selected = false, setLoading }) => {
    const [columns, setColumns] = useState([
        ...baseColumns,
        ...food.groupColumns0,
        ...extraColumns2.extraColumns0,
        ...calories.caloriasMacronutrientes0,
        ...vitamins.vitaminas0,
        ...minerals.minerales0,
        ...glycemic.aspectoGlucemico0,
        ...environmental.aspectosMedioambientales0,
        ...economic.aspectosEconomicos0,
        ...bioactives.componentesBioactivos0,
        ...additives.aditivosAlimentarios0,
    ]);
    const [foodReady, setFoodReady] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [exportData, setExportData] = useState(null);
    const [fileReady, setFileReady] = useState(false);

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
            const foods = [];
            const usersAux = [];
            console.log(foods);
            console.log(usersAux);
            const { data } = await apiURL.get('registroDietetico/exports');

            if (data?.length <= 0) {
                message.error('No hay datos para exportar');
                handleCancel();
                return;
            }
            data.forEach((elem) => {
                const { alimentos, horario, id, usuario } = elem;

                alimentos.forEach((food) =>
                    foods.push({
                        ...food.id,
                        cantidad: food.cantidad,
                        horario,
                        idRegistro: id,
                        usuario,
                    })
                );
            });

            foods.forEach((food) => {
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

    const createExportData = () => {
        console.log('Armando los datos de exportación...');

        try {
            const rows = getRowValues(usersData);
            const unified = unifyGroups(rows);
            if (isEmptyArray(unified)) {
                message.info('No hay datos para exportar');
                handleCancel();
                return;
            }

            const csvRowsPreview = generateCsvRows(unified);
            const cvsRows = generateFinalCsvRows(csvRowsPreview, keys.grupoExportable);
            const finalColumns = getFinalColumns(
                columns,
                groups[keys.grupoExportable].length
            );
            console.log({ unified, csvRowsPreview, cvsRows });
            // setColumns(finalColumns);
            // setExportData(cvsRows);
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

    return <div />;

    return (
        <CustomExport
            dataSource={exportData}
            columns={columns}
            fileReady={fileReady}
            fileName={`Grupos ${dayjs(new Date()).format('DD-MM-YYYY')}`}
        />
    );
};

export default Groups;
