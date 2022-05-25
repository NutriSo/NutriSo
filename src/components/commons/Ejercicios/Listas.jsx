import { AlignCenterOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Col, Input, Space, Image, Row, message } from 'antd';
import apiURL from '../../../axios/axiosConfig';

const Listas = () => {
    const [initialData, setInitialData] = useState([]);
    const [list, setList] = useState([]);
    let cont;
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/ejercicios');
            setInitialData(data);
            setList(data);
            console.log(list);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };
    console.log(list);
    const { Search } = Input;

    const onSearch = (target) => {
        console.log(target);
        setList(initialData.filter((ejercicios) => ejercicios.nombre.includes(target)));
        console.log(target);
    };

    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={22}>
                    <Space direction='vertical' style={{ width: '90%', padding: 20 }}>
                        <Search
                            size='large'
                            placeholder='Buscar por nombre'
                            allowClear
                            defaultValue={list}
                            onSearch={onSearch}
                            style={{ width: 1000 }}
                        />
                    </Space>
                </Col>
            </Row>
            <div className='li'>
                <Row>
                    <h1>Ejercicios</h1>
                </Row>
                <Row>
                    {list.map((ejercicios) => (
                        <Col span={8}>
                            <h5>Ejercicio: {ejercicios.nombre}</h5>
                            <p>Categoría: {ejercicios.categoria}</p>
                            <Image
                                id='img'
                                width={200}
                                src='https://www.timbrit.cl/blog/wp-content/uploads/2020/04/Ejercicios-de-cardio-en-casa-saltar-cuerda-1024x700.jpg'
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Listas;
/*
export const intensidad = [
    {
        id: 1,
        name: 'Intenso'
    },
    {
        id: 2,
        name: 'Moderado'
    },
    {
        id: 3,
        name: 'Leve'
    }
];

export const duracion = [
    {
        id: 1,
        name: 'Menos de 10'
    },
    {
        id: 2,
        name: 'De 10 a 29'
    },
    {
        id: 3,
        name: 'De 30 a 59'
    },
    {
        id: 4,
        name: 'De 60 a 120'
    },
    {
        id: 5,
        name: 'De 121 a 240'
    },
    {
        id: 6,
        name: 'Más de 240'
    }
];*/
