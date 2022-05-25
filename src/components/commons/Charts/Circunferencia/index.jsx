import React, { useState, useEffect } from 'react';
/**
 * Imports necesarios para evitar errores.
 *
 * Documentación:
 * - https://fix.code-error.com/error-category-is-not-a-registered-scale/
 * */
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { stringArrayToNumberArray, returnDateLabelByChat } from '../../../../utils';

const Circunferencia = ({ data, dates, option = 1 }) => {
    const [ chartData, setChartData ] = useState(option === 1 ? initialData2 : initialData1);

    useEffect(() => {
        if (data?.cadera && data?.cintura) {
            const cadera = stringArrayToNumberArray(data?.cadera);
            const cintura = stringArrayToNumberArray(data?.cintura);
            const labels = returnDateLabelByChat([ new Date().toString() ], dates.length, dates);

            if (option === 1) {
                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cadera',
                            data: cintura,
                        },
                        {
                            label: 'Cintura',
                            data: cadera,
                        },
                    ],
                });
            } else {
                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cintura',
                            data: cadera,
                        },
                    ],
                });
            }
        }
        return () => {
            setChartData({});
        };
    }, [ data?.cadera, data?.cintura ]);

    return (
        <Line
            width={750}
            height={500}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Circunferencia',
                    fontSize: 20,
                },
                legend: {
                    display: true,
                    position: 'right',
                },
            }}
        />
    );
};

export default Circunferencia;

export const initialData1 = {
    labels: [ 'Cintura' ],
    datasets: [
        {
            label: 'Cintura',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};

export const initialData2 = {
    labels: [ 'Cadera' ],
    datasets: [
        {
            label: 'Cadera',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Cintura',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};