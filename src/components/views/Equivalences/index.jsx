/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { message } from 'antd';

import apiURL from '../../../axios/axiosConfig';

import ButtonsArea from '../../commons/ButtonsArea';
import EquivalencesTable from './EquivalencesTable';
import Loading from '../../commons/Loading';

import './Equivalences.scss';

const Equivalences = () => {
    const [loading, setLoading] = useState(false);
    const [equivalences, setEquivalences] = useState([]);
    const [xlsxData, setXlsxData] = useState([]);
    const [xlsxColumns, setXlsxColumns] = useState([]);

    useEffect(() => {
        fetchEquivalences();
        return () => {
            setEquivalences([]);
        };
    }, []);

    useEffect(() => {
        if (!!equivalences.length) {
            const _data = equivalences.map((item) => ({
                alimento: (item?.alimento && item.alimento) || 'N/A',
                cantidadSugerida: (item?.cantidadSugerida && item.cantidadSugerida) || 'N/A',
                unidad: (item?.unidad && item.unidad) || 'N/A',
                pesoNetoKg: (item?.pesoNetoKg && item?.pesoNetoKg) || 'N/A',
            }));
            const _columns = columns.filter((item) => !['actions', 'pdf'].includes(item.key));
            setXlsxData(_data);
            setXlsxColumns(_columns);
        }
        return () => {
            setXlsxData([]);
            setXlsxColumns([]);
        };
    }, [equivalences]);

    const fetchEquivalences = async () => {
        try {
            setLoading(true);
            const { data } = await apiURL.get('/equivalencias');
            setEquivalences(data);
            setLoading(false);
        } catch (error) {
            message.error('Ocurrió un error, intenta actualizando la página');
            setLoading(false);
        }
    };

    return (
        <div className='equivalences-container'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <h1>Equivalencias</h1>
                <ButtonsArea
                    xlsxData={{
                        columns: xlsxColumns,
                        data: xlsxData,
                        fileName: 'Equivalencias',
                    }}
                />
            </div>
            {loading && <Loading variant='none' />}
            <div className='table-content'>
                <EquivalencesTable columns={columns} data={equivalences} />
            </div>
        </div>
    );
};

export default Equivalences;

export const columns = [
    {
        title: 'Alimento',
        dataIndex: 'alimento',
        width: 50,
        key: 'alimento',
        sorter: (a, b) => {
            return a.alimento.localeCompare(b.alimento);
        },
    },
    {
        title: 'Cantidad sugerida',
        dataIndex: 'cantidadSugerida',
        width: 50,
        key: 'cantidadSugerida',
    },
    {
        title: 'Unidad',
        dataIndex: 'unidad',
        width: 30,
        key: 'unidad',
        sorter: (a, b) => a.unidad.length - b.unidad.length,
    },
    {
        title: 'Peso neto (kg)',
        dataIndex: 'pesoNetoKg',
        width: 50,
        key: 'pesoNetoKg',
        sorter: (a, b) => a.pesoNetoKg - b.pesoNetoKg,
    },
];
