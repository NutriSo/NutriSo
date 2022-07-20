import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';
import { isEmptyArray } from '../../../../utils';
import mocks from '../../../../mocks/estadisticasUsuario';

import './Lactation.scss';

const Lactation = ({ id }) => {
    const [info, setInfo] = useState({});
    const [form2] = Form.useForm();
    const [infoLactancia, setInfoLactancia] = useState({});
    const [LactanciaCheckExlusiva, setLactanciaExclusiva] = useState({});

    useEffect(() => {
        getLactancia();

        return () => {};
    }, [id]);

    const getLactancia = async () => {
        try {
            const { data, status } = await apiURL.get(`/lactancia/individual?usuario=${id}`);
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

        try {
            if (matExc || artif || mix || mixCont || artifCont) {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: id,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: id,
                        artificial: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: id,
                        mixta: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: id,
                        maternaContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: id,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: id,
                        artificialContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }
                console.log('PATCH');
            } else {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: id,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: id,
                        artificial: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: id,
                        mixta: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: id,
                        maternaContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: id,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: id,
                        artificialContemplada: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva
                                ? 'N/A'
                                : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(
                        `lactancia/individual?usuario=${id}`,
                        body
                    );
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
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Lactancia</h2>
                <Form form={form2} requiredMark={false} onFinish={updateLactancia}>
                    <Form.Item
                        name='opcionLactancia'
                        label='Tipo de lactancia'
                        className='lb-lactanciaSelect'
                        /*rules={[Rules.basicSpanish]}*/
                    >
                        <Select
                            placeholder='Selecciona un tipo'
                            onChange={(value) =>
                                setLactanciaExclusiva(value === '' ? true : false)
                            }
                            defaultValue={''}>
                            {mocks.lactancia.map(({ value, label }) => (
                                <Option value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='tiempoLactancia' label={'¿Por cuánto tiempo?'}>
                        <Select className='lb-lactancia2' placeholder='Selecciona una opción'>
                            {mocks.frecuenciasLactancia.map(({ value, label }) => (
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
                            Save
                        </button>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default Lactation;
