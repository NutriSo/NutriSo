import React, { useState, useEffect, useMemo } from 'react';

import { Button, message } from 'antd';

import apiURL from '@/axios/axiosConfig';
import Loading from '@/components/commons/Loading';

import DietReg from './DietReg';
import Demographics from './Demographics';
import Groups from './Groups';
import SubGroup from './SubGroup';
import UltraProcessed from './UltraProcessed';
import AppropriateSubGroup from './AppropriateSubGroup';
import GroupsByDay from './GroupsByDay';
import Yesterday from './Yesterday';
import Smae from './SMAE';

import { getIsSelected } from './utils';
import { opciones, initialState } from './data';

import './Exports.scss';

const Exports = () => {
    const [registers, setRegisters] = useState([]);
    const [selected, setSelected] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const uniqueUserIds = useMemo(() => {
        const ids = registers.map((item) => item.usuario);
        const uniqueIds = [...new Set(ids)];
        return uniqueIds;
    }, [registers]);

    const handleClick = (id) => {
        setLoading(true);
        setSelected({ ...initialState, [id]: true });
    };

    const getRegisters = async () => {
        try {
            const { data } = await apiURL.get('registroDietetico/usuarios');
            setRegisters(data);
        } catch (error) {
            message.error('Ocurrió un error al obtener los ids de los usuarios');
        }
    };

    useEffect(() => {
        if (!loading) {
            setSelected(initialState);
        }
    }, [loading]);

    useEffect(() => {
        getRegisters();
        return () => {
            setSelected(initialState);
            setLoading(false);
            setRegisters([]);
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
                            <DietReg
                                selected={selected[0]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 1, index) && (
                            <Demographics selected={selected[1]} setLoading={setLoading} />
                        )}
                        {getIsSelected(selected, 2, index) && (
                            <Groups
                                selected={selected[2]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 3, index) && (
                            <SubGroup
                                selected={selected[3]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 4, index) && (
                            <UltraProcessed
                                selected={selected[4]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 5, index) && (
                            <AppropriateSubGroup
                                selected={selected[5]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}

                        {getIsSelected(selected, 6, index) && (
                            <Smae
                                selected={selected[6]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 7, index) && <div />}
                        {getIsSelected(selected, 8, index) && (
                            <GroupsByDay
                                selected={selected[8]}
                                setLoading={setLoading}
                                users={uniqueUserIds}
                            />
                        )}
                        {getIsSelected(selected, 9, index) && (
                            <Yesterday selected={selected[9]} 
                                       setLoading={setLoading}
                                       users={uniqueUserIds} />
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
