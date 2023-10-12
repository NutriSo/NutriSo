import React, { useState, useEffect } from 'react';
import {
    Select,
    Divider,
    message,
    Card,
    Badge,
    Modal,
    InputNumber,
    TimePicker,
    Button,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import apiURL from '@/axios/axiosConfig';

import '../Menus.scss';

const categoryTypeOptions = [
    'Desayuno',
    'Colación 1',
    'Comida',
    'Colación 2',
    'Cena',
];

const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
];

const ribbonColorByCategory = {
    Desayuno: 'green',
    Colación1: 'cyan',
    Comida: 'blue',
    Colación2: 'volcano',
    Cena: 'magenta',
};

const AssignMenu = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [menus, setMenus] = useState([]);
    const [allMenus, setAllMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [daySelected, setDaySelected] = useState(null);
    const [timeSelected, setTimeSelected] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { Option } = Select;

    const toggleModal = () => {
        setIsModalVisible((s) => !s);
    };

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

    const handleFetchMenus = async () => {
        try {
            const { data } = await apiURL.get('/menusBase');

            setMenus(data);
            setAllMenus(data);
        } catch (error) {
            console.log(error);
            message.error('Ocurrió un error al obtener los datos de los menús');
        }
    };

    const handleSelectUser = (userId) => {
        setUserId(userId);
        const userIndex = users.findIndex((user) => user.usuario === userId);
        const userObject = users[userIndex];

        const name = `${userObject.nombre} ${userObject?.apellidoPaterno} ${userObject?.apellidoMaterno} `;
        setSelectedUser(name);
    };

    const handleFilterByCategory = (category) => {
        const filteredMenus = allMenus.filter(
            (menu) => menu.categoria === category
        );
        setMenus(filteredMenus);
    };

    const handleOnClearFilter = () => {
        setMenus(allMenus);
    };

    const handleSelectMenu = (payload) => {
        setSelectedMenu(payload);
    };

    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleChangeDay = (day) => {
        setDaySelected(day);
    };

    const handleSelectTime = (time) => {
        setTimeSelected(time);
    };

    const handleOnChangeFood = (value, food) => {
        if (!value) {
            return;
        }

        const foodObject = { ...food };

        Object.assign(foodObject, { cantidad: Number(value) });

        const updatedFood = selectedMenu?.ingredientes?.map((food) => {
            if (food.id === foodObject.id) {
                return foodObject;
            }

            return food;
        });

        setSelectedMenu((s) => ({
            ...s,
            ingredientes: updatedFood,
        }));
    };

    const handleUpdateMenu = async () => {
        try {
            const body = {
                ingredientes: selectedMenu.ingredientes,
            };
            const { status } = await apiURL.patch(
                `/menusBase/${selectedMenu.id}`,
                body
            );

            if (status === 200) {
                message.success('El menú se actualizó correctamente');
                toggleModal();
            }
        } catch (error) {
            message.error('Ocurrió un error al actualizar el menú');
        }
    };

    const handlePostMenuToUser = async (body) => {
        try {
            console.log('Creando');
            const payload = {
                ...body,
                ingredientes: selectedMenu.ingredientes,
                titulo: selectedMenu.titulo,
            };

            const { status } = await apiURL.post('/menusPorUsuario', payload);

            if (status === 200) {
                message.success('El menú se asignó correctamente');
            }
        } catch (error) {
            message.error(
                'Ocurrió un error al asignar un nuevo menú al usuario'
            );
        }
    };

    const handlePutMenuToUser = async (body, id) => {
        try {
            console.log('Editando');
            const payload = {
                ...body,
                ingredientes: selectedMenu.ingredientes,
                titulo: selectedMenu.titulo,
            };

            const { status } = await apiURL.put(
                `/menusPorUsuario/${id}`,
                payload
            );

            if (status === 200 || status === 304) {
                message.success('El menú se asignó correctamente');
            }
        } catch (error) {
            message.error('Ocurrió un error al asignar el menú al usuario');
        }
    };

    const handleSaveMenuToUser = async () => {
        try {
            const body = {
                menus: selectedMenu.id,
                hora: timeSelected,
                usuario: userId,
                dia: daySelected,
                categoria: selectedCategory,
            };

            const { data } = await apiURL.get(
                `/menusPorUsuario?usuario=${userId}&dia=${daySelected}&categoria=${selectedCategory}`
            );

            if (data.length > 0) {
                await handlePutMenuToUser(body, data?.[0]?._id);
            } else {
                await handlePostMenuToUser(body);
            }
        } catch (error) {
            message.error('Ocurrió un error al asignar el menú al usuario');
        }
    };

    useEffect(() => {
        handleFetchUsers();
        handleFetchMenus();

        return () => {
            setUsers([]);
            setMenus([]);
            setAllMenus([]);
            setSelectedUser(null);
            setSelectedMenu(null);
            setSelectedCategory(null);
            setIsModalVisible(false);
            setUserId(null);
            setDaySelected(null);
            setTimeSelected(null);
        };
    }, []);

    return (
        <section className='layout'>
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
            {selectedUser !== null && (
                <>
                    <Divider orientation='left'>Selección de menú</Divider>
                    <Select
                        allowClear
                        placeholder='Filtrar por categoria'
                        onChange={handleFilterByCategory}
                        onClear={handleOnClearFilter}>
                        {categoryTypeOptions.map((category) => (
                            <Option key={category}>{category}</Option>
                        ))}
                    </Select>
                    <main className='menusGrid'>
                        {menus.map((menu) => (
                            <Badge.Ribbon
                                key={menu.id}
                                text={menu.categoria}
                                color={ribbonColorByCategory[menu.categoria]}>
                                <Card
                                    className={classNames({
                                        'selected-menu':
                                            selectedMenu?.id === menu.id,
                                    })}
                                    title={menu.titulo}
                                    bordered={false}
                                    onClick={() => handleSelectMenu(menu)}
                                    actions={[
                                        selectedMenu?.id === menu.id ? (
                                            <EditOutlined
                                                key='edit'
                                                onClick={toggleModal}
                                            />
                                        ) : (
                                            ''
                                        ),
                                    ]}>
                                    {menu.ingredientes.map((food) => (
                                        <p>{` - ${food.alimento} ✿ ${food.cantidad} ${food.unidad}`}</p>
                                    ))}
                                </Card>
                            </Badge.Ribbon>
                        ))}
                    </main>
                </>
            )}
            <footer>
                <Divider orientation='left'>
                    Selección de categoria para asignar al usuario
                </Divider>
                <Select
                    placeholder='Selecciona una categoría'
                    onChange={handleChangeCategory}>
                    {categoryTypeOptions.map((category) => (
                        <Option key={category}>{category}</Option>
                    ))}
                </Select>
                <Divider orientation='left'>Selección del dia</Divider>
                <Select
                    placeholder='Selecciona un dia'
                    onChange={handleChangeDay}>
                    {days.map((day) => (
                        <Option key={day}>{day}</Option>
                    ))}
                </Select>
                <Divider orientation='left'>Selección de hora</Divider>
                <TimePicker
                    use12Hours
                    format='HH:mm'
                    onChange={handleSelectTime}
                />
                <Divider />
                <Button onClick={handleSaveMenuToUser} type='primary'>
                    Asignar menu al usuario
                </Button>
            </footer>
            <Modal
                open={isModalVisible}
                title='Configura el menu para el usuario'
                footer={null}
                onCancel={toggleModal}>
                <section>
                    {selectedMenu?.ingredientes?.map((food) => (
                        <>
                            <span>{food.alimento}</span>
                            <InputNumber
                                style={{ width: '100%' }}
                                value={food.cantidad}
                                addonAfter={food.unidad}
                                onChange={(value) =>
                                    handleOnChangeFood(value, food)
                                }
                            />
                        </>
                    ))}
                </section>
                <Button onClick={handleUpdateMenu} type='primary'>
                    Actualizar menu
                </Button>
            </Modal>
        </section>
    );
};

export default AssignMenu;
