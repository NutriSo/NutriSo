import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs } from 'antd';

import PesoEstatura from '../../Charts/PesoEstatura';

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
            console.log(data);
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
        <div className='containerCircunferencia'>
            <div className='basicInfo-Title'>Peso</div>
            <div className='circunferencia-Container3'>
                <Tabs defaultActiveKey='peso'>
                    <TabPane tab='Peso' key='peso'>
                        {dates?.peso?.length > 0 && <PesoEstatura data={weightData} dates={dates.peso} />}
                    </TabPane>
                    <TabPane tab='Altura' key='altura'>
                        {dates?.estatura?.length > 0 && (
                            <PesoEstatura data={weightData} dates={dates.estatura} option={2} />
                        )}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Weight;
