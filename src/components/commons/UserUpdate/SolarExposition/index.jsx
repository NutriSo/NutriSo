import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs, Form, Select } from 'antd';

import { capitilizeWord } from '../../../../utils';
import { Rules } from '../../../../utils/formRules';

import './SolarExposition.scss'

const SolarExposition = ({ id }) => {
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
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Expocición Solar</h2>
                <Form form={form3} requiredMark={false} onFinish={updateExpoSol}>

                    <Form.Item
                        name='minutosAlSol'
                        label='¿Cuántos minutos te expones al sol al día?'
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

                    <Form.Item
                        name='cubresTuPiel'
                        label='¿Cubres tu piel con ropa de manga larga, pantalón, gorra o sombrero?'
                        className='lb-expoSolSelect'
                        rules={[Rules.basicSpanish]}>
                        <Select defaultValue={''}>
                            <Option value={'Siempre'}>Siempre</Option>
                            <Option value={'A veces'}>A veces</Option>
                            <Option value={'Nunca'}>Nunca</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='bloqueadorSolar'
                        label='¿Utilizas bloqueador solar?'
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

                    <Form.Item
                        label='¿Cuántos días a la semana?'
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


                    <center>
                        <button
                            className='btn-see-circunferencia'
                            htmlType='submit'
                            /*onClick={() => updateEstadoGeneral()}*/
                            value='Add'>
                            Guardar
                        </button>
                    </center>
                </Form>
            </div>
        </div>
    );

};

export default SolarExposition;