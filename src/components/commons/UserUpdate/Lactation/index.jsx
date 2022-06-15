import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './Lactation.scss'

const Lactation = ({id}) =>{
    const [form2] = Form.useForm();
    const [infoLactancia, setInfoLactancia] = useState({});
    const [LactanciaCheckExlusiva, setLactanciaExclusiva] = useState({});

    
    useEffect(() => {
        getLactancia();

        return () => {
            
        };
    }, [id]);

    const getLactancia = async () => {
        try {
            const { data, status } = await apiURL.get(`/lactancia/individual?usuario=${globalUserId}`);
            // console.log(data);
            if (status === 200 || data.length > 0) {
                const maternaExclusiva = data?.maternaExclusiva;
                const artificial = data?.artificial;
                const mixta = data?.mixta;
                const maternaContemplada = data?.maternaContemplada;
                const mixtaContemplada = data?.mixtaContemplada;
                const artificialContemplada = data?.artificialContemplada;

                setInfoLactancia({
                    maternaExclusiva,
                    artificial,
                    mixta,
                    maternaContemplada,
                    mixtaContemplada,
                    artificialContemplada,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoLactancia');
            console.error(error);
            console.groupEnd();
        }
    };


    const updateLactancia = async (values) => {
        console.log('Hello');
        const matExc = !isEmptyArray(infoLactancia?.maternaExclusiva);
        const artif = !isEmptyArray(infoLactancia?.artificial);
        const mix = !isEmptyArray(infoLactancia?.mixta);
        const mixCont = !isEmptyArray(infoLactancia?.mixtaContaminada);
        const artifCont = !isEmptyArray(infoLactancia?.artificialContaminada);

        const userId = window.location.hash.split('usuarios/')[1].trim();
        try {
            if (matExc || artif || mix || mixCont || artifCont) {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: globalUserId,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: globalUserId,
                        artificial: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: globalUserId,
                        mixta: [LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() }],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: globalUserId,
                        maternaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: globalUserId,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: globalUserId,
                        artificialContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }
                console.log('PATCH');
            } else {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: info.usuario,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: info.usuario,
                        artificial: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: info.usuario,
                        mixta: [LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() }],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: info.usuario,
                        maternaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: info.usuario,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: info.usuario,
                        artificialContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                console.log('POST');
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateLactancia');
            console.error(error);
            console.groupEnd();
        }
    };

    return (
        <div className='containerLactancia'>
            <div className='basicInfo-TitleLac'>Lactancia</div>
            <Form form={form2} requiredMark={false} onFinish={updateLactancia}>
                <div className='basicInfo-Name-ContainerLac'>
                    <div className='basicInfo-Name-ContainerLac2'>
                        <label className='id-lactancia'>Lactancia materna exclusiva:</label>
                        <Form.Item
                            name='opcionLactancia'
                            className='lb-lactanciaSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setLactanciaExclusiva(value === '' ? true : false)}
                                defaultValue={''}>
                                <Option value={'Lactancia materna exclusiva'}>
                                    Lactancia materna exclusiva
                                </Option>
                                <Option value={'Lactancia artificial'}>Lactancia artificial</Option>
                                <Option value={'Lactancia mixta'}>Lactancia mixta</Option>
                                <Option value={'Lactancia materna complementada'}>
                                    Lactancia materna complementada
                                </Option>
                                <Option value={'Lactancia mixta complementada'}>
                                    Lactancia mixta complementada
                                </Option>
                                <Option value={'Lactancia artificial complementada'}>
                                    Lactancia artificial complementada
                                </Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerLac2'>
                        <label className='id-lactancia'>¿Por cuánto tiempo? </label>
                        <Form.Item name='tiempoLactancia' rules={[Rules.basicSpanish]} required='true'>
                            {/*<input disabled = {generalCheckPYM} className='lb-lactancia2'></input>*/}
                            <input
                                disabled={LactanciaCheckExlusiva}
                                type='text'
                                name='tLactancia'
                                className='lb-lactancia2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Save-ContainerLac'>
                    <div className='basicInfo-Save-ContainerLac2 '>
                        <button
                            className='btn-Save-basicInfoLac3'
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

export default Lactation;