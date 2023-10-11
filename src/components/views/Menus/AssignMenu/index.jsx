import React, { useState, useEffect } from 'react';
import { Select, Divider, message } from 'antd';

import apiURL from '@/axios/axiosConfig';

const AssignMenu = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { Option } = Select;

    const handleFetchUsers = async () => {
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setUsers(data);
        } catch (error) {
            console.log(error);
            message.error(
                'Ocurrió un error al obtener los datos de los usuarios'
            );
        }
    };

    const handleSelectUser = (userId) => {
        const userIndex = users.findIndex((user) => user.usuario === userId);
        const userObject = users[userIndex];

        const name = `${userObject.nombre} ${userObject?.apellidoPaterno} ${userObject?.apellidoMaterno} `;
        setSelectedUser(name);
    };

    useEffect(() => {
        handleFetchUsers();

        return () => {
            setUsers([]);
            setSelectedUser(null);
            setSelectedCategory(null);
            setMenuPreparation([]);
        };
    }, []);
    return (
        <div>
            <header>
                <Divider orientation='left'>Selección de usuario</Divider>
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Selecciona un usuario'
                    onChange={handleSelectUser}
                    onClear={() => setSelectedUser(null)}
                    value={selectedUser}>
                    {users.map((user) => (
                        <Option key={user.usuario}>
                            {`${user.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno}`}
                        </Option>
                    ))}
                </Select>
            </header>
        </div>
    );
};

export default AssignMenu;
