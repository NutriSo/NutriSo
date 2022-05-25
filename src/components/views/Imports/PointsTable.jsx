import React from 'react';

import { Table } from 'antd';

const PointsTable = ({ exercises }) => {
    return (
        <Table
            rowKey='_id'
            columns={columns}
            dataSource={exercises}
            scroll={{ y: 300 }}
        />
    );
};

export default PointsTable;

export const columns = [
    {
        title: 'Ejercicio',
        dataIndex: [ 'ejercicio', 'nombre' ],
        key: 'nombre',
    },
    {
        title: 'Categoria',
        dataIndex: [ 'ejercicio', 'categoria' ],
        key: 'categoria',
    },
    {
        title: 'Duración',
        dataIndex: 'duracion',
        key: 'duracion',
    },
    {
        title: 'Intensidad',
        dataIndex: 'intensidad',
        key: 'intensidad',
    },
    {
        title: 'Puntos',
        dataIndex: 'puntos',
        key: 'puntos',
    },
];
