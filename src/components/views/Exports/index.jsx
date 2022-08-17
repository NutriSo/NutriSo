import React, { useState, useEffect } from 'react';

import { Button } from 'antd';

import Loading from '@/components/commons/Loading';

import DietReg from './DietReg';
import Demographics from './Demographics';
import Groups from './Groups';
import SubGroup from './SubGroup';
import UltraProcessed from './UltraProcessed';
import AppropriateSubGroup from './AppropriateSubGroup';

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
        if (!loading) {
            setSelected(initialState);
        }
    }, [loading]);

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
                        {getIsSelected(selected, 4, index) && (
                            <SubGroup selected={selected[4]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 5, index) && (
                            <UltraProcessed selected={selected[5]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 6, index) && (
                            <AppropriateSubGroup
                                selected={selected[6]}
                                setLoading={setLoading}
                            />
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
