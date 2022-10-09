import { useState, useEffect } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import { isEmptyArray } from '@/utils';
import { normalizeArrayToExport, getArrayByGroups } from '../../utils';
import groups from '../../data/excelGroups';

const useData = ({ selected, type, onCancel }) => {
    const [exportData, setExportData] = useState(null);
    const [foodReady, setFoodReady] = useState(false);

    const getExportData = async () => {
        console.log('Obteniendo datos de exportación...');
        try {
            const foods = [];
            const usersAux = [];

            const { data } = await apiURL.get('registroDietetico/exports');

            if (isEmptyArray(data)) {
                message.info('No hay datos para exportar');
                onCancel();
                return;
            }

            data.forEach((elem) => {
                const { alimentos, horario, id, usuario } = elem;

                alimentos.forEach((food) =>
                    foods.push({
                        ...food.id,
                        cantidad: food.cantidad,
                        horario,
                        idRegistro: id,
                        usuario,
                    })
                );
            });

            foods.forEach((food) => {
                const { usuario, horario, idRegistro } = food;

                const isPartOfGroup = groups[type].includes(food[type]);

                if (!isPartOfGroup) return;

                const date = dayjs(horario).format('DD/MM/YYYY');

                const newData = {
                    idRegistro,
                    idParticipante: usuario,
                    fechaRegistro: date,
                };

                const newState = normalizeArrayToExport({
                    state: getArrayByGroups(groups[type]),
                    group: food[type],
                    food,
                });

                const auxSuper = {
                    ...newData,
                    ...newState,
                };

                usersAux.push(auxSuper);
            });

            setExportData(usersAux);
            setFoodReady(true);
        } catch (error) {
            message.error('Error al obtener los datos');
            console.groupCollapsed('[Exports] getExportData');
            console.error(error);
            console.groupEnd();
            onCancel();
        }
    };

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFoodReady(false);
        };
    }, [selected]);

    return { exportData, foodReady };
};

export default useData;
