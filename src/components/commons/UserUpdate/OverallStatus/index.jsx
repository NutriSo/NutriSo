import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select} from 'antd';


import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './OverallStatus.scss'

const OverallStatus = ({id}) =>{
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
        <div className='containerEstadoGen'>
            <div className='basicInfo-Title3'>Estado general</div>
            <Form form={form} requiredMark={false} onFinish={updateEstadoGeneral}>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Mucho cansancio:</label>
                        <Form.Item
                            name='muchoCansancio'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select name='mCancancio' defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Mareos:</label>
                        <Form.Item name='mareos' className='lb-EstadoGenSelect' rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Mucha sed:</label>
                        <Form.Item name='muchaSed' className='lb-EstadoGenSelect' rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Muchas ganas de orinar:</label>
                        <Form.Item
                            name='muchasGanasDeOrinar'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Mucha Hambre:</label>
                        <Form.Item name='muchaHambre' className='lb-EstadoGenSelect' rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <div className='basicInfo-Title2'>Pies y manos</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Se hinchan sus pies o manos?</label>
                        <Form.Item
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿A qúe hora del día ocurre?</label>
                        <Form.Item
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
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con que frecuencia ocurre?</label>
                        <Form.Item
                            name='frecuencia'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Cuántas horas pasa sentado al día? </label>
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
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Cuántas horas pasa parado al día? </label>
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
                </div>
                <div className='basicInfo-Title2'>Nariz</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Sangrado de nariz:</label>
                        <Form.Item
                            name='sangradoDe'
                            className='lb-EstadoGenSelect'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre? </label>
                        <Form.Item
                            name='frecuenciaDe'
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
                    </div>
                </div>

                <div className='basicInfo-Title2'>Piel</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Manchas rojas en su piel o moretes sin motivo:</label>
                        <Form.Item
                            name='manchasRojasMoretes'
                            className='lb-EstadoGenSelect'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre? </label>
                        <Form.Item
                            name='frecuenciaDeEllo'
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
                    </div>
                </div>

                <div className='basicInfo-Title2'>Uñas</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Uñas quebradizas:</label>
                        <Form.Item
                            name='quebradizas'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>
                            ¿Ha realizado algún tratamiento estético en sus uñas recientemente?
                        </label>
                        <Form.Item
                            name='frecuencia2'
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
                    </div>
                </div>

                <div className='basicInfo-Title2'>Cabello</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Caída de cabello:</label>
                        <Form.Item
                            name='caidaDeCabello'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Cabello quebradizo</label>
                        <Form.Item
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
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>
                            ¿Tiene su cabello teñido o bajo algún tratamiento estético?
                        </label>
                        <Form.Item
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
                    </div>
                </div>
                <div className='basicInfo-Title2'>Boca</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Cortaduras en las comisuras de su boca:</label>
                        <Form.Item
                            name='cortadurasEnComisuras'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre?</label>
                        <Form.Item
                            name='frecuencia3'
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
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Inflamación en lengua:</label>
                        <Form.Item
                            name='inflamacionDeLengua'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre?</label>
                        <Form.Item
                            name='frecuenciaDe2'
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
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Inflamación de encías :</label>
                        <Form.Item
                            name='inflamacionEncias'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre?</label>
                        <Form.Item
                            name='frecuenciaDeIE'
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
                    </div>
                </div>
                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Sangrado de encías:</label>
                        <Form.Item
                            name='sangradoEncias'
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
                    </div>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>¿Con qué frecuencia ocurre?</label>
                        <Form.Item
                            name='frecuenciaDeSE'
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
                    </div>
                </div>
                <div className='basicInfo-Title2'>Nacimiento</div>

                <div className='basicInfo-Name-Container3'>
                    <div className='basicInfo-Name-Container4'>
                        <label className='id-estadoGen'>Naciste por:</label>
                        <Form.Item
                            name='tipoDeNacimiento'
                            className='lb-EstadoGenSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Parto vaginal'}>Parto vaginal</Option>
                                <Option value={'Cesárea'}>Cesárea</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className='basicInfo-Save-ContainerGen'>
                    <div className='basicInfo-Save-ContainerGen2'>
                        <button
                            className='btn-Save-basicInfoGen2'
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

export default OverallStatus;