import React, { useState, useEffect } from 'react';
/**
 * Imports necesarios para evitar errores.
 *
 * Documentación:
 * - https://fix.code-error.com/error-category-is-not-a-registered-scale/
 * */
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { stringArrayToNumberArray, returnLabelsByChart, returnDateLabelByChat } from '../../../../utils';

const IndicadoresBio = ({ data, dates }) => {
    const [ chartData, setChartData ] = useState(initalData);

    useEffect(() => {
        if (data?.glucosaAyuno && Array.isArray(data.glucosaAyuno)) {
            const glucosaAyuno = stringArrayToNumberArray(data?.glucosaAyuno);
            const glucosaDespues = stringArrayToNumberArray(data?.glucosaDespues);
            const trigliceridos = stringArrayToNumberArray(data?.trigliceridos);
            const colesterolTotal = stringArrayToNumberArray(data?.colesterolTotal);
            const colesterolLDL = stringArrayToNumberArray(data?.colesterolLDL);
            const colesterolHDL = stringArrayToNumberArray(data?.colesterolHDL);
            const microbiotaIntestinal = stringArrayToNumberArray(data?.microbiotaIntestinal);

            const labels = returnDateLabelByChat([ new Date().toString() ], dates?.length, dates);

            setChartData({
                ...chartData,
                labels: labels,
                datasets: [
                    {
                        label: 'Glucosa ayuno',
                        data: glucosaAyuno,
                    },
                    {
                        label: 'Glucosa despues',
                        data: glucosaDespues,
                    },
                    {
                        label: 'Trigliceridos',
                        data: trigliceridos,
                    },
                    {
                        label: 'Colesterol Total',
                        data: colesterolTotal,
                    },
                    {
                        label: 'Colesterol LDL',
                        data: colesterolLDL,
                    },
                    {
                        label: 'Colesterol HDL',
                        data: colesterolHDL,
                    },
                    {
                        label: 'Microbiota Intestinal',
                        data: microbiotaIntestinal,
                    },
                ],
            });
        }
        return () => {
            setChartData({});
        };
    }, [ data?.glucosaAyuno, data?.glucosaDespues, data?.trigliceridos, data?.colesterolTotal, data?.colesterolLDL, data?.colesterolHDL, data?.microbiotaIntestinal ]);

    return (
        <Line
            width={750}
            height={500}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Indicadores Bioquimicos',
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

export default IndicadoresBio;

export const initalData = {
    labels: [ 'Glucosa ayuno', 'Glucosa despues', 'Trigliceridos', 'Colesterol Total', 'Colesterol LDL', 'Colesterol HDL', 'Microbiota Intestinal' ],
    datasets: [
        {
            label: 'Glucosa ayuno',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,255,19,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Glucosa despues',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Trigliceridos',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Colesterol Total',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(175,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Colesterol LDL',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(250,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Colesterol HDL',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(250,219,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Microbiota Intestinal',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(200,200,25,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};
