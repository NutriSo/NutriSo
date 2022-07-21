import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './SocioeconomicData.scss'

const SocioeconomicData = ({ id }) => {
    const [infoSocioData, setInfoSocioData] = useState({});
    let [ingresosM, setIngresosMes] = useState('');
    let [educa, setEdcuacion] = useState('');
    let [ocupa, setOcupacion] = useState('');
    let [diasDeTXS, setDiasDeTXS] = useState('');
    let [modali, setModalidad] = useState('');
    let [horarioE, setHorarioEntrada] = useState('');
    let [horarioS, setHorarioS] = useState('');
    let [dineroDeAXMI, setDineroDeAlimentacionXMesInd] = useState('');
    let [dineroDeAXMH, setDineroDeAlimentacionXMesHog] = useState('');

    useEffect(() => {
        getSocioData();
        return () => {
            setInfoSocioData({});
        };
    }, []);

    useEffect(() => {
        if (infoSocioData?.id) {
        }
    }, [infoSocioData]);

    const getSocioData = async () => {
        try {
            const { data, status } = await apiURL.get(`/datosSocioeconomicos/individual?usuario=${id}`);
            
            setInfoSocioData(data);
        } catch (error) {
            console.groupCollapsed('Error en la funcion getSocioData');
            console.error(error);
            console.groupEnd();
        }
    };
    
    async function GuardarCambiosSocioData() {
        if (ingresosM !== '') {
        } else {
            ingresosM = infoSocioData.nivelSocioeconomico.ingresosMes;
        }

        if (educa !== '') {
        } else {
            educa = infoSocioData.nivelSocioeconomico.educacion;
        }

        if (ocupa !== '') {
        } else {
            ocupa = infoSocioData.nivelSocioeconomico.ocupacion;
        }

        if (diasDeTXS !== '') {
        } else {
            diasDeTXS = infoSocioData.nivelSocioeconomico.diasDeTrabajoXsemana;
        }

        if (modali !== '') {
        } else {
            modali = infoSocioData.nivelSocioeconomico.modalidad;
        }

        if (horarioE !== '') {
        } else {
            horarioE = infoSocioData.nivelSocioeconomico.horarioEntrada;
        }

        if (horarioS !== '') {
        } else {
            horarioS = infoSocioData.nivelSocioeconomico.horarioSalida;
        }

        if (dineroDeAXMI !== '') {
        } else {
            dineroDeAXMI = infoSocioData.nivelSocioeconomico.dineroDeAlimentacionXmesIndivi;
        }

        if (dineroDeAXMH !== '') {
        } else {
            dineroDeAXMH = infoSocioData.nivelSocioeconomico.dineroDeAlimentacionXmesHogar;
        }

        try {
            const body = {
                ingresosMes: ingresosM,
                educacion: educa,
                ocupacion: ocupa,
                diasDeTrabajoXsemana: diasDeTXS,
                modalidad: modali,
                horarioEntrada: horarioE,
                horarioSalida: horarioS,
                dineroDeAlimentacionXmesIndivi: dineroDeAXMI,
                dineroDeAlimentacionXmesHogar: dineroDeAXMH,
            };

            const res = await apiURL.patch(
                `/datosSocioeconomicos/individual?usuario=${id}`,
                body
            );
            console.log(res);
        } catch (error) {
            console.groupCollapsed('Error en la funcion GuardarCambiosSocioData');
            console.error(error);
            console.groupEnd();
        }

        getSocioData();
    }



    return (
        <div className='basicContainer'>
                <div className="containData">
                    <h2>Datos Socioeconomicos</h2>

                    <div className='basicInfo-ContainerSocioData'>
                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Ingreso Mensual:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.ingresosMes || ''}
                                type='text'
                                name='ingresosMes'
                                onChange={(event) => setIngresosMes(event.target.value)}></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Educación:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.educacion || ''}
                                type='text'
                                name='educacion'
                                onChange={(event) =>
                                    setEdcuacion(event.target.value)
                                }></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Ocupación:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.ocupacion || ''}
                                type='text'
                                name='ocupacion'
                                onChange={(event) =>
                                    setOcupacion(event.target.value)
                                }></input>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Dias de trabajo por semana:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.diasDeTrabajoXsemana || ''}
                                type='text'
                                name='diasDeTrabajoXsemana'
                                onChange={(event) => setDiasDeTXS(event.target.value)}></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Modalidad:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.modalidad || ''}
                                type='text'
                                name='modalidad'
                                onChange={(event) =>
                                    setModalidad(event.target.value)
                                }></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Horario de entrada:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.horarioEntrada || ''}
                                type='text'
                                name='horarioEntrada'
                                onChange={(event) =>
                                    setHorarioEntrada(event.target.value)
                                }></input>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Horario de salida:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.horarioSalida || ''}
                                type='text'
                                name='horarioSalida'
                                onChange={(event) => setHorarioS(event.target.value)}></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Dinero de alimentación por mes individual:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.dineroDeAlimentacionXmesIndivi || ''}
                                type='text'
                                name='dineroDeAlimentacionXmesIndivi'
                                onChange={(event) =>
                                    setDineroDeAlimentacionXMesInd(event.target.value)
                                }></input>
                        </div>

                        <div className="entradasSocioData">
                            <label className='id-nameSocioData'>Dinero de alimentación por mes del hogar:</label>
                            
                            <input
                                className='lb-name'
                                placeholder={infoSocioData?.nivelSocioeconomico?.dineroDeAlimentacionXmesHogar || ''}
                                type='text'
                                name='dinerDeAlimentacionXmesHogar'
                                onChange={(event) =>
                                    setDineroDeAlimentacionXMesHog(event.target.value)
                                }></input>
                        </div>
                    </div>
                    <div className='basicInfo-Save'>
                        <button
                            className='btn-see-circunferencia'
                            onClick={() => GuardarCambiosSocioData()}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
    );

};

export default SocioeconomicData;