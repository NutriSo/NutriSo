import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import UploadImgs from '@/components/commons/UploadImgs';
import apiURL from '@/axios/axiosConfig';

import './Points.scss';

const standardAvatar =
    'https://res.cloudinary.com/dwjv6orjf/image/upload/v1618875313/standard_avatar_txfgx5.png';

const columns = [
    {
        title: 'Foto',
        dataIndex: 'foto',
        width: 150,
        key: 'foto',
        render: (uri) => <UploadImgs url={uri ?? standardAvatar} />,
    },
    {
        title: 'Apellido Pat.',
        dataIndex: 'apellidoPaterno',
        width: 100,
        key: 'apellidoPaterno',
    },
    {
        title: 'Apellido Mat.',
        dataIndex: 'apellidoMaterno',
        width: 100,
        key: 'apellidoMaterno',
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        width: 100,
        key: 'nombre',
    },
    {
        title: 'Puntos',
        dataIndex: 'puntos',
        width: 50,
        key: 'puntos',
        sorter: (a, b) => a.puntos - b.puntos,
    },
    {
        title: 'Género',
        dataIndex: 'genero',
        width: 50,
        key: 'genero',
        sorter: (a, b) => a.genero.length - b.genero.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Ciudad',
        dataIndex: 'ciudadDeResidencia',
        width: 100,
        key: 'ciudadDeResidencia',
    },
    {
        title: 'Tiempo en la ciudad',
        dataIndex: 'tiempoViviendoAhi',
        width: 100,
        key: 'tiempoViviendoAhi',
    },
    {
        title: 'País',
        dataIndex: 'paisDeNacimiento',
        width: 100,
        key: 'paisDeNacimiento',
    },
];

const Points = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiURL.get('/puntosDeUsuario');

                setData(data);
            } catch (error) {}
        };

        fetchData();

        return () => {
            setData([]);
        };
    }, []);

    return (
        <div className='pointsContainer'>
            <Table
                sticky
                showSorterTooltip
                rowKey='usuario'
                columns={columns}
                pagination={false}
                dataSource={data}
                scroll={{ x: 600 }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            console.log(record);
                        },
                    };
                }}
            />
        </div>
    );
};

export default Points;
