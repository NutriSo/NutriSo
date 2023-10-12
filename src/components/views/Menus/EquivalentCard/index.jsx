/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Select, Modal, Button, Input, InputNumber } from 'antd';

import mocks from '../../../../mocks/alimentos';

import styles from './EquivalentCard.scss';

const EquivalentCard = ({
    id,
    alimento,
    cantidadSugerida,
    pesoNetoKg,
    unidad,
    category,
    onConfirm,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentName, setCurrentName] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(cantidadSugerida);
    const [currentUnit, setCurrentUnit] = useState('');

    const { Option } = Select;

    const handleNameChange = (e) => {
        setCurrentName(e.target.value);
    };

    const handleOnChangeQuantity = (value) => {
        if (!value) {
            setCurrentQuantity('1');
            return;
        }

        setCurrentQuantity(String(value));
    };

    const handleAddFoodToBaseMenu = () => {
        const payload = {
            id: id,
            alimento: currentName,
            cantidad: currentQuantity ?? cantidadSugerida,
            unidad: currentUnit,
            category,
        };

        onConfirm?.(payload);
        setCurrentName('');
        setCurrentUnit('');
        setCurrentQuantity('1');
        setIsModalVisible(false);
    };

    useEffect(() => {
        unidad && setCurrentUnit(unidad.trim());
        alimento && setCurrentName(alimento);
        return () => {
            setCurrentUnit('');
        };
    }, [unidad]);

    return (
        <>
            <h4
                className='equivalentItem'
                onClick={() => setIsModalVisible(true)}>
                {alimento ?? ''}
            </h4>
            <Modal
                title='Ingresa los datos a registrar'
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}>
                <div className='modalFoodContainer'>
                    <section>
                        <div>
                            <p>Cantidad sugerida: {cantidadSugerida ?? 1}</p>
                            <p>Peso neto (kg): {pesoNetoKg ?? 0}</p>
                            <p>Unidad: {unidad ?? 0}</p>
                            <p className='importantText'>
                                Cantidad a registrar:{' '}
                                {`${currentQuantity} ${unidad}`}
                            </p>
                        </div>
                        <div>
                            <p>Alimento:</p>
                            <Input
                                placeholder='Nombre del alimento'
                                defaultValue={alimento ?? ''}
                                style={styles.input}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div>
                            <p>Cantidad:</p>
                            <InputNumber
                                placeholder='Cantidad'
                                style={styles.input}
                                keyboardType='numeric'
                                onChange={handleOnChangeQuantity}
                                defaultValue={cantidadSugerida ?? '1'}
                            />
                        </div>
                    </section>
                    <Select
                        style={{ width: '100%' }}
                        placeholder='Selecciona una unidad'
                        defaultValue={unidad}>
                        {mocks.unidadesRecomendadas.map((elem) => (
                            <Option key={elem.id} value={elem.value}>
                                {elem.label}
                            </Option>
                        ))}
                    </Select>
                    <Button type='primary' onClick={handleAddFoodToBaseMenu}>
                        Registrar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default EquivalentCard;
