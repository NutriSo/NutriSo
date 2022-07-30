import { useEffect } from 'react';

import { Button } from 'antd';

import { exportXlsx } from '@/utils/exportXlsx';

const ButtonsArea = ({ xlsxData, fileReady }) => {
    useEffect(() => {
        if (fileReady) {
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
