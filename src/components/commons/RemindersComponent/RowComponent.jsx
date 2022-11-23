import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
    Col,
    DatePicker,
    TimePicker,
    Input,
    Row,
    Checkbox,
    Button,
    Modal,
    Select,
    message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import apiURL from '@/axios/axiosConfig';

import styles from './styles.module.scss';

const RowComponent = () => {
    const [listUsers, setlistUsers] = useState([]);
    const [listUsersPut, setlistUsersput] = useState([]);
    const [listRecor, setListRecor] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [msj, setMsj] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState([]);
    const [hora, setHora] = useState(null);
    const [global, setGlobal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const { Option } = Select;

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/recordatorios');
            setListRecor(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const showModal = async () => {
        setIsModalVisible(true);
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setlistUsers(data);
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }
    };

    const handleOk = async () => {
        setIsModalVisible(false);

        try {
            const todosUsuarios = listUsers.map((user) => user._id);
            const reminder = {
                usuarios: global ? todosUsuarios : listUsersPut,
                titulo: titulo,
                mensaje: msj,
                categoria: categoria,
                dias: [
                    {
                        day: 'martes',
                        activo: false,
                    },
                ],
                fecha: fecha,
                hora: hora,
                global: global,
            };
            const response = await apiURL.post('/recordatorios', reminder);
            message.success('Recordatorio agregado');
            console.log(response);
        } catch (error) {
            message.error('Ocurrió un error al crear el recordatorio');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const print = (values) => {
        if (values) {
            const dateA = values[0];
            const dateB = values[1];

            setFecha(getDaysBetweenDates(dateA, dateB));
        }
    };

    const handleTime = (time) => {
        setHora(time);
    };

    const getDaysBetweenDates = function (startDate, endDate) {
        let now = startDate.clone(),
            dates = [];

        while (now.isSameOrBefore(endDate)) {
            dates.push(dayjs(now).toISOString());
            now.add(1, 'days');
        }
        return dates;
    };

    const onChangeCh = (e) => {
        setGlobal(e.target.checked);
    };

    return (
        <>
            <Row>
                <Col span={22} className={styles.normalPadding}>
                    <h1> Recordatorios</h1>
                </Col>
                <Col span={2} className={styles.normalPadding}>
                    <Button
                        onClick={showModal}
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                    />
                </Col>
            </Row>
            <Modal
                title='Agregar nuevo recordatorio'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <h3>Título</h3>
                <Col span={24} className={styles.normalPadding}>
                    <Input
                        placeholder='Titulo del recordatorio'
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Col>
                <h3>Descripción (mensaje):</h3>
                <Col span={24} className={styles.normalPadding}>
                    <TextArea
                        placeholder='Descripción del recordatorio'
                        autoSize
                        rows={8}
                        onChange={(e) => setMsj(e.target.value)}
                    />
                    <div style={{ margin: '24px 0' }} />
                </Col>
                <h3>Tipo</h3>
                <Checkbox onChange={onChangeCh}>Global</Checkbox>
                <h3>Usuarios</h3>
                <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Seleccionar usuarios'
                    onChange={(value) => setlistUsersput(value)}
                    optionLabelProp='label'
                    disabled={global ? true : false}>
                    {listUsers.map((user) => (
                        <Option
                            key={
                                user.id
                            }>{`${user.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno} `}</Option>
                    ))}
                </Select>
                <h3>Categoria</h3>
                <Select
                    placeholder='Seleccione Categoría'
                    onChange={(value) => setCategoria(value)}
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
                    <h3>Fechas</h3>
                    <RangePicker onChange={print} />
                </div>
                <div className='site-calendar-demo-card'>
                    <h3>Horario</h3>
                    <TimePicker use12Hours format='HH:mm' onChange={handleTime} />
                </div>
            </Modal>
        </>
    );
};

export default RowComponent;
