import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Form, message } from 'antd';

import InputTags from '../../InputTags';
import Historial from '../../../commons/Historial';
import { isEmptyObject } from '../../../../utils';

const Background = ({ id }) => {
    const [form] = Form.useForm();
    const [familiares, setFamiliares] = useState([]);
    const [patologicos, setPatologicos] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [suplementos, setSuplementos] = useState([]);

    const fetchData = async () => {
        try {
            const { data, status } = await apiURL.get(
                `historialClinico/individual?usuario=${id}`
            );

            if (!isEmptyObject(data)) {
                const { historiaClinica } = data;
                const {
                    antecedentesHeredoFamiliares,
                    antecedentesPatologicos,
                    medicamentos,
                    suplementos,
                } = historiaClinica;

                setFamiliares(antecedentesHeredoFamiliares);
                setPatologicos(antecedentesPatologicos);
                setMedicamentos(medicamentos);
                setSuplementos(suplementos);
            }
        } catch (error) {
            console.groupCollapsed('Error en la función antecedentes clínicos');
            console.error(error);
            console.groupEnd();
        }
    };

    const onFinish = async (values) => {};

    useEffect(() => {
        fetchData();

        // return () => {
        //     setBioquimicosDates({});
        // };
    }, [id]);

    return (
        <div className='basicContainer'>
            <div className='containData'>
                <h2>Antecedentes patológicos</h2>
                <Form
                    scrollToFirstError
                    form={form}
                    requiredMark={false}
                    layout='vertical'
                    onFinish={onFinish}>
                    <div className='basicInfo-ContainerSocioData'>
                        <div className='entradasSocioData'>
                            <Form.Item label='Heredo-Familiares' name='familiares'>
                                <Historial source={familiares} />
                            </Form.Item>
                        </div>
                        <div className='entradasSocioData'>
                            <Form.Item label='Patológicos' name='patologicos'>
                                <InputTags
                                    source={patologicos}
                                    onUpdateOptions={() => {}}
                                    onRemoveTag={() => {}}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Background;
