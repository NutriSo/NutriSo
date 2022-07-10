import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';


import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './OverallStatus.scss'

const OverallStatus = ({ id }) => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState({});
    const [infoEstadoGeneral, setInfoEstadoGenral] = useState({});
    const [generalCheckPYM, setGeneralCheckPYM] = useState({});
    const [generalCheckNa, setGeneralCheckNa] = useState({});
    const [generalCheckPi, setGeneralCheckPi] = useState({});
    const [generalCheckNails, setGeneralCheckNails] = useState({});
    const [generalCheckCabello, setGeneralCheckCabello] = useState({});
    const [generalCheckBoca1, setGeneralCheckBoca1] = useState({});
    const [generalCheckBoca2, setGeneralCheckBoca2] = useState({});
    const [generalCheckBoca3, setGeneralCheckBoca3] = useState({});
    const [generalCheckBoca4, setGeneralCheckBoca4] = useState({});

    useEffect(() => {
        getEstadoGeneral();

        return () => {

        };
    }, [id]);



    const getEstadoGeneral = async () => {
        try {
            const { data, status } = await apiURL.get(`/extrasEstadoGeneral/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const muchoCansancio = data[0].muchoCansancio.map((elem) => elem.valor);

                setInfoEstadoGenral({
                    muchoCansancio: muchoCansancio,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoEstadoGeneral');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateEstadoGeneral = async (values) => {
        try {
            if (infoEstadoGeneral?.muchoCansancio) {
                const pies = {
                    seHinchan: generalCheckPYM ? 'No' : values.seHinchan,
                    aQuehora: generalCheckPYM ? 'N/A' : values.saQuehora,
                    frecuencia: generalCheckPYM ? 'N/A' : values.frecuencia,
                    horasSentado: generalCheckPYM ? 'N/A' : values.horasSentado,
                    horasParado: generalCheckPYM ? 'N/A' : values.horasParado,
                    fecha: new Date(),
                };

                const nariz = {
                    sangradoDe: generalCheckNa ? 'No' : values.sangradoDe,
                    frecuenciaDe: generalCheckNa ? 'N/A' : values.frecuenciaDe,
                    fecha: new Date(),
                };

                const piel = {
                    manchasRojasMoretes: generalCheckPi ? 'No' : values.manchasRojasMoretes,
                    frecuenciaDeEllo: generalCheckPi ? 'N/A' : values.frecuenciaDeEllo,

                    fecha: new Date(),
                };

                const unas = {
                    quebradizas: generalCheckNails ? 'No' : values.quebradizas,
                    frecuencia2: generalCheckNails ? 'N/A' : values.frecuencia2,
                    fecha: new Date(),
                };

                const cabello = {
                    caidaDeCabello: generalCheckCabello ? 'No' : values.caidaDeCabello,
                    cabelloQuebradizo: generalCheckCabello ? 'N/A' : values.cabelloQuebradizo,
                    cabelloTenidoOTratamiento: generalCheckCabello ? 'N/A' : values.cabelloTenidoOTratamiento,
                    fecha: new Date(),
                };

                const boca = {
                    cortadurasEnComisuras: generalCheckBoca1 ? 'No' : values.cortadurasEnComisuras,
                    frecuencia3: generalCheckBoca1 ? 'N/A' : values.frecuencia3,
                    inflamacionDeLengua: generalCheckBoca2 ? 'No' : values.inflamacionDeLengua,
                    frecuenciaDe2: generalCheckBoca2 ? 'N/A' : values.frecuenciaDe2,
                    inflamacionEncias: generalCheckBoca3 ? 'No' : values.inflamacionEncias,
                    frecuenciaDeIE: generalCheckBoca3 ? 'N/A' : values.frecuenciaDeIE,
                    sangradoEncias: generalCheckBoca4 ? 'No' : values.sangradoEncias,
                    frecuenciaDeSE: generalCheckBoca4 ? 'N/A' : values.frecuenciaDeSE,
                    fecha: new Date(),
                };

                const body = {
                    usuario: info.usuario,
                    muchoCansancio: {
                        valor: values.muchoCansancio,
                        fecha: new Date(),
                    },
                    mareos: { valor: values.mareos, fecha: new Date() },
                    muchaSed: { valor: values.muchaSed, fecha: new Date() },
                    muchasGanasDeOrinar: {
                        valor: values.muchasGanasDeOrinar,
                        fecha: new Date(),
                    },
                    muchaHambre: {
                        valor: values.muchaHambre,
                        fecha: new Date(),
                    },
                    piesYmanos: pies,
                    nariz,
                    piel,
                    unas,
                    cabello,
                    boca,
                    tipoDeNacimiento: values.tipoDeNacimiento,
                };
                console.log('Body', body);
                console.log('PATCH');
                const { data } = await apiURL.patch(`extrasEstadoGeneral/individual?usuario=${id}`, body);
                console.log(data);
            } else {
                const datosPies = {
                    seHinchan: generalCheckPYM ? 'No' : values.seHinchan,
                    aQuehora: generalCheckPYM ? 'N/A' : values.saQuehora,
                    frecuencia: generalCheckPYM ? 'N/A' : values.frecuencia,
                    horasSentado: generalCheckPYM ? 'N/A' : values.horasSentado,
                    horasParado: generalCheckPYM ? 'N/A' : values.horasParado,
                    fecha: new Date(),
                };
                const datosNariz = {
                    sangradoDe: generalCheckNa ? 'No' : values.sangradoDe,
                    frecuenciaDe: generalCheckNa ? 'N/A' : values.frecuenciaDe,
                    fecha: new Date(),
                };
                const datosPiel = {
                    manchasRojasMoretes: generalCheckPi ? 'No' : values.manchasRojasMoretes,
                    frecuenciaDeEllo: generalCheckPi ? 'N/A' : values.frecuenciaDeEllo,
                    fecha: new Date(),
                };
                const datosNails = {
                    quebradizas: generalCheckNails ? 'No' : values.quebradizas,
                    frecuencia: generalCheckNails ? 'N/A' : values.frecuencia2,
                    fecha: new Date(),
                };
                const datosCabello = {
                    caidaDeCabello: generalCheckCabello ? 'No' : values.caidaDeCabello,
                    cabelloQuebradizo: generalCheckCabello ? 'N/A' : values.cabelloQuebradizo,
                    cabelloTenidoOTratamiento: generalCheckCabello ? 'N/A' : values.cabelloTenidoOTratamiento,
                    fecha: new Date(),
                };
                const datosBoca = {
                    cortadurasEnComisuras: generalCheckBoca1 ? 'No' : values.cortadurasEnComisuras,
                    frecuencia3: generalCheckBoca1 ? 'N/A' : values.frecuencia3,
                    inflamacionDeLengua: generalCheckBoca2 ? 'No' : values.inflamacionDeLengua,
                    frecuenciaDe2: generalCheckBoca2 ? 'N/A' : values.frecuenciaDe2,
                    inflamacionEncias: generalCheckBoca3 ? 'No' : values.inflamacionEncias,
                    frecuenciaDeIE: generalCheckBoca3 ? 'N/A' : values.frecuenciaDeIE,
                    sangradoEncias: generalCheckBoca4 ? 'No' : values.sangradoEncias,
                    frecuenciaDeSE: generalCheckBoca4 ? 'N/A' : values.frecuenciaDeSE,
                    fecha: new Date(),
                };
                // Este body no te va a servir para hacer el patch, puesto que ya no será necesario enviar arreglos, sino, objetos.
                const body = {
                    usuario: info.usuario,
                    muchoCansancio: [{ valor: values.muchoCansancio, fecha: new Date() }],
                    mareos: [{ valor: values.mareos, fecha: new Date() }],
                    muchaSed: [{ valor: values.muchaSed, fecha: new Date() }],
                    muchasGanasDeOrinar: [
                        {
                            valor: values.muchasGanasDeOrinar,
                            fecha: new Date(),
                        },
                    ],
                    muchaHambre: [{ valor: values.muchaHambre, fecha: new Date() }],
                    piesYmanos: [datosPies],
                    nariz: [datosNariz],
                    piel: [datosPiel],
                    unas: [datosNails],
                    cabello: [datosCabello],
                    boca: [datosBoca],
                    tipoDeNacimiento: values.tipoDeNacimiento,
                };
                console.log('Body', body);
                console.log('POST');
                const { data } = await apiURL.post(`extrasEstadoGeneral/individual?usuario=${id}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateEstadoGeneral');
            console.error(error);
            console.groupEnd();
        }
    };


    return (
        <div className='basicContainer'> {/**containerEstadoGen */}
            <div className='containData'>
                <h2>Estado general</h2>
                <Form form={form} requiredMark={false} onFinish={updateEstadoGeneral}>
                    {/* <div className='fila'> */}
                        <Form.Item
                            label='Mucho cansancio'
                            name='muchoCansancio'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select name='mCancancio' defaultValue={''} className='rCorta'>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='mareos'
                            className='lb-EstadoGenSelect'
                            label='Mareos'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='muchaSed'
                            label='Mucha sed'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='muchasGanasDeOrinar'
                            label='Muchas ganas de orinar'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='muchaHambre'
                            label='Mucha hambre'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    {/* </div> */}




                    <h2> Pies y manos </h2>
                    <Form.Item
                        label='¿Se hinchan sus pies o manos?'
                        name='seHinchan'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckPYM(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='¿A qué hora del día ocurre?'
                        name='aQuehora'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckPYM} defaultValue={''}>
                            <Option value={'Al despertar'}>Al despertar</Option>
                            <Option value={'Durante el día'}>Durante el día</Option>
                            <Option value={'En la noche'}>En la noche</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuencia'
                        label='¿Con que frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckPYM} defaultValue={''}>
                            <Option value={'Al despertar'}>Todos los días</Option>
                            <Option value={'Durante el día'}>1 a 3 veces a la semana</Option>
                            <Option value={'En la noche'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <div className="labels">
                        <p>¿Cuántas horas pasa sentado al día?</p>
                    </div>
                    <div className="inputs">
                        <Form.Item
                            name='horasSentado'
                        /*
                        rules={[
                            Rules.basicSpanish,
                        ]}*/
                        >
                            <input
                                disabled={generalCheckPYM}
                                type='text'
                                name='hSentado'
                                className='lb-EstadoGen2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>

                    <div className="labels">
                        <p>¿Cuántas horas pasa parado al día?</p>
                    </div>
                    <div className="inputs">
                        <Form.Item
                            name='horasParado'
                        /*
                        rules={[
                            Rules.basicSpanish,
                        ]}*/
                        >
                            {/*<input disabled = {generalCheckPYM} className='lb-EstadoGen2'></input>*/}
                            <input
                                disabled={generalCheckPYM}
                                type='text'
                                name='hParado'
                                className='lb-EstadoGen2'
                                placeholder=''
                            />
                        </Form.Item>
                    </div>

                    <h2>Nariz</h2>
                    <Form.Item
                        name='sangradoDe'
                        className='lb-EstadoGenSelect'
                        label='Sangrado de nariz'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckNa(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuenciaDe'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckNa} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 2 veces a la semana'}>1 a 2 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <h2>Piel</h2>
                    <Form.Item
                        name='manchasRojasMoretes'
                        className='lb-EstadoGenSelect'
                        label='Manchas rojas en su piel o moretes sin motivo'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckPi(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuenciaDeEllo'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckPi} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 2 veces a la semana'}>1 a 2 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <h2>Uñas</h2>
                    <Form.Item
                        name='quebradizas'
                        label='Uñas quebradizas'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckNails(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuencia2'
                        label='¿Ha realizado algún tratamiento estético en sus uñas recientemente?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckNails} defaultValue={''}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>


                    <h2>Cabello</h2>
                    <Form.Item
                        name='caidaDeCabello'
                        label='Caída de cabello'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckCabello(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Cabello quebradizo'
                        name='cabelloQuebradizo'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckCabello} defaultValue={''}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='¿Tiene su cabello teñido o bajo algún tratamiento estético?'
                        name='cabelloTenidoOTratamiento'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckCabello} defaultValue={''}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <h2>Boca</h2>
                    <Form.Item
                        name='cortadurasEnComisuras'
                        label='Cortaduras en las comisuras de su boca'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckBoca1(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuencia3'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckBoca1} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='inflamacionDeLengua'
                        label='Inflamación en lengua'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckBoca2(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuenciaDe2'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckBoca2} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name='inflamacionEncias'
                        label='Inflamación de encías'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckBoca3(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='frecuenciaDeIE'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckBoca3} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='sangradoEncias'
                        label='Sangrado de encías'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            onChange={(value) => setGeneralCheckBoca4(value === 'No' ? true : false)}
                            defaultValue={'No'}>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='frecuenciaDeSE'
                        label='¿Con qué frecuencia ocurre?'
                        className='lb-EstadoGenSelect'
                    /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select disabled={generalCheckBoca4} defaultValue={''}>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                        </Select>
                    </Form.Item>

                    <h2>Nacimiento</h2>
                    <Form.Item
                        name='tipoDeNacimiento'
                        label='Naciste por'
                        className='lb-EstadoGenSelect'
                        rules={[Rules.basicSpanish]}>
                        <Select defaultValue={''}>
                            <Option value={'Parto vaginal'}>Parto vaginal</Option>
                            <Option value={'Cesárea'}>Cesárea</Option>
                        </Select>
                    </Form.Item>
                    <div className="basicContainer">
                        <button
                            className='btn-see-circunferencia'
                            htmlType='submit'
                            /*onClick={() => updateEstadoGeneral()}*/
                            value='Add'>
                            Guardar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );

};

export default OverallStatus;