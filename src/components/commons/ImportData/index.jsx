import React from 'react';

import * as XLSX from 'xlsx';

import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import DataLayout from '../../layouts/DataLayout';

import './ImportData.scss';

const UploadXlsx = ({ setData, onSuccess }) => {
    const modalInfo = Modal;
    const modalSuccess = Modal;
    const modalError = Modal;

    const fileSuccess = () => {
        modalInfo.destroyAll();
        modalSuccess.success({
            title: 'Exito',
            content: 'Archivo cargado correctamente.',
        });
    };

    const fileError = (error) => {
        modalInfo.destroyAll();
        modalError.error({
            title: 'Error',
            content: error,
        });
    };

    const readFileToRender = async (file) => {
        const readPromise = new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'buffer' });
                    const firstWorksheet =
                        workbook.Sheets[workbook.SheetNames[0]];
                    const dataTable = XLSX.utils.sheet_to_json(firstWorksheet);
                    if (dataTable.length) {
                        resolve(dataTable);
                    }
                    reject(
                        'No se detectó ninguna hoja válida, revisa el documento.'
                    );
                };
            } catch (error) {
                reject('No se pudo cargar el archivo, revisa el formato.');
            }
        });
        readPromise
            .then(async (data) => {
                if (setData) {
                    setData(data);
                }
                if (onSuccess) {
                    await onSuccess(data);
                    fileSuccess();
                }
            })
            .catch((error) => {
                fileError(error);
            });
    };

    const startUpload = (file) => {
        modalInfo.info({
            title: 'Cargando archivo',
            content: 'Espera un momento, estamos cargando la información.',
            okButtonProps: { loading: true },
            icon: <LoadingOutlined />,
        });
        setTimeout(async () => {
            await readFileToRender(file);
        }, 300);
    };

    const confirmFileReplace = (file) => {
        Modal.confirm({
            title: 'Reemplazar archivo',
            content: 'Se eliminarán los datos actuales, ¿Continuar?',
            onOk: () => startUpload(file),
        });
    };

    return (
        <>
            <label htmlFor='xlsxFiles' className='ant-btn'>
                Importar archivo
            </label>
            <input
                id='xlsxFiles'
                type='file'
                className='hide'
                onChange={(e) => {
                    confirmFileReplace(e.target.files[0]);
                }}
            />
        </>
    );
};

export default UploadXlsx;
