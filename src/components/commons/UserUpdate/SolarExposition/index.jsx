import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './SolarExposition.scss'

const SolarExposition = ({id}) =>{
    const [form3] = Form.useForm();
    const [info, setInfo] = useState({});
    const [infoExpoSol, setInfoExpoSol] = useState({});
    const [ExpoSolChecBloSolar, setExpoSolCheckBloSolar] = useState({});

    
    useEffect(() => {
        getExpoSolar();

        return () => {
            
        };
    }, [id]);

    const getExpoSolar = async () => {
        try {
            const { data, status } = await apiURL.get(`/exposicionSolar/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const minutosAlSol = data[0]?.minutosAlSol.map((elem) => elem.valor);

                setInfoExpoSol({
                    minutosAlSol: minutosAlSol,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoExopSolar');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateExpoSol = async (values) => {
        try {
            if (infoExpoSol?.minutosAlSol) {
                const body = {
                    usuario: info.usuario,
                    minutosAlSol: {
                        valor: values.minutosAlSol,
                        fecha: new Date(),
                    },
                    cubresTuPiel: { valor: values.cubresTuPiel, fecha: new Date() },
                    bloqueadorSolar: ExpoSolChecBloSolar ? 'No' : { valor: values.bloqueadorSolar, fecha: new Date() },
                    diasXsemana: ExpoSolChecBloSolar ? 'N/A' : { valor: values.diasXsemana, fecha: new Date() },
                };
                console.log('Body', body);
                console.log('PATCH');

                const { data } = await apiURL.patch(`exposicionSolar/individual?usuario=${id}`, body);
                console.log(data);
            } else {
                const body = {
                    usuario: info.usuario,
                    minutosAlSol: [{ valor: values.minutosAlSol, fecha: new Date() }],
                    cubresTuPiel: [{ valor: values.cubresTuPiel, fecha: new Date() }],
                    bloqueadorSolar: [
                        ExpoSolChecBloSolar ? 'No' : { valor: values.bloqueadorSolar, fecha: new Date() },
                    ],
                    diasXsemana: [ExpoSolChecBloSolar ? 'N/A' : { valor: values.diasXsemana, fecha: new Date() }],
                };
                console.log('Body', body);
                console.log('POST');

                const { data } = await apiURL.post(`exposicionSolar/individual?usuario=${id}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateExpoSol');
            console.error(error);
            console.groupEnd();
        }
    };



    return (
        <div className='containerExpoSolar'>
            <div className='basicInfo-TitleExpoSol'>Expocición Solar</div>
            <Form form={form3} requiredMark={false} onFinish={updateExpoSol}>
                <div className='basicInfo-Name-ContainerES'>
                    <div className='basicInfo-Name-ContainerES2'>
                        <label className='id-expoSol'>¿Cuántos minutos te expones al sol al día</label>
                        <Form.Item
                            name='minutosAlSol'
                            className='lb-expoSolSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select name='mMinSol' defaultValue={''}>
                                <Option value={'Menos de 5 minutos'}>Menos de 5 minutos</Option>
                                <Option value={'5 a 10 minutos'}>5 a 10 minutos</Option>
                                <Option value={'10 a 15 minutos'}>10 a 15 minutos</Option>
                                <Option value={'15 a 20 minutos'}>15 a 20 minutos</Option>
                                <Option value={'20 a 30 minutos'}>20 a 30 minutos</Option>
                                <Option value={'30 minutos a 1 hora'}>30 minutos a 1 hora</Option>
                                <Option value={'Más de 1 hora'}>Más de 1 hora</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerES2'>
                        <label className='id-expoSol'>
                            ¿Cubres tu piel con ropa de manga larga, pantalón, gorra o sombrero?
                        </label>
                        <Form.Item
                            name='cubresTuPiel'
                            className='lb-expoSolSelect'
                            rules={[Rules.basicSpanish]}>
                            <Select defaultValue={''}>
                                <Option value={'Siempre'}>Siempre</Option>
                                <Option value={'A veces'}>A veces</Option>
                                <Option value={'Nunca'}>Nunca</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <div className='basicInfo-Name-ContainerES'>
                    <div className='basicInfo-Name-ContainerES2'>
                        <label className='id-expoSol'>¿Utilizas bloqueador solar?</label>
                        <Form.Item
                            name='bloqueadorSolar'
                            className='lb-expoSolSelect'
                            /*rules={[Rules.basicSpanish]}*/
                        >
                            <Select
                                onChange={(value) => setExpoSolCheckBloSolar(value === 'No' ? true : false)}
                                defaultValue={'No'}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='basicInfo-Name-ContainerES2'>
                        <label className='id-expoSol'>¿Cuántos días a la semana?</label>
                        <Form.Item
                            name='diasXsemana'
                            className='lb-expoSolSelect'
                            /*
                            rules={[
                                Rules.basicSpanish,
                            ]}*/
                        >
                            <Select disabled={ExpoSolChecBloSolar} defaultValue={''}>
                                <Option value={'1'}>1</Option>
                                <Option value={'2'}>2</Option>
                                <Option value={'3'}>3</Option>
                                <Option value={'4'}>4</Option>
                                <Option value={'5'}>5</Option>
                                <Option value={'6'}>6</Option>
                                <Option value={'7'}>7</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <div className='basicInfo-Save-Container'>
                    <div className='basicInfo-Save-Container2'>
                        <button
                            className='btn-Save-basicInfo3'
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

export default SolarExposition;