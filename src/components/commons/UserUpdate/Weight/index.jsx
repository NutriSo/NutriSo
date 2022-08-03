import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import apiURL from '@/axios/axiosConfig';
import PesoEstatura from '@/components/commons/Charts/PesoEstatura';

import './Weight.scss';

const Weight = ({ id }) => {
    const [weightData, setData] = useState({});
    const [dates, setDates] = useState({});

    const { TabPane } = Tabs;

    useEffect(() => {
        fetchData();

        return () => {
            setData({});
        };
    }, [id]);

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get(`datosUsuarios/individual?usuario=${id}`);

            if (data.length > 0) {
                const datesPeso = data[0].registroPeso;

                setDates({ peso: datesPeso });
                setData({
                    peso: data[0].peso,
                    altura: data[0].altura,
                });
            }
        } catch (error) {
            console.groupCollapsed('[index.jsx] Error en la funcion fetchPesoEstatura');
            console.log(error);
            console.groupEnd();
        }
    };

    return (
        <div className='basicContainer'>
            {/*containerCircunferencia,   basicInfo-Title, circunferencia-Container3*/}
            <div className='containData'>
                <h2>Peso</h2>
                <div className='basicInfo-Container-Slide'>
                    <Tabs defaultActiveKey='peso'>
                        <TabPane tab='Peso' key='peso'>
                            {dates?.peso?.length > 0 && (
                                <PesoEstatura data={weightData} dates={dates.peso} />
                            )}
                        </TabPane>
                        <TabPane tab='Altura' key='altura'>
                            {dates?.estatura?.length > 0 && (
                                <PesoEstatura
                                    data={weightData}
                                    dates={dates.estatura}
                                    option={2}
                                />
                            )}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Weight;
