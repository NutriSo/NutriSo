import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Form, message } from 'antd';
import Popup from './Popup';

import IndicadoresBio from '../../Charts/IndicadoresBio';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './BioIndicators.scss';

const BioIndicators = ({ id }) => {
    const [form] = Form.useForm();
    const [infoBioquimicos, setInfoBioquimicos] = useState({});
    const [infoBioquimicosDates, setBioquimicosDates] = useState({});

    //popup Window Indicadores bioquimicos
    const [isOpenIndicadoresBio, setIsOpenIndicadoresBio] = useState(false);
    const togglePopupIndicadoresBio = () => {
        setIsOpenIndicadoresBio(!isOpenIndicadoresBio);
    };

    useEffect(() => {
        getBioquimicos();

        return () => {
            setBioquimicosDates({});
        };
    }, [id]);

    const getBioquimicos = async () => {
        try {
            const { data, status } = await apiURL.get(`bioquimicos/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const glucosaAyuno = data[0].glucosaAyuno.map((elem) => elem.valor);

                const glucosaDespues = data[0].glucosaDespues.map((elem) => elem.valor);
                const trigliceridos = data[0].trigliceridos.map((elem) => elem.valor);
                const colesterolTotal = data[0].colesterolTotal.map((elem) => elem.valor);
                const colesterolLDL = data[0].colesterolLDL.map((elem) => elem.valor);
                const colesterolHDL = data[0].colesterolHDL.map((elem) => elem.valor);
                const microbiotaIntestinal = data[0].microbiotaIntestinal.map(
                    (elem) => elem?.numero
                );
                const datesBio = data[0].glucosaAyuno.map((elem) => elem.fecha);

                setBioquimicosDates(datesBio);

                setInfoBioquimicos({
                    glucosaAyuno,
                    glucosaDespues,
                    trigliceridos,
                    colesterolTotal,
                    colesterolLDL,
                    colesterolHDL,
                    microbiotaIntestinal,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion getBioquimicos');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateIndicadoresBio = async (values) => {
        const today = new Date();
        try {
            const body = {
                glucosaAyuno: { valor: values.glucosaAyuno, fecha: today },
                glucosaDespues: {
                    valor: values.glucosaDespues,
                    fecha: today,
                    minutos: values.minutos,
                },
                trigliceridos: {
                    valor: values.trigliceridos,
                    fecha: today,
                },
                colesterolTotal: {
                    valor: values.colesterolTotal,
                    fecha: today,
                },
                colesterolLDL: {
                    valor: values.colesterolLDL,
                    fecha: today,
                },
                colesterolHDL: {
                    valor: values.colesterolHDL,
                    fecha: today,
                },
                microbiotaIntestinal: {
                    valor: values.microbiotaIntestinal,
                    numero: values.microbiotaIntestinalNum,
                    fecha: today,
                },
            };

            if (infoBioquimicos?.glucosaAyuno) {
                console.log('PATCH');
                const { data } = await apiURL.patch(
                    `bioquimicos/individual?usuario=${id}`,
                    body
                );
                console.log(data);
            } else {
                console.log('POST');
                const { data } = await apiURL.post(
                    `bioquimicos/individual?usuario=${id}`,
                    body
                );
                console.log(data);
            }
            message.success('Indicadores bioquimicos actualizados');
        } catch (error) {
            console.groupCollapsed('[ERROR] updateIndicadoresBio');
            console.error(error);
            console.groupEnd();
            message.error('Error al actualizar los indicadores bioquimicos');
        }

        setIsOpenIndicadoresBio(false);
    };

    return (
        <>
            <div className='basicContainer'>
                <div className='containData'>
                    <h2>Indicadores Bioquimicos</h2>
                    {/*Grafica-----------------------------------------------------------------------*/}
                    <div className='basicInfo-Container-Slide'>
                        {infoBioquimicos?.glucosaAyuno?.length > 0 && (
                            <IndicadoresBio
                                data={infoBioquimicos}
                                dates={infoBioquimicosDates}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className='basicContainer'>
                <input
                    type='button'
                    value='Agregar'
                    onClick={togglePopupIndicadoresBio}
                    className='btn-see-circunferencia'
                />
            </div>

            {isOpenIndicadoresBio && (
                <Popup
                    content={
                        <>
                            <strong>
                                <p id='popTitle'>Agregando un nuevo valor</p>
                            </strong>
                            <Form
                                form={form}
                                requiredMark={false}
                                onFinish={updateIndicadoresBio}>
                                <Form.Item
                                    label='Glucosa en el ayuno'
                                    name='glucosaAyuno'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Glucosa después'
                                    name='glucosaDespues'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Minutos después'
                                    name='minutos'
                                    className='id-name'
                                    rules={[Rules.minZero]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Trigliceridos'
                                    name='trigliceridos'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Colesterol total'
                                    name='colesterolTotal'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Colesterol LDL'
                                    name='colesterolLDL'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Colesterol HDL'
                                    name='colesterolHDL'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Microbiota intestital'
                                    name='microbiotaIntestinal'
                                    className='id-name'>
                                    <input
                                        className='lb-name'
                                        type='text'
                                        placeholder='Ingrese un valor'
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Microbiota intestital número'
                                    name='microbiotaIntestinalNum'
                                    className='id-name'
                                    rules={[Rules.minOne]}>
                                    <input
                                        className='lb-name'
                                        type='number'
                                        name='numero'
                                        min={0}
                                        placeholder='Ingrese un número'
                                    />
                                </Form.Item>
                                <center>
                                    <button
                                        htmlType='submit'
                                        className='btn-see-circunferencia'
                                        /* onClick={
                                                updateIndicadoresBio
                                            } */
                                        value='Add'>
                                        Agregar
                                    </button>
                                </center>
                            </Form>
                        </>
                    }
                    handleClose={togglePopupIndicadoresBio}
                />
            )}
        </>
    );
};

export default BioIndicators;
