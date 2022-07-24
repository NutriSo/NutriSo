import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select, message } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';
import { isEmptyArray } from '../../../../utils';
import mocks from '../../../../mocks/estadisticasUsuario';

import './Gastrointestinal.scss';

const Gastrointestinal = ({ id }) => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState({});
    const [infoGastroIn, setInfoGastroIn] = useState({});
    const [GasInCheckInfAbd, setGasInCheckInfAbd] = useState({});
    const [GasInCheckDiarrea, setGasInCheckDiarrea] = useState({});
    const [GasInCheckEstre, setGasInCheckEstre] = useState({});
    const [GasInCheckReflu, setGasInCheckReflu] = useState({});

    useEffect(() => {
        getGastroIn();

        return () => {};
    }, [id]);

    const getGastroIn = async () => {
        try {
            const { data, status } = await apiURL.get(
                `/gastroIntestinales/individual?usuario=${id}`
            );

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
            message.error('Verifique los datos ingresados');
        }
    };

    const updateGastroIn = async (values) => {
        console.log('hello');
        const infAbd = !isEmptyArray(infoGastroIn?.inflamacionAbdominal);
        const diar = !isEmptyArray(infoGastroIn?.diarrea);
        const estre = !isEmptyArray(infoGastroIn?.estreñimiento);
        const refl = !isEmptyArray(infoGastroIn?.reflujo);

        try {
            if (infAbd || diar || estre || refl) {
                const body = {
                    usuario: id,
                    inflamacionAbdominal: [
                        GasInCheckInfAbd ? 'No' : { valor: values.infAbd, fecha: new Date() },
                    ],
                    frecuencia: [
                        GasInCheckInfAbd
                            ? 'N/A'
                            : { valor: values.fInflaAbd, fecha: new Date() },
                    ],

                    diarrea: [
                        GasInCheckDiarrea
                            ? 'No'
                            : { valor: values.diarrea, fecha: new Date() },
                    ],
                    frecuencia2: [
                        GasInCheckDiarrea
                            ? 'N/A'
                            : { valor: values.fDiarrea, fecha: new Date() },
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
                const { data } = await apiURL.patch(
                    `gastroIntestinales/individual?usuario=${id}`,
                    body
                );
                console.log(data);

                console.log('PATCH');
            } else {
                const body = {
                    usuario: info.usuario,
                    inflamacionAbdominal: [
                        GasInCheckInfAbd ? 'No' : { valor: values.infAbd, fecha: new Date() },
                    ],
                    frecuencia: [
                        GasInCheckInfAbd
                            ? 'N/A'
                            : { valor: values.fInflaAbd, fecha: new Date() },
                    ],

                    diarrea: [
                        GasInCheckDiarrea
                            ? 'No'
                            : { valor: values.diarrea, fecha: new Date() },
                    ],
                    frecuencia2: [
                        GasInCheckDiarrea
                            ? 'N/A'
                            : { valor: values.fDiarrea, fecha: new Date() },
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
                const { data } = await apiURL.post(
                    `gastroIntestinales/individual?usuario=${id}`,
                    body
                );
                console.log(data);

                console.log('POST');
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateGastroIn');
            console.error(error);
            console.groupEnd();
            message.error('Verifique los datos ingresados');
        }
    };

    return (
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Gastrointestinal</h2>
                <Form form={form} requiredMark={false} onFinish={updateGastroIn}>
                    <Form.Item
                        name='inflaAbd'
                        label='Inflamacion abdominal'
                        className='lb-gastroInSelect'>
                        <Select
                            onChange={(value) =>
                                setGasInCheckInfAbd(value === 'No' ? true : false)
                            }
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='fInflaAbd' label='Frecuencia' className='lb-gastroIn2'>
                        <Select placeholder='Selecciona una frecuencia'>
                            {mocks.frecuencias.map(({ value, label }) => (
                                <Option value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='diarrea' label='Diarrea' className='lb-gastroInSelect'>
                        <Select
                            onChange={(value) =>
                                setGasInCheckDiarrea(value === 'No' ? true : false)
                            }
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='fDiarrea' label='Frecuencia' className='lb-gastroIn2'>
                        <Select placeholder='Selecciona una frecuencia'>
                            {mocks.frecuencias.map(({ value, label }) => (
                                <Option value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='estre'
                        label='Estreñimiento'
                        className='lb-gastroInSelect'>
                        <Select
                            onChange={(value) =>
                                setGasInCheckEstre(value === 'No' ? true : false)
                            }
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='fEstre' label='Frecuencia' className='lb-gastroIn2'>
                        <Select placeholder='Selecciona una frecuencia'>
                            {mocks.frecuencias.map(({ value, label }) => (
                                <Option value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='reflu' label='Reflujo' className='lb-gastroInSelect'>
                        <Select
                            onChange={(value) =>
                                setGasInCheckReflu(value === 'No' ? true : false)
                            }
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='fReflu' label='Frecuencia' className='lb-gastroIn2'>
                        <Select placeholder='Selecciona una frecuencia'>
                            {mocks.frecuencias.map(({ value, label }) => (
                                <Option value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <center>
                        <button
                            className='btn-see-circunferencia'
                            htmlType='submit'
                            /*onClick={() => updateEstadoGeneral()}*/
                            value='Add'>
                            Guardar
                        </button>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default Gastrointestinal;
