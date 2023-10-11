import React, { useState, useEffect } from 'react';
import { message, Divider, Input, Button } from 'antd';

import apiURL from '@/axios/axiosConfig';

import FoodGroupCardList from './FoodGroupCardList';
import FoodListByGroup from './FoodListByGroup';
import { backgroundColors } from './FoodGroupCard/constants/backgroundColors';
import './Menus.scss';

const Menus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [menuName, setMenuName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuPreparation, setMenuPreparation] = useState([]);

    const handleOnClear = () => {
        setMenuName('');
        setSelectedCategory(null);
        setMenuPreparation([]);
    };

    const handleOnChangeMenuName = (e) => {
        setMenuName(e.target.value);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleOnConfirmEquivalence = (payload) => {
        const newMenuPreparation = [...menuPreparation, payload];
        setMenuPreparation(newMenuPreparation);
    };

    const handleRemoveFood = (id) => {
        const filteredMenuPreparation = menuPreparation.filter(
            (food) => food.id !== id
        );

        setMenuPreparation(filteredMenuPreparation);
    };

    const handleSaveMenu = async () => {
        if (!menuName) {
            message.warn('Debes agregar un nombre al menu');
            return;
        }

        if (!selectedCategory) {
            message.warn('Debes seleccionar una categoria');
            return;
        }

        if (menuPreparation.length === 0) {
            message.warn('Debes agregar alimentos al menu');
            return;
        }

        try {
            setIsLoading(true);

            const menu = {
                titulo: menuName,
                ingredientes: menuPreparation,
                categoria: selectedCategory,
            };

            const { status } = await apiURL.post('/menusBase', menu);

            if (status === 200) {
                message.success('El menú se ha creado correctamente');
                handleOnClear();
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            message.error('Ocurrió un error al crear el menú');
        }
    };

    useEffect(() => {
        return () => {
            handleOnClear();
        };
    }, []);

    return (
        <section className='layout'>
            <header>
                <Divider orientation='left'>Nombre del menu</Divider>
                <Input
                    placeholder='Agrega el nombre del menu'
                    value={menuName}
                    onChange={handleOnChangeMenuName}
                />
                <Button
                    type='primary'
                    onClick={handleSaveMenu}
                    loading={isLoading}>
                    Guardar menu
                </Button>
            </header>
            <section className='badgesContainer'>
                <Divider orientation='left'>Alimentos del menu</Divider>
                <div className='badgesList'>
                    {menuPreparation.map((food) => (
                        <span
                            key={food.id}
                            className='itemBadge'
                            style={{
                                backgroundColor:
                                    backgroundColors[food.category],
                            }}
                            onClick={() => handleRemoveFood(food.id)}>
                            {`${food.alimento} ${food.cantidad} ${food.unidad}`}
                        </span>
                    ))}
                </div>
            </section>
            <FoodGroupCardList
                onSelectCategory={handleSelectCategory}
                selectedCategory={selectedCategory}
            />
            {selectedCategory !== null && (
                <FoodListByGroup
                    category={selectedCategory}
                    onConfirm={handleOnConfirmEquivalence}
                />
            )}
        </section>
    );
};

export default Menus;
