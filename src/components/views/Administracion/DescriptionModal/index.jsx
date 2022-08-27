import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';

import apiURL from '@/axios/axiosConfig';

const DescriptionModal = ({ isOpen, onClose, level, dataSource }) => {
    const [description, setDescription] = useState('');

    const { TextArea } = Input;

    useEffect(() => {
        if (!level || !dataSource) {
            return;
        }

        const levelDescription = dataSource.find((item) => item.nivel === level.toString());

        setDescription(levelDescription?.descripcion);
    }, [level, dataSource]);

    const onOk = async () => {
        try {
            const body = dataSource.find((item) => item.nivel === level.toString());
            body.descripcion = description;

            await apiURL.patch('piramide/descripcion/descripcion', body);

            message.success('Descripción actualizada');
            onClose();
        } catch (error) {
            console.log(error);
            message.error('Ocurrió un error al actualizar la descripción');
        }
    };

    return (
        <Modal
            title={`Descripción nivel ${level}`}
            visible={isOpen}
            onCancel={onClose}
            onOk={onOk}>
            <TextArea
                allowClear
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Descripción de ejemplo'
                rows={6}
            />
        </Modal>
    );
};

export default DescriptionModal;
