import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './Gastrointestinal.scss'

const Gastrointestinal = ({id}) =>{
    const [form4] = Form.useForm();

    const [infoGastroIn, setInfoGastroIn] = useState({});
    const [GasInCheckInfInt, setGasInCheckInfInt] = useState({});
    const [GasInCheckDiarrea, setGasInCheckDiarrea] = useState({});
    const [GasInCheckEstre, setGasInCheckEstre] = useState({});
    const [GasInCheckReflu, setGasInCheckReflu] = useState({});

    const [inflamacionIntestinal, setInflaInt] = useState();
    const [diarea, setDiarrea] = useState();
    const [estrenimiento, setEstrenimiento] = useState();
    const [reflujo, setReflujo] = useState();
    const [frecuenciaInflamacionIntestinal, setFrecuenciaInfInt] = useState();
    const [frecuenciaDiarrea, setFrecuenciaDiarrea] = useState('');
    const [frecuenciaEstreimiento, setFrecuenciaEstreimiento] = useState('');
    const [frecuenciaReflujo, setFrecuenciaReflujo] = useState('');

    
    useEffect(() => {
        getGastroIn();

        return () => {
            
        };
    }, [id]);

    const getGastroIn = async () => {
        try {
            const { data, status } = await apiURL.get(`/gastroIntestinales/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const minutosAlSol = data[0]?.minutosAlSol.map((elem) => elem.valor);

                setInfoExpoSol({
                    minutosAlSol: minutosAlSol,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoExopSolar');
            console.error(error);
            console.groupEnd();
        }
    };

    
    async function GuardarGastroInt() {}

    return (
        <div className='containerGastroInt'>
            <div className='basicInfo-TitleGasIn'>Gastrointestinal</div>

            <div className='basicInfo-Name-ContainerGasIn'>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Inflamación intestinal:</label>
                    <Select
                        id='inflaInt'
                        defaultValue={'No'}
                        className='lb-gastrInSelect'
                        onChange={(e) => InflamacionInt(e)}>
                        <Option value={'Si'}>Si</Option>
                        <Option value={'No'}>No</Option>
                    </Select>
                </div>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Frecuencia:</label>
                    <input
                        className='lb-gastrIn'
                        placeholder={''}
                        type='text'
                        name='Frecuencia'
                        onChange={(event) => setFrecuenciaInfInt(event.target.value)}></input>
                </div>
            </div>
            <div className='basicInfo-homeCel-Container'>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Diarrea:</label>
                    <Select
                        id='inflaInt'
                        defaultValue={'No'}
                        className='lb-gastrInSelect'
                        onChange={(e) => setDiarrea(e)}>
                        <Option value={'Si'}>Si</Option>
                        <Option value={'No'}>No</Option>
                    </Select>
                </div>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Frecuencia:</label>
                    <input
                        className='lb-gastrIn'
                        placeholder={''}
                        type='text'
                        name='Frecuencia'
                        onChange={(event) => setFrecuenciaDiarrea(event.target.value)}></input>
                </div>
            </div>
            <div className='basicInfo-birthPlaceGender-Container'>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Estreñimiento:</label>
                    <Select
                        id='inflaInt'
                        defaultValue={'No'}
                        className='lb-gastrInSelect'
                        onChange={(e) => setEstrenimiento(e)}>
                        <Option value={'Si'}>Si</Option>
                        <Option value={'No'}>No</Option>
                    </Select>
                </div>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Frecuencia:</label>
                    <input
                        className='lb-gastrIn'
                        placeholder={''}
                        type='text'
                        name='Frecuencia'
                        onChange={(event) => setFrecuenciaEstreimiento(event.target.value)}></input>
                </div>
            </div>
            <div className='basicInfo-Name-ContainerGasIn'>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Reflujo:</label>
                    <Select
                        id='inflaInt'
                        defaultValue={'No'}
                        className='lb-gastrInSelect'
                        onChange={(e) => setReflujo(e)}>
                        <Option value={'Si'}>Si</Option>
                        <Option value={'No'}>No</Option>
                    </Select>
                </div>
                <div className='basicInfo-Name-ContainerGasIn2'>
                    <label className='id-gastroIn'>Frecuencia:</label>
                    <input
                        className='lb-gastrIn'
                        placeholder={''}
                        type='text'
                        name='Frecuencia'
                        onChange={(event) => setFrecuenciaReflujo(event.target.value)}></input>
                </div>
            </div>
            <div className='basicInfo-Save-ContainerGasIn'>
                <div className='basicInfo-Save-ContainerGasIn2'>
                    <button className='btn-Save-basicInfoGasIn' onClick={() => GuardarGastroInt()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Gastrointestinal;