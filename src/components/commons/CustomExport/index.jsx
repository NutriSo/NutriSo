import React, { useEffect, useState } from 'react';
import { CSVDownload } from 'react-csv';

import { isEmptyArray } from '../../../utils';

const CustomExport = ({ dataSource, columns, fileReady, fileName }) => {
    if (!dataSource && !fileReady) return <div />;

    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        if (!dataSource && !fileReady) {
            return;
        }

        const data = [...dataSource];

        data.sort((a, b) => {
            if (a[3] > b[3]) return 1;
            if (a[3] < b[3]) return -1;
            return 0;
        });

        data.unshift(columns);

        setCsvData(data);
    }, []);

    if (isEmptyArray(csvData)) return <div />;

    return <CSVDownload data={csvData} filename={fileName} />;
};

export default CustomExport;
