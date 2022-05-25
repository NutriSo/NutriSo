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

const PesoEstatura = ({ data, dates, option = 1 }) => {
    const [ chartData, setChartData ] = useState(option === 1 ? initialData2 : initialData1);

    useEffect(() => {
        if (data?.peso && data?.altura) {
            const peso = stringArrayToNumberArray(data?.peso);
            const altura = stringArrayToNumberArray(data?.altura);
            const labels = returnDateLabelByChat([ new Date().toString() ], dates.length, dates);

            if (option === 1) {
                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [
                        {
                            label: 'Peso',
                            data: peso,
                        },
                    ],
                });
            } else {
                setChartData({
                    ...chartData,
                    labels: labels,
                    datasets: [
                        {
                            label: 'Altura',
                            data: altura,
                        },
                    ],
                });
            }
        }
        return () => {
            setChartData({});
        };
    }, [ data?.peso, data?.altura ]);

    return (
        <Line
            width={750}
            height={500}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'PesoEstatura',
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

export default PesoEstatura;

export const initialData1 = {
    labels: [ 'Altura' ],
    datasets: [
        {
            label: 'Altura',
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
    labels: [ 'Peso' ],
    datasets: [
        {
            label: 'Peso',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};