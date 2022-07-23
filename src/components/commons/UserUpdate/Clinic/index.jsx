import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';

import { Form, Input, message } from 'antd';
import { isEmptyArray } from '../../../../utils';

const initialState = {
    sistolica: {
        valor: '',
    },
    diastolica: {
        valor: '',
    },
    nigricans: {
        valor: '',
        numero: 0,
    },
};

const Clinic = ({ id }) => {
    const [form] = Form.useForm();
    const [clinic, setClinic] = useState(initialState);

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get(`clinicos/individual?usuario=${id}`);
            if (!isEmptyArray(data)) {
                const {
                    presionArterialDiastolica,
                    presionArterialSistolica,
                    acantosisNigricans,
                } = data[0];

                const lastDiastolica = presionArterialDiastolica.slice(-1)[0];
                const lastSistolica = presionArterialSistolica.slice(-1)[0];
                const lastNigricans = acantosisNigricans.slice(-1)[0];

                setClinic({
                    sistolica: lastSistolica.valor,
                    diastolica: lastDiastolica.valor,
                    nigricans: {
                        valor: lastNigricans.valor,
                        numero: lastNigricans.numero,
                    },
                });
            }
        } catch (error) {
            message.error('Ocurrió un error al cargar los datos');
        }
    };

    const onFinish = async (values) => {
        try {
            const body = {
                presionArterialSistolica: clinic.sistolica,
                presionArterialDiastolica: clinic.diastolica,
                acantosisNigricans: clinic.nigricans,
            };

            const res = await apiURL.patch(`clinicos/individual?usuario=${id}`, body);

            message.success('Datos guardados correctamente');
        } catch (error) {
            message.error('Ocurrió un error al actualizar los datos');
        }
    };

    useEffect(() => {
        fetchData();
        return () => {
            setClinic(initialState);
        };
    }, []);

    return (
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Indicadores clínicos</h2>
                <Form
                    scrollToFirstError
                    form={form}
                    requiredMark={false}
                    layout='vertical'
                    onFinish={onFinish}>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Presión arterial sistólica'
                                name='presionArterialS'>
                                <Input
                                    placeholder={clinic.sistolica ?? 0}
                                    value={clinic.sistolica}
                                    onChange={(e) =>
                                        setClinic({
                                            ...clinic,
                                            sistolica: {
                                                valor: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Presión arterial diastólica'
                                name='presionArterialD'>
                                <Input
                                    placeholder={clinic.diastolica ?? 0}
                                    value={clinic.diastolica}
                                    onChange={(e) =>
                                        setClinic({
                                            ...clinic,
                                            diastolica: {
                                                valor: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Acantosis nigricans valor'
                                name='nigricansValor'>
                                <Input
                                    placeholder={clinic.nigricans.valor ?? 'Ingrese un valor'}
                                    value={clinic.nigricans.valor}
                                    onChange={(e) =>
                                        setClinic({
                                            ...clinic,
                                            nigricans: {
                                                ...clinic.nigricans,
                                                valor: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item label='Acantosis nigricans número' name='nigricansNum'>
                                <Input
                                    placeholder={clinic.nigricans.numero ?? 0}
                                    value={clinic.nigricans.numero}
                                    onChange={(e) =>
                                        setClinic({
                                            ...clinic,
                                            nigricans: {
                                                ...clinic.nigricans,
                                                numero: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-Save'>
                        <button htmlType='submit' className='btn-see-circunferencia'>
                            Guardar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Clinic;
