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
    TimePicker,
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
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import { capitilizeWord } from '@/utils';

import styles from './styles.module.scss';

const CardsComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const [list, setList] = useState([]);
    const [listUsers, setlistUsers] = useState([]);
    const [listUsersPut, setlistUsersput] = useState([]);
    const [arrayUsers, setArrayusers] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [msj, setMsj] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState([]);
    const [hora, setHora] = useState(null);
    const [global, setGlobal] = useState(false);
    const [seleccionado, setSeleccionado] = useState('');

    const modalVisible = isModalVisible && seleccionado?.fecha && arrayUsers.length > 0;

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const { confirm } = Modal;
    const { Search } = Input;
    const { Option } = Select;

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        seleccionado?._id && fetchData2();
    }, [seleccionado?._id]);

    const showModal = async (id) => {
        setIsModalVisible(true);
        setSeleccionado(id);
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setlistUsers(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const fetchData2 = async () => {
        try {
            const { data } = await apiURL.get(`/recordatorios/${seleccionado._id}`);
            if (data) {
                setGlobal(data.global);
                setArrayusers(data.usuarios);
                setFecha(data.fecha);
                setMsj(data.mensaje);
                setTitulo(data.titulo);
                setCategoria(data.categoria);
                setHora(data.hora);
            }
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const handleOk = async () => {
        try {
            const payload = {
                usuarios: (listUsersPut.length > 0 && listUsersPut) || arrayUsers,
                hora: hora,
                titulo: titulo,
                mensaje: msj,
                categoria: categoria,
                fecha: fecha,
                global: global,
                usuariosConfirmados: [],
            };

            await apiURL.patch(`/recordatorios/${seleccionado._id}`, payload);

            message.success('Se actualizó el recordatorio');

            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
            message.error(
                'Ocurrió un error, puede que ya existe un recordatorio con ese título'
            );
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
                    try {
                        await apiURL.delete(`/recordatorios/${recordatorio._id}`);

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
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const onSearch = (searchValue) => {
        const filteredData = initialData.filter((elem) => {
            const normalizedTitle = elem.titulo.toLowerCase().trim();
            const normalizedSearch = searchValue.toLowerCase().trim();

            return normalizedTitle.includes(normalizedSearch);
        });

        setList(filteredData);
    };

    const handleTime = (time) => {
        setHora(time);
        setSeleccionado({ ...seleccionado, hora: time });
    };

    const print = (values) => {
        if (values) {
            const dateA = values[0];
            const dateB = values[1];

            setSeleccionado({
                ...seleccionado,
                fecha: getDaysBetweenDates(dateA, dateB),
            });
            setFecha(getDaysBetweenDates(dateA, dateB));
        }
    };

    const getDaysBetweenDates = (startDate, endDate) => {
        let now = startDate.clone();
        const dates = [];

        while (now.isSameOrBefore(endDate)) {
            dates.push(dayjs(now).toISOString());
            now.add(1, 'days');
        }

        return dates;
    };

    function onChangeCh(e) {
        if (e.target.checked) {
            setGlobal(true);
        } else {
            setGlobal(false);
        }
    }

    const getUserNames = (array) => {
        const auxs = [];

        array.forEach((user) => {
            const findIndex = listUsers.findIndex((elem) => elem._id === user);
            if (findIndex !== -1) {
                auxs.push(listUsers[findIndex].nombre);
            }
        });

        return auxs;
    };

    return (
        <div>
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
                <Row className={styles.grid}>
                    {list.map((recordatorio) => (
                        <Card
                            style={{ marginTop: 16 }}
                            type='inner'
                            title={
                                <Row gutter={1} className={styles.between}>
                                    <Col span={12}>
                                        <h4 className={styles.title}>
                                            {capitilizeWord(recordatorio.titulo)}
                                        </h4>
                                    </Col>
                                    <Col span={6}>
                                        <Button
                                            style={{}}
                                            type='primary'
                                            shape='circle'
                                            onClick={() => showModal(recordatorio)}
                                            icon={<EditOutlined />}
                                        />
                                        <Button
                                            style={{}}
                                            type='primary'
                                            shape='circle'
                                            onClick={() => showDeleteConfirm(recordatorio)}
                                            icon={<DeleteOutlined />}
                                        />
                                    </Col>
                                </Row>
                            }>
                            <Row>
                                <Col span={4}>
                                    <Button
                                        style={{}}
                                        type='primary'
                                        shape='circle'
                                        icon={
                                            recordatorio.global ? (
                                                <GlobalOutlined />
                                            ) : (
                                                <UserOutlined />
                                            )
                                        }
                                    />
                                </Col>
                                <Col span={12}>
                                    <p>Mensaje: {recordatorio.mensaje}</p>
                                    <p>Categoria: {recordatorio.categoria}</p>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Row>
            </Row>
            {modalVisible && (
                <Modal
                    title='Actualizar recordatorio'
                    visible={modalVisible}
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
                        defaultValue={
                            (arrayUsers.length > 0 && getUserNames(arrayUsers)) ||
                            listUsersPut
                        }>
                        {listUsers.map((users) => (
                            <Option key={users.id}>{users.nombre}</Option>
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
                            onChange={print}
                            defaultValue={
                                seleccionado?.fecha && [
                                    moment(seleccionado.fecha[0]),
                                    moment(seleccionado.fecha[seleccionado.fecha.length - 1]),
                                ]
                            }
                        />
                    </div>
                    <div className='site-calendar-demo-card'>
                        <h3>Horario</h3>
                        <TimePicker use12Hours format='HH:mm' onChange={handleTime} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CardsComponent;
