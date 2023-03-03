import React, { useState, useEffect } from 'react';

import { message } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import ButtonsArea from '@/components/commons/ButtonsArea';
import {
    capitilizeWord,
    isEmptyString,
    isInvalidElem,
    getCurrentAge,
    returnJoinedArray,
    returnJoinedArrayByKey,
    normalize24HoursTo12Hours,
    isEmptyArray,
} from '@/utils';

import caseNormalizeRows from './utils/caseNormalizeRows';
import { columns } from './data';

const Demographics = ({ selected = false, setLoading }) => {
    const [exportData, setExportData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [fileReady, setFileReady] = useState(false);

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFileReady(false);
        };
    }, [selected]);

    const getExportData = async () => {
        try {
            const { data } = await apiURL.get('/demograficos');
            setInitialData(data);
            console.log(caseNormalizeRows(data));
        } catch (error) {
            setFileReady(false);
            console.groupCollapsed('[Demographics.jsx]');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 1');
        }
    };

    return <div />;

    return (
        <ButtonsArea
            fileReady={fileReady}
            xlsxData={{
                columns: columns,
                data: exportData,
                fileName: `Datos demográficos total ${dayjs(new Date()).format(
                    'DD-MM-YYYY'
                )}`,
            }}
        />
    );
};

export default Demographics;
