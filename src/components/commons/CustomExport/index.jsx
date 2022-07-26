import React from 'react';
import { CSVDownload } from 'react-csv';

const CustomExport = ({ dataSource, fileReady }) => {
    if (!dataSource && !fileReady) return <div />;
    console.log({ dataSource, fileReady });

    return <div />;
    return <CSVDownload data={dataSource} />;
};

export default CustomExport;
