import React, { useState, useEffect } from 'react';
import apiURL from '@/axios/axiosConfig';
import { isEmptyArray } from '@/utils';
import dayjs from 'dayjs';
import { message } from 'antd';
import { baseColumnsYesterday } from '../data';
import CustomExport from '@/components/commons/CustomExport';
import * as calories from '../data/calories';
import * as vitamins from '../data/vitamins';
import * as minerals from '../data/minerals';
import * as glycemic from '../data/glycemic';
import * as environmental from '../data/environmental';
import * as economic from '../data/economic';
import * as bioactives from '../data/bioactives';
import * as additives from '../data/additives';

import { getFinalColumns, normalizeYesterdayByQuantity } from '../utils';

const Yesterday = ({ selected = false, setLoading }) => {
    const [exportData, setExportData] = useState(null);
    const [fileReady, setFileReady] = useState(false);

    const [columns, setColumns] = useState([
        ...baseColumnsYesterday,
        ...calories.caloriasMacronutrientes0,
        ...vitamins.vitaminas0,
        ...minerals.minerales0,
        ...glycemic.aspectoGlucemico0,
        ...environmental.aspectosMedioambientales0,
        ...economic.aspectosEconomicos0,
        ...bioactives.componentesBioactivos0,
        ...additives.aditivosAlimentarios0,
    ]);
    const [yesterday, setYesterday] = useState(null);

    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };
    useEffect(() => {
        selected && getExportData();
    }, [selected]);

    const handleCancel = () => {
        setFileReady(false);
        setExportData(null);
        setLoading(false);
    };

    useEffect(() => {
        yesterday && createExportData();
    }, [yesterday]);

    const getExportData = async () => {
        console.log('Obteniendo datos de exportación...');
        try {
            const rows = [];

            const objPush = [];
            const { data } = await apiURL.get('alimentacionUsuarios/yesterday');

            if (data?.length <= 0) {
                message.error('No hay datos para exportar');
                handleCancel();
                return;
            }

            data.forEach((row) => {
                const {
                    createdAt,
                    usuario,
                    cenaAyer,
                    colacion1Ayer,
                    colacion2Ayer,
                    comidaAyer,
                    desayunoAyer,
                } = row;

                cenaAyer.forEach((alimentos) => {
                    const { id, cantidad, nombre } = alimentos;

                    if (id) {
                        const newArray1 = [
                            usuario,
                            id.id, //idAlimento
                            nombre, //nombreAlimento
                            cantidad, //cantidadAlimento
                            id.cantidadAlimento.pesoNeto, //cantidadAlimento.pesoNetoAlimento
                            dayjs(createdAt).format('DD/MM/YYYY'),
                            ...normalizeYesterdayByQuantity(id),
                        ];
                        objPush.push(newArray1);
                    }
                });
                colacion1Ayer.forEach((alimentos) => {
                    const { id, cantidad, nombre } = alimentos;
                    if (id) {
                        const newArray2 = [
                            usuario,
                            id.id, //idAlimento
                            nombre, //nombreAlimento
                            cantidad, //cantidadAlimento
                            id.cantidadAlimento.pesoNeto, //cantidadAlimento.pesoNetoAlimento
                            dayjs(createdAt).format('DD/MM/YYYY'),
                            ...normalizeYesterdayByQuantity(id),
                        ];
                        objPush.push(newArray2);
                    }
                });
                colacion2Ayer.forEach((alimentos) => {
                    const { id, cantidad, nombre } = alimentos;
                    if (id) {
                        const newArray3 = [
                            usuario,
                            id.id, //idAlimento
                            nombre, //nombreAlimento
                            cantidad, //cantidadAlimento
                            id.cantidadAlimento.pesoNeto, //cantidadAlimento.pesoNetoAlimento
                            dayjs(createdAt).format('DD/MM/YYYY'),
                            ...normalizeYesterdayByQuantity(id),
                        ];
                        objPush.push(newArray3);
                    }
                });
                comidaAyer.forEach((alimentos) => {
                    const { id, cantidad, nombre } = alimentos;
                    if (id) {
                        const newArray4 = [
                            usuario,
                            id.id, //idAlimento
                            nombre, //nombreAlimento
                            cantidad, //cantidadAlimento
                            id.cantidadAlimento.pesoNeto, //cantidadAlimento.pesoNetoAlimento
                            dayjs(createdAt).format('DD/MM/YYYY'),
                            ...normalizeYesterdayByQuantity(id),
                        ];
                        objPush.push(newArray4);
                    }
                });
                desayunoAyer.forEach((alimentos) => {
                    const { id, cantidad, nombre } = alimentos;
                    //console.log({id});
                    if (id) {
                        const newArray5 = [
                            usuario,
                            id.id, //idAlimento
                            nombre, //nombreAlimento
                            cantidad, //cantidadAlimento
                            id.cantidadAlimento.pesoNeto, //cantidadAlimento.pesoNetoAlimento
                            dayjs(createdAt).format('DD/MM/YYYY'),
                            ...normalizeYesterdayByQuantity(id),
                        ];
                        objPush.push(newArray5);
                    }
                });
            });

            objPush.forEach((row) => {
                rows.push(row);
            });

            setYesterday(rows);
            console.log(rows);
        } catch (error) {
            message.error('Error al obtener los datos');
            console.groupCollapsed('[Exports] getExportData');
            console.error(error);
            console.groupEnd();
        }
    };

    const createExportData = () => {
        console.log('Armando los datos de exportación...');
        try {
            if (isEmptyArray(yesterday)) {
                message.info('No hay datos para exportar');
                handleCancel();
                return;
            }

            const cvsRows = yesterday;

            const finalColumns = getFinalColumns(columns, 1);

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
            fileName={`Yesterday ${dayjs(new Date()).format('DD-MM-YYYY')}`}
        />
    );
};

export default Yesterday;
