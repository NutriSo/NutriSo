import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';

import apiURL from '@/axios/axiosConfig';
import Loading from '@/components/commons/Loading';

import FoodGroupCard from '../FoodGroupCard';

import '../Menus.scss';

const FoodGroupCardList = ({ onSelectCategory, selectedCategory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        setIsLoading(true);
        try {
            const { data } = await apiURL.get('/grupoAlimentos');

            setGroups(data);
            setIsLoading(false);
        } catch (error) {
            console.log('Error al obtener los grupos: ', error?.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
        return () => {
            setGroups([]);
            setIsLoading(false);
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading size={50} variant='none' />
            ) : (
                <>
                    <Divider orientation='left'>
                        Selección de categoria de alimentos
                    </Divider>
                    <section className='listContainer'>
                        {groups?.map((group) => (
                            <FoodGroupCard
                                key={group.grupoDeAlimento}
                                category={group.grupoDeAlimento}
                                onSelectCategory={onSelectCategory}
                                isSelected={
                                    selectedCategory === group.grupoDeAlimento
                                }
                            />
                        ))}
                    </section>
                </>
            )}
        </>
    );
};

export default FoodGroupCardList;
