import React, { useState, useEffect } from 'react';

import { Button, message, Table, Form, Input, InputNumber } from 'antd';
import apiURL from '../../../axios/axiosConfig';

import Dropdown from '../../commons/Dropdown';
import PointsTable from './PointsTable';

import './Imports.scss';

import { Rules } from '../../../utils/formRules';

const Imports = () => {
    const [ form ] = Form.useForm();
    const [ exercises, setExercises ] = useState([]);
    const [ pointsByExcersice, setPointsByExcersice ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        fetchExcerises();
        fetchPointsExcerises();
        return () => {
            setLoading(false);
        };
    }, [ loading === true ]);

    const fetchExcerises = async () => {
        try {
            const { data } = await apiURL.get('/ejercicios/');

            setExercises(data);
        } catch (error) {
            console.log('Error', error);
            message.error(
                'Error al obtener los ejercicios, refresque la ventana'
            );
            setLoading(false);
        }
    };

    const fetchPointsExcerises = async () => {
        try {
            const { data } = await apiURL.get('/puntosPorEjercicio/all');
            setPointsByExcersice(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            message.error('Error al cargar los datos, refresque la ventana');
            setLoading(false);
        }
    };

    const onFinish = (values) => {
        const { _id } = exercises.filter(
            (exercise) =>
                exercise.nombre.toLowerCase().trim() ===
                values.ejercicio.toLowerCase().trim()
        )[ 0 ];

        const data = {
            ejercicio: _id,
            grupo: values.grupo,
            puntos: values.puntos,
            duracion: values.duracion,
            intensidad: values.intensidad,
        };

        postData(data);
        setLoading(false);
    };

    const postData = async (exercise) => {
        try {
            const { data, status } = await apiURL.post(
                '/puntosPorEjercicio/',
                exercise
            );

            if (status === 200) {
                message.success('Se ha agregado el ejercicio');
                fetchExcerises();
                setLoading(true);
            }
        } catch (error) {
            console.log('Error', error);
            message.error('Error al crear el ejercicio');
            setLoading(false);
        }
    };

    return (
        <div className='pointsPerFood'>
            <h2>Agregar nuevo</h2>
            <div className='informationArea'>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                    requiredMark='optional'>
                    <div className='formArea'>
                        <Form.Item
                            name='ejercicio'
                            label='Ejercicio'
                            rules={[ Rules.basic ]}>
                            <Dropdown
                                data={exercises}
                                placeholder='Selecciona el ejercicio'
                            />
                        </Form.Item>
                        <Form.Item
                            name='grupo'
                            label='Grupo'
                            rules={[ Rules.basic ]}>
                            <Dropdown
                                data={types}
                                placeholder='Cardiovasculares'
                            />
                        </Form.Item>
                        <Form.Item
                            name='duracion'
                            label='Duración'
                            rules={[ Rules.basic ]}>
                            <Dropdown
                                data={duration}
                                placeholder='Menos de 10'
                            />
                        </Form.Item>
                        <Form.Item
                            name='intensidad'
                            label='Intensidad'
                            rules={[ Rules.basic ]}>
                            <Dropdown data={intensity} placeholder='Leve' />
                        </Form.Item>
                        <Form.Item
                            name='puntos'
                            label='Puntos'
                            rules={[ Rules.basic ]}>
                            <InputNumber
                                placeholder='0.5'
                                min={0}
                                max={100}
                                type='number'
                            />
                        </Form.Item>
                    </div>

                    <Button loading={loading} htmlType='submit' type='primary'>
                        Guardar
                    </Button>
                </Form>
            </div>
            <h2>Lista de ejercicios</h2>
            <div className='table-container'>
                <PointsTable exercises={pointsByExcersice} />
            </div>
        </div>
    );
};

export default Imports;

export const types = [
    {
        id: 1,
        description: 'Cardiovasculares',
    },
    {
        id: 2,
        description: 'Resistencia',
    },
];

export const intensity = [
    {
        id: 1,
        description: 'Leve',
    },
    {
        id: 2,
        description: 'Moderada',
    },
    {
        id: 3,
        description: 'Intenso',
    },
];

export const duration = [
    {
        id: 1,
        description: 'Menos de 10',
    },
    {
        id: 2,
        description: 'De 10 a 29',
    },
    {
        id: 3,
        description: 'De 30 a 59',
    },
    {
        id: 4,
        description: 'De 60 a 120',
    },
    {
        id: 5,
        description: 'De 121 a 240',
    },
    {
        id: 6,
        description: 'Más de 240',
    },
];
