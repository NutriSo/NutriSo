import React, { useState, useEffect } from 'react';

import { Button } from 'antd';

import DietReg from './DietReg';
import Demographics from './Demographics';
import Groups from './Groups';
import Loading from '../../commons/Loading';

import { getIsSelected } from './utils';
import { opciones, initialState } from './data';

import './Exports.scss';

const Exports = () => {
    const [selected, setSelected] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleClick = (id) => {
        setLoading(true);
        setSelected({ ...initialState, [id]: true });
    };

    useEffect(() => {
        return () => {
            setSelected(initialState);
            setLoading(false);
        };
    }, []);

    return (
        <>
            {loading && <Loading size={50} />}
            <div className='ExpContainer'>
                {opciones.map((opcion, index) => (
                    <div className='bordeBE'>
                        <h2>{opcion.titulo}</h2>
                        {getIsSelected(selected, 1, index) && (
                            <DietReg selected={selected[1]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 2, index) && (
                            <Demographics selected={selected[2]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 3, index) && (
                            <Groups selected={selected[3]} setLoading={setLoading} />
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
