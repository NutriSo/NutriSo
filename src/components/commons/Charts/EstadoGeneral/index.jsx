import React, { useState, useEffect } from 'react';
/**
 * Imports necesarios para evitar errores.
 *
 * Documentación:
 * - https://fix.code-error.com/error-category-is-not-a-registered-scale/
 * */
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { stringArrayToNumberArray, returnLabelsByChart } from '../../../../utils';

const EstadoGeneral = ({ data }) => {
    const [ chartData, setChartData ] = useState(initalData);

    useEffect(() => {
        if (data?.muchoCansancio && data?.mareos && data?.muchaSed && data?.muchasGanasDeOrinar && data?.muchaHambre) {
            const muchoCansancio = stringArrayToNumberArray(data?.muchoCansancio);
            const mareos = stringArrayToNumberArray(data?.mareos);
            const muchaSed = stringArrayToNumberArray(data?.muchaSed);
            const muchasGanasDeOrinar = stringArrayToNumberArray(data?.muchasGanasDeOrinar);
            const muchaHambre = stringArrayToNumberArray(data?.muchaHambre);

            setChartData({
                ...chartData,
                labels: returnLabelsByChart([ 'Cansancio', 'Mareo', 'Sed', 'Ganas de Orinar', 'Hambre'], muchoCansancio.length / 2),
                datasets: [
                    {
                        ...chartData?.datasets[ 0 ],
                        data: muchoCansancio,
                    },
                    {
                        ...chartData?.datasets[ 1 ],
                        data: mareos,
                    },
                    {
                        ...chartData?.datasets[ 2 ],
                        data: muchaSed,
                    },
                    {
                        ...chartData?.datasets[ 3 ],
                        data: muchasGanasDeOrinar,
                    },
                    {
                        ...chartData?.datasets[ 4 ],
                        data: muchaHambre,
                    },
                ],
            });
        }
        return () => {
            setChartData({});
        };
    }, [ data?.muchoCansancio && data?.mareos && data?.muchaSed && data?.muchasGanasDeOrinar && data?.muchaHambre]);

    return (
        <Line
            width={750}
            height={500}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Estado General',
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

export default EstadoGeneral;

export const initalData = {
    labels: [ 'Cansancio', 'Mareo', 'Sed', 'Ganas de Orinar', 'Hambre'],
    datasets: [
        {
            label: 'Cansancio',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,255,19,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Mareo',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Sed',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Ganas de Orinar',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(175,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Hambre',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(250,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};
