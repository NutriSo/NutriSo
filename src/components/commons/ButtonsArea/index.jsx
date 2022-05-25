import { useEffect } from 'react';

import { exportXlsx } from '../../../utils/exportXlsx';

import { Button } from 'antd';

const ButtonsArea = ({ xlsxData, fileReady }) => {
    useEffect(() => {
        if (fileReady) {
            //console.log(xlsxData);
            console.log('ready');
            excelDataSource();
        }
    }, [fileReady === true]);

    const excelDataSource = () => {
        if (xlsxData) {
            exportXlsx({ ...xlsxData });
        }
    };

    return <Button onClick={() => excelDataSource()}>Exportar archivo</Button>;
};

export default ButtonsArea;
