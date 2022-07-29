import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Form, message, Select } from 'antd';

import { Rules } from '../../../../utils/formRules';
import mocks from '../../../../mocks/estadisticasUsuario';

import './SocioeconomicData.scss';

const defaultPlaceholder = 'Seleccione una opción';

const SocioeconomicData = ({ id }) => {
    const [form] = Form.useForm();
    const [ingresosM, setIngresosMes] = useState('');
    const [educacion, setEducacion] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [diasDeTXS, setDiasDeTXS] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [horarioE, setHorarioEntrada] = useState('');
    const [horarioS, setHorarioSalida] = useState('');
    const [dineroDeAXMI, setDineroDeAlimentacionXMesInd] = useState('');
    const [dineroDeAXMH, setDineroDeAlimentacionXMesHog] = useState('');

    const { Option } = Select;

    useEffect(() => {
        getSocioData();
        return () => {
            setIngresosMes('');
            setEducacion('');
            setDiasDeTXS('');
            setDineroDeAlimentacionXMesHog('');
            setDineroDeAlimentacionXMesInd('');
            setHorarioEntrada('');
            setHorarioSalida('');
            setModalidad('');
            setOcupacion('');
        };
    }, []);

    const getSocioData = async () => {
        try {
            const { data } = await apiURL.get(
                `/datosSocioeconomicos/individual?usuario=${id}`
            );

            if (data) {
                const { nivelSocioeconomico } = data;
                const {
                    ingresosMes,
                    educacion,
                    diasDeTrabajoXsemana,
                    dineroDeAlimentacionXmesHogar,
                    dineroDeAlimentacionXmesIndivi,
                    horarioEntrada,
                    horarioSalida,
                    modalidad,
                    ocupacion,
                } = nivelSocioeconomico;

                setIngresosMes(ingresosMes);
                setEducacion(educacion);
                setDiasDeTXS(diasDeTrabajoXsemana);
                setDineroDeAlimentacionXMesHog(dineroDeAlimentacionXmesHogar);
                setDineroDeAlimentacionXMesInd(dineroDeAlimentacionXmesIndivi);
                setHorarioEntrada(horarioEntrada);
                setHorarioSalida(horarioSalida);
                setModalidad(modalidad);
                setOcupacion(ocupacion);
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion getSocioData');
            console.error(error);
            console.groupEnd();
        }
    };

    const guardarCambiosSocioData = async (values) => {
        try {
            const body = {
                nivelSocioeconomico: {
                    ingresosMes: ingresosM,
                    educacion: educacion,
                    ocupacion: ocupacion,
                    diasDeTrabajoXsemana: diasDeTXS,
                    modalidad: modalidad,
                    horarioEntrada: horarioE,
                    horarioSalida: horarioS,
                    dineroDeAlimentacionXmesIndivi: dineroDeAXMI,
                    dineroDeAlimentacionXmesHogar: dineroDeAXMH,
                },
            };

            const res = await apiURL.patch(
                `/datosSocioeconomicos/individual?usuario=${id}`,
                body
            );
            console.log(res);
            message.success('Datos actualizados!');
        } catch (error) {
            console.groupCollapsed('Error en la funcion GuardarCambiosSocioData');
            console.error(error);
            console.groupEnd();
            message.error('Ocurrió un error al actualizar los datos');
        }

        getSocioData();
    };

    return (
        <div className='basicContainer socioContainer'>
            <div className='containData'>
                <h2>Datos Socioeconomicos</h2>
                <Form
                    scrollToFirstError
                    form={form}
                    requiredMark={false}
                    layout='vertical'
                    onFinish={guardarCambiosSocioData}>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item label='Ingreso mensual' name='ingresosMes'>
                                <Select
                                    placeholder={ingresosM ?? defaultPlaceholder}
                                    value={ingresosM}
                                    onChange={(value) => setIngresosMes(value)}>
                                    {mocks.socioeconomico.ingresoMensual.map(
                                        ({ label, value }) => (
                                            <Option value={value}>{label}</Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item label='Educación' name='educacion'>
                                <Select
                                    placeholder={educacion ?? defaultPlaceholder}
                                    value={educacion}
                                    onChange={(value) => setEducacion(value)}>
                                    {mocks.socioeconomico.estudio.map(({ label, value }) => (
                                        <Option value={value}>{label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item label='Ocupación' name='ocupacion'>
                                <Select
                                    placeholder={ocupacion ?? defaultPlaceholder}
                                    value={ocupacion}
                                    onChange={(value) => setOcupacion(value)}>
                                    {mocks.socioeconomico.ocupacion.map(
                                        ({ label, value }) => (
                                            <Option value={value}>{label}</Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Días de trabajo por semana'
                                name='diasDeTrabajoXsemana'>
                                <Select
                                    placeholder={diasDeTXS ?? defaultPlaceholder}
                                    value={diasDeTXS}
                                    onChange={(value) => setDiasDeTXS(value)}>
                                    {mocks.socioeconomico.jornada.map(({ label, value }) => (
                                        <Option value={value}>{label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item label='Modalidad' name='modalidad'>
                                <Select
                                    placeholder={modalidad ?? defaultPlaceholder}
                                    value={modalidad}
                                    onChange={(value) => setModalidad(value)}>
                                    {mocks.socioeconomico.modalidad.map(
                                        ({ label, value }) => (
                                            <Option value={value}>{label}</Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item label='Horario de entrada' name='horarioEntrada'>
                                <input
                                    className='lb-name'
                                    placeholder={horarioE ?? 'Ingrese un horario'}
                                    type='text'
                                    name='horarioEntrada'
                                    onChange={(event) =>
                                        setHorarioEntrada(event.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item label='Horario de salida' name='horarioSalida'>
                                <input
                                    className='lb-name'
                                    placeholder={horarioS ?? 'Ingrese un horario'}
                                    type='text'
                                    name='horarioSalida'
                                    onChange={(event) => setHorarioSalida(event.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Dinero de alimentación por mes individual'
                                name='dineroDeAlimentacionXmesIndivi'>
                                <Select
                                    placeholder={dineroDeAXMI ?? defaultPlaceholder}
                                    value={dineroDeAXMI}
                                    onChange={(value) =>
                                        setDineroDeAlimentacionXMesInd(value)
                                    }>
                                    {mocks.socioeconomico.alimentosIndividual.map(
                                        ({ label, value }) => (
                                            <Option value={value}>{label}</Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item
                                label='Dinero de alimentación por mes del hogar'
                                name='dinerDeAlimentacionXmesHogar'>
                                <Select
                                    placeholder={dineroDeAXMH ?? defaultPlaceholder}
                                    value={dineroDeAXMH}
                                    onChange={(value) =>
                                        setDineroDeAlimentacionXMesHog(value)
                                    }>
                                    {mocks.socioeconomico.alimentosHogar.map(
                                        ({ label, value }) => (
                                            <Option value={value}>{label}</Option>
                                        )
                                    )}
                                </Select>
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

export default SocioeconomicData;
