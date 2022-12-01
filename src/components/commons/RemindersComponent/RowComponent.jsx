import React, { useEffect, useState, useMemo } from 'react';
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
import { isEmptyArray } from '@/utils';

import styles from './styles.module.scss';

const RowComponent = () => {
    const [userInformation, setUserInformationList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [msj, setMsj] = useState('');
    const [dates, setDates] = useState([]);
    const [hora, setHora] = useState(null);
    const [global, setGlobal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const { Option } = Select;

    const userInformationIds = useMemo(() => {
        if (isEmptyArray(userInformation)) {
            return [];
        }

        return userInformation.map((user) => user._id);
    }, [userInformation.length]);

    const showModal = async () => {
        setIsModalVisible(true);
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setUserInformationList(data);
        } catch (error) {
            message.error('Ocurrió un error al obtener los datos de los usuarios');
        }
    };

    const handleOk = async () => {
        setIsModalVisible(false);

        try {
            const body = {
                usuarios: global ? userInformationIds : selectedUsers,
                titulo: title,
                mensaje: msj,
                categoria: '',
                fecha: dates,
                hora: hora,
                global: global,
            };

            await apiURL.post('/recordatorios', body);
            message.success('Recordatorio agregado');
            window.location.reload();
        } catch (error) {
            message.error('Ocurrió un error al crear el recordatorio');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDayRanges = (values) => {
        if (values) {
            const dateA = values[0];
            const dateB = values[1];

            setDates(getDaysBetweenDates(dateA, dateB));
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

    const handleSelectedUsers = (userId) => {
        setSelectedUsers(userId);
    };

    useEffect(() => {
        return () => {
            setUserInformationList([]);
            setSelectedUsers([]);
            setTitle('');
            setMsj('');
            setDates([]);
            setHora(null);
            setGlobal(false);
            setIsModalVisible(false);
        };
    }, []);

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
                        onChange={(e) => setTitle(e.target.value)}
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
                    onChange={handleSelectedUsers}
                    optionLabelProp='label'
                    disabled={global}>
                    {userInformation.map((user) => (
                        <Option key={user.usuario}>
                            {`${user.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno} `}
                        </Option>
                    ))}
                </Select>
                <div className='site-calendar-demo-card'>
                    <h3>Fechas</h3>
                    <RangePicker onChange={handleDayRanges} />
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
