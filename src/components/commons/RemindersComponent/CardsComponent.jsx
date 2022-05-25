import React, { useState, useEffect } from 'react';

import {
    Card,
    Space,
    Input,
    Col,
    Row,
    Button,
    Modal,
    DatePicker,
    Select,
    message,
    Checkbox,
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import apiURL from '../../../axios/axiosConfig';

const CardsComponent = () => {
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ initialData, setInitialData ] = useState([]);
    const [ list, setList ] = useState([]);

    const [ listUsers, setlistUsers ] = useState([]);
    const [ listUsersPut, setlistUsersput ] = useState([]);
    const [ recorUp, setRecorUp ] = useState([]);
    const [ arrayUsers, setArrayusers ] = useState([]);
    const [ titulo, setTitulo ] = useState('');
    const [ msj, setMsj ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const { RangePicker } = DatePicker;
    const [ fecha, setFecha ] = useState([]);
    const { TextArea } = Input;
    const { confirm } = Modal;
    const { Search } = Input;
    const { Option } = Select;
    const [ global, setGlobal ] = useState(false);
    const [ seleccionado, setSeleccionado ] = useState('');

    useEffect(() => {
        fetchData();

    }, []);
    useEffect(() => {
        seleccionado?._id &&
            fetchData2();

    }, [ seleccionado?._id ]);


    const showModal = async (id) => {
        setIsModalVisible(true);
        console.log(id);
        setSeleccionado(id);
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setlistUsers(data);


            console.log("vacio");
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
        console.log(seleccionado?.listUsersPut ?? listUsersPut)
    };

    const fetchData2 = async () => {
        try {
            const { data } = await apiURL.get(`/recordatorios/${seleccionado._id}`);
            setGlobal(data.global)
            setArrayusers(data.usuarios)
            console.log("mensajito Gama", data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const getUpdatedIds = (array) => {
        const ids = [];

        array.forEach((user) => {
            const findIndex = listUsers.findIndex((elem) => elem._id === user);
            if (findIndex !== -1) {
                ids.push(listUsers[ findIndex ]._id);
            }
        });

        setlistUsersput(ids);
    };

    const handleOk = async () => {
        setIsModalVisible(false);

        try {
            const reminder = {
                "usuarios": listUsersPut.length > 0 && listUsersPut || arrayUsers,
                //hora y fecha
                "titulo": seleccionado?.titulo ?? titulo,
                "mensaje": seleccionado?.mensaje ?? msj,
                "categoria": seleccionado?.categoria ?? categoria,
                "dias": [
                    {
                        "day": "martes",
                        "activo": false,
                    },
                ],
                "fecha": seleccionado?.fecha ?? fecha,
                "global": seleccionado?.global ?? global
            };

            const response = await apiURL.patch(
                `/recordatorios/${seleccionado._id}`,
                reminder
            );
            console.log(response);
            //window.location.reload();

            console.log('actualizado');
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload();
    };

    function showDeleteConfirm(recordatorio) {
        confirm({
            title: '¿Estás seguro de que quieres eliminar?',
            icon: <ExclamationCircleOutlined />,
            content: 'Los cambios no serán reversibles',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                const deleteRecor = async () => {
                    console.log('OK');
                    try {
                        const dlt = await apiURL.delete(
                            `/recordatorios/${recordatorio._id}`
                        );
                        console.log(dlt);
                        window.location.reload();
                    } catch (error) {
                        message.error(`Error: ${error.message}`);
                    }
                };
                deleteRecor();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/recordatorios');
            setInitialData(data);
            setList(data);
            console.log(list);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const onSearch = (target) => {
        console.log(target);
        setList(
            initialData.filter((recordatorios) =>
                recordatorios.titulo.includes(target)
            )
        );
        console.log(target);
    };

    function onChangeCh(e) {
        console.log(`checked = ${e.target.checked}`);

        if (e.target.checked) {
            setGlobal(true);
        } else {
            setGlobal(false);
        }
    }

    const getUserNames = array => {
        const auxs = [];

        array.forEach((user) => {
            const findIndex = listUsers.findIndex((elem) => elem._id === user);
            if (findIndex !== -1) {
                auxs.push(listUsers[ findIndex ].nombre);
            }
        });

        return auxs;
    };

    return (
        <div scroll={{}}>
            <Row>
                <Space direction='vertical' style={{ width: '90%' }}>
                    <Search
                        size='large'
                        placeholder='Buscar por titulo de recordatorio'
                        allowClear
                        defaultValue={list}
                        onSearch={onSearch}
                        style={{ width: 1000 }}
                    />
                </Space>
                {list.map((recordatorios) => (
                    <Col span={6}>
                        <Card
                            className='card'
                            style={{ marginTop: 16 }}
                            type='inner'
                            title={
                                <Row>
                                    <Col span={12} style={{ padding: 5 }}>
                                        <h4 className='plistaR'>
                                            {recordatorios.titulo}
                                        </h4>
                                    </Col>
                                    <Col span={4} style={{ padding: 5 }}>
                                        <Button
                                            style={{}}
                                            type='primary'
                                            shape='circle'
                                            onClick={() =>
                                                showModal(recordatorios)
                                            }
                                            icon={<EditOutlined />}
                                        />
                                    </Col>
                                    <Col span={4} style={{ padding: 5 }}>
                                        <Button
                                            style={{}}
                                            type='primary'
                                            shape='circle'
                                            onClick={() =>
                                                showDeleteConfirm(recordatorios)
                                            }
                                            icon={<DeleteOutlined />}
                                        />
                                    </Col>
                                </Row>
                            }>
                            <Row>
                                <Col span={4} style={{ padding: 5 }}>
                                    <Button
                                        style={{}}
                                        type='primary'
                                        shape='circle'
                                        icon={
                                            recordatorios.global ? (
                                                <GlobalOutlined />
                                            ) : (
                                                <UserOutlined />
                                            )
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <p>Mensaje: {recordatorios.mensaje}</p>
                                    <p>Categoria: {recordatorios.categoria}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title='Actualizar recordatorio'
                visible={isModalVisible && seleccionado?.fecha && arrayUsers.length > 0}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Row>
                    <Col span={6} style={{ padding: 16 }}>
                        <p>Titulo: </p>
                    </Col>
                    <Col span={18} style={{ padding: 16 }}>
                        <Input
                            defaultValue={seleccionado?.titulo ?? titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6} style={{ padding: 16 }}>
                        <p>Descripción (mensaje):</p>
                    </Col>
                    <Col span={18} style={{ padding: 16 }}>
                        <TextArea
                            placeholder='Descripción del recordatorio'

                            autoSize
                            onChange={(e) => setMsj(e.target.value)}
                            defaultValue={seleccionado?.mensaje ?? msj}
                        />
                        <div style={{ margin: '24px 0' }} />
                    </Col>
                </Row>
                <Checkbox
                    onChange={onChangeCh}
                    defaultChecked={seleccionado?.global ?? global}>
                    Global
                </Checkbox>
                <Select
                    disabled={global}
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Seleccionar usuarios'
                    onChange={(value) => setlistUsersput(value)}
                    optionLabelProp='label'
                    defaultValue={arrayUsers.length > 0 && getUserNames(arrayUsers) || listUsersPut}
                    
                >
                    {listUsers.map((users) => (
                        <Option key={users.id}>
                            {users.nombre}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder='Seleccione Categoría'
                    onChange={(value) => setCategoria(value)}
                    defaultValue={seleccionado?.categoria ?? categoria}
                    style={{ width: '100%' }}>
                    <Option value='desayuno'>Desayuno</Option>
                    <Option value='comida'>Comida</Option>
                    <Option value='cena'>Cena</Option>
                    <Option value='ejercicio'>Ejercicio</Option>
                    <Option value='colacion1'>Colacion 1</Option>
                    <Option value='colacion2'>Colación 2</Option>
                    <Option value='agua'>Agua</Option>
                </Select>
                <div className='site-calendar-demo-card'>
                    <RangePicker
                        defaultValue={seleccionado?.fecha && [ moment(seleccionado.fecha[ 0 ]), moment(seleccionado.fecha[ seleccionado.fecha.length - 1 ]) ]}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default CardsComponent;
