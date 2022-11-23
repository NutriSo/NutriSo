import React, { useState, useEffect } from 'react';
import { message, Progress } from 'antd';

import apiURL from '@/axios/axiosConfig';
import ImportData from '@/components/commons/ImportData';

const EquivalencesImport = () => {
    const [fileData, setFileData] = useState([]);
    const [percent, setPercent] = useState(0);
    const [foods, setFoods] = useState([]);

    let currentIndex = 0;

    const onSuccess = (data) => {
        setFileData(data);
    };

    const handlePost = async (food, index) => {
        try {
            const response = await apiURL.post('/equivalencias', food);

            if (response.data.message === 'El alimento ya existe') {
                await handlePatch(food, index);
            }

            if (response.status === 200) {
                console.log(`[${index}] STATUS: ${response.status}`);
                currentIndex = index > currentIndex ? index : currentIndex;
                setPercent(
                    currentIndex === 0 ? 100 : Math.ceil((currentIndex / foods.length) * 100)
                );
            }
        } catch (error) {
            return message.error(`Error al importar la equivalencia`);
        }
    };

    const handlePatch = async (food, index) => {
        try {
            const response = await apiURL.patch('/equivalencias', food);
            if (response.status === 200) {
                console.log(`[${index}] STATUS: ${response.status}`);
                currentIndex = index > currentIndex ? index : currentIndex;
                setPercent(
                    currentIndex === 0 ? 100 : Math.ceil((currentIndex / foods.length) * 100)
                );
            }
        } catch (error) {
            return message.error(`Error al importar la equivalencia  [actualización]`);
        }
    };

    const handleImport = () => {
        setPercent(0);

        fileData.map((row, index) => {
            const rowValues = Object.values(row);

            const [name, quantity, unit, netWeight, group] = rowValues;

            const data = {
                alimento: name,
                cantidadSugerida: quantity,
                unidad: unit,
                pesoNeto: netWeight,
                grupoAlimento: group,
            };

            handlePost(data, index);
        });
    };

    useEffect(() => {
        fileData.length > 0 && handleImport();

        return () => {
            currentIndex = 0;
            setPercent(0);
            setFoods([]);
        };
    }, [fileData.length]);

    return (
        <div className='foodContainer'>
            <ImportData onSuccess={onSuccess} className='item' />
            {percent === 100 && (
                <Progress
                    type='circle'
                    percent={percent}
                    format={() => '¡Éxito!'}
                    className='item'
                />
            )}
            {percent !== 100 && <Progress type='circle' percent={percent} className='item' />}
        </div>
    );
};

export default EquivalencesImport;
