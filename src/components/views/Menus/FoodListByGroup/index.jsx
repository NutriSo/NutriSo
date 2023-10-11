import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';

import apiURL from '@/axios/axiosConfig';

import EquivalentCard from '../EquivalentCard';

import './FoodListByGroup.scss';

const FoodListByGroup = ({ category, onConfirm }) => {
    const [equivalents, setEquivalents] = useState([]);

    const fetchEquivalents = async () => {
        try {
            const { data } = await apiURL.get('/grupoAlimentos/detalles', {
                params: {
                    grupoAlimento: category,
                },
            });

            setEquivalents(data);
        } catch (error) {
            console.log('Error al obtener las equivalencias: ', error);
        }
    };

    useEffect(() => {
        if (!category) {
            return;
        }

        fetchEquivalents();
        return () => {
            setEquivalents([]);
        };
    }, [category]);

    return (
        <>
            <Divider orientation='left'>{category}</Divider>
            <section className='listGroupContainer'>
                {equivalents?.length > 0 ? (
                    equivalents.map((food) => (
                        <EquivalentCard
                            key={food.idAlimento}
                            id={food.idAlimento}
                            alimento={food.alimento}
                            cantidadSugerida={food.cantidadSugerida}
                            pesoNetoKg={food.pesoNetoKg}
                            unidad={food.unidad}
                            category={category}
                            onConfirm={onConfirm}
                        />
                    ))
                ) : (
                    <h3>Cargando...</h3>
                )}
            </section>
        </>
    );
};

export default FoodListByGroup;
