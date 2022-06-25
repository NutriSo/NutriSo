import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form } from 'antd';
import Popup from './Popup';

import IndicadoresBio from '../../Charts/IndicadoresBio';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './BioIndicators.scss'

const BioIndicators = ({id}) =>{
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
                console.log(glucosaAyuno);
                const glucosaDespues = data[0].glucosaDespues.map((elem) => elem.valor);
                const trigliceridos = data[0].trigliceridos.map((elem) => elem.valor);
                const colesterolTotal = data[0].colesterolTotal.map((elem) => elem.valor);
                const colesterolLDL = data[0].colesterolLDL.map((elem) => elem.valor);
                const colesterolHDL = data[0].colesterolHDL.map((elem) => elem.valor);
                const microbiotaIntestinal = data[0].microbiotaIntestinal.map((elem) => elem.valor);
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
        try {
            const body = {
                glucosaAyuno: { valor: values.glucosaAyuno, fecha: new Date() },
                glucosaDespues: {
                    valor: values.glucosaDespues,
                    fecha: new Date(),
                    minutos: values.minutos,
                },
                trigliceridos: {
                    valor: values.trigliceridos,
                    fecha: new Date(),
                },
                colesterolTotal: {
                    valor: values.colesterolTotal,
                    fecha: new Date(),
                },
                colesterolLDL: {
                    valor: values.colesterolLDL,
                    fecha: new Date(),
                },
                colesterolHDL: {
                    valor: values.colesterolHDL,
                    fecha: new Date(),
                },
                microbiotaIntestinal: {
                    valor: values.microbiotaIntestinal,
                    fecha: new Date(),
                },
            };
            console.log(infoBioquimicos);
            if (infoBioquimicos?.glucosaAyuno) {
                console.log('PATCH');
                const { data } = await apiURL.patch(`bioquimicos/individual?usuario=${id}`, body);
                console.log(data);
            } else {
                console.log('POST');
                const { data } = await apiURL.post(`bioquimicos/individual?usuario=${id}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateIndicadoresBio');
            console.error(error);
            console.groupEnd();
        }

        setIsOpenIndicadoresBio(false);
    };

    return (
        <div className='containerIndBio'>
            <div className='basicInfo-Title'>Indicadores Bioquimicos</div>
            {/*Grafica-----------------------------------------------------------------------*/}
            <div className='cindBio-Container3 '>
                <div>
                    {infoBioquimicos?.glucosaAyuno?.length > 0 && (
                        <IndicadoresBio data={infoBioquimicos} dates={infoBioquimicosDates} />
                    )}
                </div>
            </div>
            {/*Fin de grafica----------------------------------------------------------------*/}
            <div>
                <div className='indBio-Container'>
                    <div className='indBio-Container2'>
                        <input
                            type='button'
                            value='Agregar'
                            onClick={togglePopupIndicadoresBio}
                            className='btn-see-indBio '
                        />
                        <p></p>
                        {isOpenIndicadoresBio && (
                            <Popup
                                content={
                                    <Form form={form} requiredMark={false} onFinish={updateIndicadoresBio}>
                                        <center><b>Agregando un nuevo valor</b></center>
                                        <div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Glucosa en el ayuno'
                                                    name='glucosaAyuno'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Glucosa después'
                                                    name='glucosaDespues'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Minutos después'
                                                    name='minutos'
                                                    rules={[Rules.minZero]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Trigliceridos'
                                                    name='trigliceridos'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Colesterol total'
                                                    name='colesterolTotal'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Colesterol LDL'
                                                    name='colesterolLDL'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Colesterol HDL'
                                                    name='colesterolHDL'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='indBio-Container4'>
                                                <Form.Item
                                                    label='Microbiota intestital'
                                                    name='microbiotaIntestinal'
                                                    rules={[Rules.minOne]}>
                                                    <input
                                                        className='input-indBio'
                                                        type='number'
                                                        name='numero'
                                                        min={0}
                                                        placeholder=''
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <center>
                                            <button
                                                htmlType='submit'
                                                className='btn-see-indBio'
                                                /* onClick={
                                                    updateIndicadoresBio
                                                } */
                                                value='Add'>
                                                Agregar
                                            </button>
                                        </center>
                                    </Form>
                                }
                                handleClose={togglePopupIndicadoresBio}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default BioIndicators;