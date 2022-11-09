import React, { useState, useEffect } from 'react';
import apiURL from '@/axios/axiosConfig';

const Yesterday = ({selected = false, setLoading}) => {
  
    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };

    const handleCancel = () => {
        setFileReady(false);
        setExportData(null);
        setLoading(false);
    };

    useEffect(() => {
        selected && getExportData();
        return () => {
            setLoading(false);
        };
    }, [selected]);


    const getExportData = async () => {
        const { data } = await apiURL.get('alimentacionUsuarios/yesterday');
        console.log(data);

        data.forEach(row => {
            const {cenaAyer, colacionAyer,colacion2Ayer} = row;
            const rows = [];

        const objToPush = {
            ...cenaAyer[0],
            ...colacionAyer[0],
            ...colacion2Ayer[0],
        };

        rows.push(objToPush);
        });
        console.log(rows);


    };

    return null;
 };

 export default Yesterday;