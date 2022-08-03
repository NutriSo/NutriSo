import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import apiURL from '../../../../axios/axiosConfig';
import { Rules } from '../../../../utils/formRules';

import './HoursOfSleep.scss';

const HoursOfSleep = ({ id }) => {
    const [form] = Form.useForm();
    const [infoHoursSleep, setInfoHoursSleep] = useState({});
    const [hoursSleepCheckDespierta, setHoursSleepCheckDespierta] = useState({});

    useEffect(() => {
        getHoursSleep();

        return () => {};
    }, [id]);

    const getHoursSleep = async () => {
        try {
            const { data, status } = await apiURL.get(`/sueno/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const horasDeSueno = data[0]?.horasDeSueno.map((elem) => elem.valor);
                const estadoDeDescanso = data[0]?.estadoDeDescanso.map((elem) => elem.valor);
                const despiertaPorLaNoche = data[0]?.despiertaPorLaNoche.map(
                    (elem) => elem.valor
                );
                const frecuencia = data[0]?.frecuencia.map((elem) => elem.valor);
                setInfoHoursSleep({
                    horaDeSueno: horasDeSueno,
                    estadoDeDescanso: estadoDeDescanso,
                    despiertaPorLaNoche: despiertaPorLaNoche,
                    frecuencia: frecuencia,
                });
                console.log('DATA: ', infoHoursSleep);
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoHoursSleep');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateHoursSleep = async (values) => {
        console.log('This function is currently unavailable');
        /*try {
      if (infoHoursSleep?.horaDeSueno) {
        const body = {
          usuario: info.usuario,
          horaDeSueno: {
            valor: values.horaDeSueno,
            fecha: new Date(),
          },
          estadoDeDescanso: {
            valor: values.estadoDeDescanso,
            fecha: new Date(),
          },
          despiertaPorLaNoche: hoursSleepCheckDespierta
            ? "No"
            : { valor: values.despiertaPorLaNoche, fecha: new Date() },
          frecuencia: hoursSleepCheckDespierta
            ? "N/A"
            : { valor: values.frecuencia, fecha: new Date() },
        };
        console.log("Body", body);
        console.log("PATCH");

        const { data } = await apiURL.patch(
          `sueno/individual?usuario=${id}`,
          body
        );
        console.log(data);
      } else {
        const body = {
          usuario: info.usuario,
          horaDeSueno: [{ valor: values.horaDeSueno, fecha: new Date() }],
          estadoDeDescanso: [
            { valor: values.estadoDeDescanso, fecha: new Date() },
          ],
          despiertaPorLaNoche: [
            hoursSleepCheckDespierta
              ? "No"
              : { valor: values.despiertaPorLaNoche, fecha: new Date() },
          ],
          frecuencia: [
            hoursSleepCheckDespierta
              ? "N/A"
              : { valor: values.frecuencia, fecha: new Date() },
          ],
        };
        console.log("Body", body);
        console.log("POST");

        const { data } = await apiURL.post(
          `sueno/individual?usuario=${id}`,
          body
        );
        console.log(data);
      }
    } catch (error) {
      console.groupCollapsed("[ERROR] updateHoursSleep");
      console.error(error);
      console.groupEnd();
    }*/
    };

    return (
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Horas de Sueño</h2>
                <Form form={form} requiredMark={false} onFinish={updateHoursSleep}>
                    <div className='labels'>
                        <p>¿Cuántas horas duerme al día?</p>
                    </div>
                    <div className='inputs'>
                        <Form.Item name='horasDeSueno'>
                            <input
                                type='text'
                                name='hSueno'
                                className='lb-EstadoGen2'
                                placeholder={infoHoursSleep?.horaDeSueno || ''}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name='cubresTuPiel'
                        label='¿Descansa?'
                        className='descansa'
                        rules={[Rules.basicSpanish]}>
                        <Select
                            placeholder={
                                infoHoursSleep?.estadoDeDescanso || 'Selecione una opción'
                            }>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                            <Option value={'Mas o menos'}>Mas o menos</Option>
                            <Option value={'Solo algunos días'}>Solo algunos días</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='despiertaNoche'
                        label='¿Despierta durante la noche?'
                        className='hourSleepSelect'
                        /*rules={[Rules.basicSpanish]}*/
                    >
                        <Select
                            onChange={(value) =>
                                setHoursSleepCheckDespierta(value === 'No' ? true : false)
                            }
                            placeholder={
                                infoHoursSleep?.despiertaPorLaNoche || 'Selecione una opción'
                            }>
                            <Option value={'Si'}>Si</Option>
                            <Option value={'No'}>No</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='¿Con que frecuencia ocurre?'
                        name='frecuenciaSueno'
                        className='hourSleepSelect'
                        /*
                    rules={[
                        Rules.basicSpanish,
                    ]}*/
                    >
                        <Select
                            disabled={hoursSleepCheckDespierta}
                            placeholder={
                                infoHoursSleep?.frecuencia || 'Selecione una opción'
                            }>
                            <Option value={'Casi todos los días'}>Casi todos los días</Option>
                            <Option value={'1 a 3 veces a la semana'}>
                                1 a 3 veces a la semana
                            </Option>
                            <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
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

export default HoursOfSleep;
