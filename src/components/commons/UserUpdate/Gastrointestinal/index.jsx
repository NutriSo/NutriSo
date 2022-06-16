import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';
import { isEmptyArray } from '../../../../utils';

import './Gastrointestinal.scss'

const Gastrointestinal = ({id}) =>{
    const [form] = Form.useForm();
    const [info, setInfo] = useState({});
    const [infoGastroIn, setInfoGastroIn] = useState({});
    const [GasInCheckInfAbd, setGasInCheckInfAbd] = useState({});
    const [GasInCheckDiarrea, setGasInCheckDiarrea] = useState({});
    const [GasInCheckEstre, setGasInCheckEstre] = useState({});
    const [GasInCheckReflu, setGasInCheckReflu] = useState({});

    
    useEffect(() => {
        getGastroIn();

        return () => {
            
        };
    }, [id]);

    const getGastroIn = async () => {
        try {
            const { data, status } = await apiURL.get(`/gastroIntestinales/individual?usuario=${id}`);
            console.log(data);
            if (status === 200 || data.length > 0) {
                const inflamacionAbdominal = data?.inflamacionAbdominal;
                const diarrea = data?.diarrea;
                const estreñimiento = data?.estreñimiento;
                const reflujo = data?.reflujo;

                setInfoGastroIn({
                    inflamacionAbdominal,
                    diarrea,
                    estreñimiento,
                    reflujo,

                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoGastroIn');
            console.error(error);
            console.groupEnd();
        }
    };

    
    const updateGastroIn = async (values) => {
        console.log("hello")
        const infAbd = !isEmptyArray(infoGastroIn?.inflamacionAbdominal);
        const diar = !isEmptyArray(infoGastroIn?.diarrea);
        const estre = !isEmptyArray(infoGastroIn?.estreñimiento);
        const refl = !isEmptyArray(infoGastroIn?.reflujo);

        const userId = window.location.hash.split('usuarios/')[1].trim();
        try {
            if (infAbd || diar || estre || refl) {
                
                
                const body = {
                    usuario: id,
                    inflamacionAbdominal: [
                        GasInCheckInfAbd ? 'No' : { valor: values.infAbd, fecha: new Date() },
                    ],
                    frecuencia: [
                        GasInCheckInfAbd ? 'N/A' : { valor: values.fInflaAbd, fecha: new Date() },
                    ],

                    diarrea: [
                        GasInCheckDiarrea ? 'No' : { valor: values.diarrea, fecha: new Date() },
                    ],
                    frecuencia2: [
                        GasInCheckDiarrea ? 'N/A' : { valor: values.fDiarrea, fecha: new Date() },
                    ],

                    estreñimiento: [
                        GasInCheckEstre ? 'No' : { valor: values.estre, fecha: new Date() },
                    ],
                    frecuencia3: [
                        GasInCheckEstre ? 'N/A' : { valor: values.fEstre, fecha: new Date() },
                    ],

                    reflujo: [
                        GasInCheckReflu ? 'No' : { valor: values.reflu, fecha: new Date() },
                    ],

                    frecuencia4: [
                        GasInCheckReflu ? 'N/A' : { valor: values.fReflu, fecha: new Date() },
                    ],
                };
                console.log('Body', body);
                const { data } = await apiURL.patch(`gastroIntestinales/individual?usuario=${id}`, body);
                console.log(data);
                
                console.log('PATCH');
            } else {
                
                
                const body = {
                    usuario: info.usuario,
                    inflamacionAbdominal: [
                        GasInCheckInfAbd ? 'No' : { valor: values.infAbd, fecha: new Date() },
                    ],
                    frecuencia: [
                        GasInCheckInfAbd ? 'N/A' : { valor: values.fInflaAbd, fecha: new Date() },
                    ],

                    diarrea: [
                        GasInCheckDiarrea ? 'No' : { valor: values.diarrea, fecha: new Date() },
                    ],
                    frecuencia2: [
                        GasInCheckDiarrea ? 'N/A' : { valor: values.fDiarrea, fecha: new Date() },
                    ],

                    estreñimiento: [
                        GasInCheckEstre ? 'No' : { valor: values.estre, fecha: new Date() },
                    ],
                    frecuencia3: [
                        GasInCheckEstre ? 'N/A' : { valor: values.fEstre, fecha: new Date() },
                    ],

                    reflujo: [
                        GasInCheckReflu ? 'No' : { valor: values.reflu, fecha: new Date() },
                    ],

                    frecuencia4: [
                        GasInCheckReflu ? 'N/A' : { valor: values.fReflu, fecha: new Date() },
                    ],
                };
                console.log('Body', body);
                const { data } = await apiURL.post(`gastroIntestinales/individual?usuario=${id}`, body);
                console.log(data);

                console.log('POST');
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateGastroIn');
            console.error(error);
            console.groupEnd();
        }
    };

    return (
        <div className='containerGastroIn'>
            <div className='basicInfo-TitleGasIn'>Gastrointestinal</div>
            <Form form={form} requiredMark={false} onFinish={updateGastroIn}>
                <div className='basicInfo-Name-ContainerGasIn '>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Inflamacion abdominal:</label>
                        <Form.Item
                            name='inflaAbd'
                            className='lb-gastroInSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setGasInCheckInfAbd(value === 'No' ? true : false)}
                                defaultValue={'No'}>
                                <Option value={'Si'}>
                                    Si
                                </Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Frecuencia </label>
                        <Form.Item name='fInflaAbd'>
                            {/*<input disabled = {generalCheckPYM} className='lb-gastroIn2'></input>*/}
                            <input
                                disabled={GasInCheckInfAbd}
                                type='text'
                                name='fInflaAbd2'
                                className='lb-gastroIn2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Name-ContainerGasIn '>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Diarrea:</label>
                        <Form.Item
                            name='diarrea'
                            className='lb-gastroInSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setGasInCheckDiarrea(value === 'No' ? true : false)}
                                defaultValue={'No'}>
                                <Option value={'Si'}>
                                    Si
                                </Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Frecuencia </label>
                        <Form.Item name='fDiarrea'>
                            {/*<input disabled = {generalCheckPYM} className='lb-gastroIn2'></input>*/}
                            <input
                                disabled={GasInCheckDiarrea}
                                type='text'
                                name='fDiarrea2'
                                className='lb-gastroIn2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Name-ContainerGasIn '>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Estreñimiento:</label>
                        <Form.Item
                            name='estre'
                            className='lb-gastroInSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setGasInCheckEstre(value === 'No' ? true : false)}
                                defaultValue={'No'}>
                                <Option value={'Si'}>
                                    Si
                                </Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Frecuencia </label>
                        <Form.Item name='fEstre'>
                            {/*<input disabled = {generalCheckPYM} className='lb-gastroIn2'></input>*/}
                            <input
                                disabled={GasInCheckEstre}
                                type='text'
                                name='fEstre2'
                                className='lb-gastroIn2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Name-ContainerGasIn '>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Reflujo:</label>
                        <Form.Item
                            name='reflu'
                            className='lb-gastroInSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setGasInCheckReflu(value === 'No' ? true : false)}
                                defaultValue={'No'}>
                                <Option value={'Si'}>
                                    Si
                                </Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerGasIn2'>
                        <label className='id-gastroIn'>Frecuencia </label>
                        <Form.Item name='fReflu'>
                            {/*<input disabled = {generalCheckPYM} className='lb-gastroIn2'></input>*/}
                            <input
                                disabled={GasInCheckReflu}
                                type='text'
                                name='fReflu2'
                                className='lb-gastroIn2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Save-ContainerGasIn'>
                    <div className='basicInfo-Save-ContainerGasIn2'>
                        <button
                            className='btn-Save-basicInfoGasIn3'
                            htmlType='submit'
                            /*onClick={() => updateEstadoGeneral()}*/
                            value='Add'>
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );

};

export default Gastrointestinal;

