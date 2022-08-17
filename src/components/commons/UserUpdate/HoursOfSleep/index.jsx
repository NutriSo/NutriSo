import React, { useState, useEffect } from 'react';
import { Form, message, Select } from 'antd';

import apiURL from '@/axios/axiosConfig';
import { Rules } from '@/utils/formRules';
import { isEmptyArray } from '@/utils';
import mocks from '@/mocks/estadisticasUsuario';

import './HoursOfSleep.scss';

const HoursOfSleep = ({ id }) => {
    const [form] = Form.useForm();
    const [infoHoursSleep, setInfoHoursSleep] = useState({});
    const [hoursSleepCheckDespierta, setHoursSleepCheckDespierta] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        getHoursSleep();

        return () => {};
    }, [id]);

    const getHoursSleep = async () => {
        try {
            const { data } = await apiURL.get(`/sueno/individual?usuario=${id}`);

            if (!isEmptyArray(data)) {
                const { horasDeSueño, estadoDeDescanso, despiertaPorLaNoche, frecuencia } =
                    data[0];

                const sueno = horasDeSueño.slice(-1)[0]?.valor;
                const descanso = estadoDeDescanso.slice(-1)[0]?.valor;
                const despierta = despiertaPorLaNoche.slice(-1)[0]?.valor;
                const frecuenciaSueno = frecuencia.slice(-1)[0]?.valor;

                setInfoHoursSleep({
                    sueno,
                    descanso,
                    despierta,
                    frecuenciaSueno,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoHoursSleep');
            console.error(error);
            console.groupEnd();
        }
    };

    const onPostHoursSleep = async (body) => {
        try {
            await apiURL.post(`sueno/individual?usuario=${id}`, body);
            message.success('Se guardó correctamente');
        } catch (error) {
            console.log('Error en la funcion onPostHoursSleep');
            console.error(error);
            message.error('Ocurrió un error al guardar los datos');
        }
    };

    const onPatchHoursSleep = async (body) => {
        try {
            await apiURL.patch(`sueno/individual?usuario=${id}`, body);
            message.success('Se guardó correctamente');
        } catch (error) {
            console.log('Error en la funcion onPatchHoursSleep');
            console.error(error);
            message.error('Ocurrió un error al guardar los datos');
        }
    };

    const updateHoursSleep = (values) => {
        setButtonDisabled(true);
        const despiertaNoche = values.despiertaNoche;
        const frecuencia = despiertaNoche === 'Si' ? values.frecuenciaSueno : '';

        const body = {
            horasDeSueño: { valor: values.horasDeSueno },
            estadoDeDescanso: { valor: values.estadoDeDescanso },
            despiertaPorLaNoche: { valor: despiertaNoche },
            frecuencia: { valor: frecuencia },
        };

        if (!infoHoursSleep?.sueno) {
            onPostHoursSleep(body);
        } else {
            onPatchHoursSleep(body);
        }
        setButtonDisabled(false);
    };

    return (
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Horas de Sueño</h2>
                <Form form={form} requiredMark={false} onFinish={updateHoursSleep}>
                    <div className='labels'>
                        <p>¿Cuántas horas duerme al día?</p>
                    </div>
                    <div className='inputs'>
                        <Form.Item name='horasDeSueno'>
                            <input
                                type='number'
                                name='hSueno'
                                className='lb-EstadoGen2'
                                placeholder={infoHoursSleep?.sueno || ''}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name='estadoDeDescanso'
                        label='¿Descansa?'
                        className='descansa'
                        rules={[Rules.basicSpanish]}>
                        <Select
                            placeholder={infoHoursSleep?.descanso || 'Selecione una opción'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                            <Option value={'Mas o menos'}>Mas o menos</Option>
                            <Option value={'Solo algunos días'}>Solo algunos días</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='despiertaNoche'
                        label='¿Despierta durante la noche?'
                        className='hourSleepSelect'>
                        <Select
                            onChange={(value) =>
                                setHoursSleepCheckDespierta(value === 'No' ? true : false)
                            }
                            placeholder={infoHoursSleep?.despierta || 'Selecione una opción'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='¿Con que frecuencia ocurre?'
                        name='frecuenciaSueno'
                        className='hourSleepSelect'>
                        <Select
                            disabled={hoursSleepCheckDespierta}
                            placeholder={
                                infoHoursSleep?.frecuenciaSueno || 'Selecione una opción'
                            }>
                            {mocks.frecuencias.map(({ value, label }) => (
                                <Option key={value} value={value}>
                                    {label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <center>
                        <button
                            className='btn-see-circunferencia'
                            htmlType='submit'
                            disabled={buttonDisabled}
                            value='Add'>
                            Guardar
                        </button>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default HoursOfSleep;
