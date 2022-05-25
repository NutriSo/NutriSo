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

const CampoCor = ({ data, dates }) => {
    const [ chartData, setChartData ] = useState(initalData);

    useEffect(() => {
        if (data?.grasas && Array.isArray(data.grasas)) {
            const porcentGrasa = stringArrayToNumberArray(data?.grasas);
            const porcentMasa = stringArrayToNumberArray(data?.masas);
            const porcentAgua = stringArrayToNumberArray(data?.agua);
            const densidadOsea = stringArrayToNumberArray(data?.densidadOsea);
            const grasaVisceral = stringArrayToNumberArray(data?.grasaVisceral);
            const tasaMetabolica = stringArrayToNumberArray(data?.tasaMetabolica);
            const edadMetabolica = stringArrayToNumberArray(data?.edadMetabolica);

            const labels = returnDateLabelByChat([ new Date().toString() ], dates?.length, dates);

            setChartData({
                ...chartData,
                labels: labels,
                datasets: [
                    {
                        label: 'Grasa',
                        data: porcentGrasa,
                    },
                    {
                        label: 'Masa',
                        data: porcentMasa,
                    },
                    {
                        label: 'Agua',
                        data: porcentAgua,
                    },
                    {
                        label: 'Densidad Ósea',
                        data: densidadOsea,
                    },
                    {
                        label: 'Grasa Visceral',
                        data: grasaVisceral,
                    },
                    {
                        label: 'Tasa Metabólica',
                        data: tasaMetabolica,
                    },
                    {
                        label: 'Edad Metabólica',
                        data: edadMetabolica,
                    },
                ],
            });
        }
        return () => {
            setChartData({});
        };
    }, [ data?.porcentGrasa, data?.porcentMasa, data?.porcentAgua, data?.densidadOsea, data?.grasaVisceral, data?.tasaMetabolica, data?.edadMetabolica ]);

    return (
        <Line
            width={750}
            height={500}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Campos Corporales',
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

export default CampoCor;

export const initalData = {
    labels: [ 'Grasa', 'Masa', 'Agua', 'Densidad Ósea', 'Grasa Visceral', 'Tasa Metabólica', 'Edad Metabólica' ],
    datasets: [
        {
            label: 'Grasa',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,255,19,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Masa',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Agua',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Densidad Ósea',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(175,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Grasa Visceral',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(250,19,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Tasa Metabólica',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(250,219,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
        {
            label: 'Edad Metabólica',
            fill: true,
            lineTension: 0.3,
            backgroundColor: 'rgba(200,200,25,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
        },
    ],
};
