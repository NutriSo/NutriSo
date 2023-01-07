import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';

import CustomExport from '@/components/commons/CustomExport';
import { isEmptyArray } from '@/utils';

import useData from '../hooks/useData';
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
import keys from '../data/excelKeys';
import {
    getRowValues,
    generateCsvRows,
    unifyGroups,
    generateFinalCsvRows,
    getFinalColumns,
    normalizeDataByDateAndUser,
} from '../utils';

const SubGroup = ({ selected = false, setLoading, users, groupNames }) => {
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
    const [exportData, setExportData] = useState(null);
    const [fileReady, setFileReady] = useState(false);

    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };

    const handleCancel = () => {
        setFileReady(false);
        setExportData(null);
        setLoading(false);
    };

    const useDataHook = useData({
        selected,
        type: keys.subGrupoExportable,
        onCancel: handleCancel,
    });

    useEffect(() => {
        return () => {
            setFileReady(false);
        };
    }, [selected]);

    useEffect(() => {
        if (!useDataHook.foodReady) {
            return;
        }

        createExportData();
    }, [useDataHook.foodReady]);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    const createExportData = () => {
        console.log('Armando los datos de exportación...');
        try {
            const rows = getRowValues(useDataHook.exportData);
            const unified = unifyGroups(rows);

            if (isEmptyArray(unified)) {
                message.info('No hay datos para exportar');
                handleCancel();
                return;
            }

            const totales = normalizeDataByDateAndUser(unified);
            const csvRowsPreview = generateCsvRows(totales, 2);
            const cvsRows = generateFinalCsvRows(csvRowsPreview, groupNames, users);
            const finalColumns = getFinalColumns(columns, groupNames.length);

            setColumns(finalColumns);
            setExportData(cvsRows);
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
        <CustomExport
            dataSource={exportData}
            columns={columns}
            fileReady={fileReady}
            fileName={`Sub-Grupos ${dayjs(new Date()).format('DD-MM-YYYY')}`}
        />
    );
};

export default SubGroup;
