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
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        getGastroIn();

        return () => {};
    }, [id]);

    const toggleButton = (value) => {
        setButtonDisabled(value);
    };

    const getGastroIn = async () => {
        try {
            const { data, status } = await apiURL.get(
                `/gastroIntestinales/individual?usuario=${id}`
            );
            setInfo({ usuario: id });
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
        toggleButton(true);
        const infAbd = !isEmptyArray(infoGastroIn?.inflamacionAbdominal);
        const diar = !isEmptyArray(infoGastroIn?.diarrea);
        const estre = !isEmptyArray(infoGastroIn?.estreñimiento);
        const refl = !isEmptyArray(infoGastroIn?.reflujo);

        const hasToPatch = infAbd || diar || estre || refl;
        const today = new Date();

        const defaultNo = {
            estado: 'No',
            fecha: today,
            frecuencia: '',
        };

        try {
            const body = {
                usuario: info.usuario,
                inflamacionAbdominal: [
                    GasInCheckInfAbd
                        ? defaultNo
                        : {
                              estado: values.infAbd,
                              frecuencia: values?.fInflaAbd || 'N/A',
                              fecha: today,
                          },
                ],
                diarrea: [
                    GasInCheckDiarrea
                        ? defaultNo
                        : {
                              estado: values.diarrea,
                              frecuencia: values?.fDiarrea || 'N/A',
                              fecha: today,
                          },
                ],
                estreñimiento: [
                    GasInCheckEstre
                        ? defaultNo
                        : {
                              estado: values.estre,
                              frecuencia: values?.fEstre || 'N/A',
                              fecha: today,
                          },
                ],
                reflujo: [
                    GasInCheckReflu
                        ? defaultNo
                        : {
                              estado: values.reflu,
                              frecuencia: values?.fReflu || 'N/A',
                              fecha: today,
                          },
                ],
            };
            if (hasToPatch) {
                console.log('Body', body);
                console.log('PATCH');
                await apiURL.patch(`gastroIntestinales/individual?usuario=${id}`, body);
            } else {
                console.log('Body', body);
                console.log('POST');
                await apiURL.post(`gastroIntestinales/individual?usuario=${id}`, body);
            }
            toggleButton(false);
            message.success('Datos actualizados correctamente');
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
                            disabled={buttonDisabled}
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
