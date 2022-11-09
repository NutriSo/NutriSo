import React, { useState, useEffect } from 'react';

import { Button } from 'antd';

import Loading from '@/components/commons/Loading';

import DietReg from './DietReg';
import Demographics from './Demographics';
import Groups from './Groups';
import SubGroup from './SubGroup';
import UltraProcessed from './UltraProcessed';
import AppropriateSubGroup from './AppropriateSubGroup';
import GroupsByDay from './GroupsByDay';
import SubGroupsByDay from './SubGroupsByDay';
import Yesterday from './Yesterday';

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
                        {getIsSelected(selected, 0, index) && (
                            <DietReg selected={selected[0]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 1, index) && (
                            <Demographics selected={selected[1]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 2, index) && (
                            <Groups selected={selected[2]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 3, index) && (
                            <SubGroup selected={selected[3]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 4, index) && (
                            <UltraProcessed selected={selected[4]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 5, index) && (
                            <AppropriateSubGroup
                                selected={selected[5]}
                                setLoading={setLoading}
                            />
                        )}
                        {getIsSelected(selected, 6, index) && <div />}
                        {getIsSelected(selected, 7, index) && <div/>}
                        {getIsSelected(selected, 8, index) && (
                            <GroupsByDay selected={selected[8]} setLoading={setLoading} />
                        )}
                        
                        {getIsSelected(selected, 9, index) && (
                            <Yesterday selected={selected[9]} setLoading={setLoading}/>

                        )}
                        {selected[index] === false && (
                            <Button onClick={() => handleClick(index)}>
                                Exportar archivo
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            <div style={{ display: 'none' }} />
        </>
    );
};

export default Exports;
