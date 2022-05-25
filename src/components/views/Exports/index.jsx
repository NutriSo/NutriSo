import React, { useState, useEffect, useMemo } from 'react';

import { Button } from 'antd';

import DietReg from './DietReg';
import Demographics from './Demographics';
import Loading from '../../commons/Loading';

import './Exports.scss';

const opciones = [
    { id: 1, titulo: 'Registro dietéticos' },
    { id: 2, titulo: 'Datos demográficos' },
    { id: 3, titulo: 'Subgrupo adecuada' },
    { id: 4, titulo: 'Economía de fichas' },
    /* { id: 5, titulo: 'Opcion 5' },
    { id: 6, titulo: 'Opcion 6' },
    { id: 7, titulo: 'Opcion 7' },
    { id: 8, titulo: 'Opcion 8' }, */
];

const Exports = () => {
    const initialData = Object.freeze({
        1: false,
        2: false,
        3: false,
        4: false,
        /* 5: false,
        6: false,
        7: false,
        8: false, */
    });
    const [selected, setSelected] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleClick = (id) => {
        setLoading(true);
        setSelected({ ...initialData, [id]: true });
    };

    return (
        <>
            {loading && <Loading size={50} />}
            <div className='ExpContainer'>
                {opciones.map((opcion, index) => (
                    <div className='bordeBE'>
                        <h2>{opcion.titulo}</h2>
                        {selected[1] === true && index === 0 && (
                            <DietReg selected={selected[1]} setLoading={setLoading} />
                        )}
                        {selected[2] === true && index === 1 && (
                            <Demographics selected={selected[2]} setLoading={setLoading} />
                        )}
                        {selected[index + 1] === false && (
                            <Button onClick={() => handleClick(index + 1)}>
                                Exportar archivo
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            <div style={{ display: 'none' }}></div>
        </>
    );
};

export default Exports;
