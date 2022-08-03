import React, { useEffect, useState } from 'react';
import { Col, Input, Space, Image, Row, message } from 'antd';

import apiURL from '@/axios/axiosConfig';

const Listas = () => {
    const [initialData, setInitialData] = useState([]);
    const [list, setList] = useState([]);

    const { Search } = Input;

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/ejercicios');
            setInitialData(data);
            setList(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const onSearch = (target) => {
        setList(initialData.filter((ejercicios) => ejercicios.nombre.includes(target)));
    };

    useEffect(() => {
        fetchData();
    }, []);

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
