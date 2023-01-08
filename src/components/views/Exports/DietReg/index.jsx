import React, { useState, useEffect } from 'react';

import { message } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import ButtonsArea from '@/components/commons/ButtonsArea';

import { normalizeResponse } from './utils';
import { columns } from './data';

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

            const normalizedData = normalizeResponse(data, users);

            setExportData(normalizedData);
            setTimeout(() => {
                setFileReady(true);
                setLoading(false);
            }, 1000);
        } catch (error) {
            handleCancel();
            message.error('Error al obtener los datos');
            console.groupCollapsed('[Exports] getExportData');
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
