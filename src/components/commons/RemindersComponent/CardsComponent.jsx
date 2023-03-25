import React, { useState, useEffect, useMemo } from 'react';
import {
    Card,
    Space,
    Input,
    Col,
    Row,
    Modal,
    DatePicker,
    TimePicker,
    Select,
    message,
    Checkbox,
} from 'antd';
import {
    ExclamationCircleOutlined,
    CloseCircleTwoTone,
    CheckCircleTwoTone,
    DeleteTwoTone,
    EditTwoTone,
} from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';

import apiURL from '@/axios/axiosConfig';
import { isEmptyArray } from '@/utils';

import styles from './styles.module.scss';

const CardsComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [userInformation, setUserInformationList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [msj, setMsj] = useState('');
    const [dates, setDates] = useState([]);
    const [hora, setHora] = useState(null);
    const [global, setGlobal] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState(null);

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const { confirm } = Modal;
    const { Search } = Input;
    const { Option } = Select;

    const userInformationIds = useMemo(() => {
        if (isEmptyArray(userInformation)) {
            return [];
        }

        return userInformation.map((user) => user._id);
    }, [userInformation.length]);

    const defaultCurrentHour = useMemo(() => {
        const today = new Date();

        return dayjs(today, 'HH:mm');
    }, []);

    const defaultHour = useMemo(() => {
        if (!hora) {
            return null;
        }

        return dayjs(new Date(hora[0]), 'HH:mm');
    }, [hora]);

    const defaultUsers = useMemo(() => {
        if (!selectedReminder) {
            return !isEmptyArray(selectedUsers) ? selectedUsers : [];
        }

        return selectedReminder.usuarios;
    }, [selectedReminder]);

    const rangeValue = useMemo(() => {
        if (selectedReminder?.fecha) {
            const initialDate = moment(selectedReminder.fecha[0]);
            const finalDate = moment(
                selectedReminder.fecha[selectedReminder.fecha.length - 1]
            );

            return [initialDate, finalDate];
        }

        return null;
    }, [selectedReminder]);

    const modalVisible = isModalVisible && selectedReminder?.fecha && defaultHour;

    const showModal = async (reminder) => {
        setIsModalVisible(true);
        setSelectedReminder(reminder);
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setUserInformationList(data);
        } catch (error) {
            message.error('Ocurrió un error al obtener los datos de los usuarios');
        }
    };

    const fetchOpenedReminderData = async () => {
        try {
            const { data } = await apiURL.get(`/recordatorios/${selectedReminder._id}`);

            setGlobal(data.global);
            setDates(data.fecha);
            setMsj(data.mensaje);
            setTitle(data.titulo);
            setHora(data.hora);
        } catch (error) {
            message.error('Ocurrió un error al obtener los datos para actualizar');
        }
    };

    const handleOk = async () => {
        try {
            const noGlobalUsers = isEmptyArray(selectedUsers) ? defaultUsers : selectedUsers;

            const body = {
                usuarios: global ? userInformationIds : noGlobalUsers,
                hora: hora,
                titulo: title,
                mensaje: msj,
                categoria: '',
                fecha: dates,
                global: global,
                usuariosConfirmados: [],
            };

            await apiURL.patch(`/recordatorios/${selectedReminder._id}`, body);

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
    };

    const handleDelete = async (id) => {
        try {
            await apiURL.delete(`/recordatorios/${id}`);

            window.location.reload();
        } catch (error) {
            message.error('Ocurrió un error al eliminar el recordatorio.');
        }
    };

    const showDeleteConfirm = (reminder) => {
        confirm({
            title: '¿Estás seguro de que quieres eliminar?',
            icon: <ExclamationCircleOutlined />,
            content: 'Los cambios no serán reversibles',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(reminder._id);
            },
        });
    };

    const fetchData = async () => {
        try {
            const { data } = await apiURL.get('/recordatorios');
            setInitialData(data);
            setReminders(data);
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

        setReminders(filteredData);
    };

    const handleTime = (time) => {
        setHora(time);
        setSelectedReminder({ ...selectedReminder, hora: time });
    };

    const handleDayRanges = (values) => {
        if (values) {
            const dateA = values[0];
            const dateB = values[1];

            setSelectedReminder({
                ...selectedReminder,
                fecha: getDaysBetweenDates(dateA, dateB),
            });
            setDates(getDaysBetweenDates(dateA, dateB));
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

    const handleGlobal = (e) => {
        setGlobal(e.target.checked);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedReminder?._id) {
            return;
        }

        fetchOpenedReminderData();
    }, [selectedReminder?._id]);

    useEffect(() => {
        if (!modalVisible) {
            setSelectedUsers([]);
            setSelectedReminder(null);
        }
    }, [modalVisible]);
    return (
        <div>
            <Row>
                <Space direction='vertical' style={{ width: '90%' }}>
                    <Search
                        size='large'
                        placeholder='Buscar por titulo de recordatorio'
                        allowClear
                        defaultValue={reminders}
                        onSearch={onSearch}
                    />
                </Space>
                <Row className={styles.grid}>
                    {reminders.map((reminder) => (
                        <Card
                            hoverable
                            actions={[
                                <EditTwoTone
                                    twoToneColor='#1199bb'
                                    onClick={() => showModal(reminder)}
                                />,
                                <DeleteTwoTone
                                    twoToneColor='#eb2f96'
                                    onClick={() => showDeleteConfirm(reminder)}
                                />,
                            ]}
                            className={styles.customClass}
                            headStyle={{ backgroundColor: '#439776', color: '#FFFFFF' }}
                            bodyStyle={{ width: '100%' }}
                            title={reminder.titulo}>
                            <Card.Grid hoverable={false} style={{ width: '100%' }}>
                                <Row
                                    align='middle'
                                    justify='center'
                                    gutter={2}
                                    className={styles.globalText}>
                                    <p>
                                        GLOBAL:
                                        {reminder.global ? (
                                            <CheckCircleTwoTone twoToneColor='#52c41a' />
                                        ) : (
                                            <CloseCircleTwoTone twoToneColor='#eb2f96' />
                                        )}
                                    </p>
                                </Row>
                                <Row>
                                    <p>{reminder.mensaje}</p>
                                </Row>
                            </Card.Grid>
                        </Card>
                    ))}
                </Row>
            </Row>
            {modalVisible && (
                <Modal
                    title='Actualizar recordatorio'
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Row>
                        <Col span={6} style={{ padding: 16 }}>
                            <p>Titulo: </p>
                        </Col>
                        <Col span={18} style={{ padding: 16 }}>
                            <Input
                                defaultValue={selectedReminder?.titulo ?? title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                defaultValue={selectedReminder?.mensaje ?? msj}
                            />
                        </Col>
                    </Row>
                    <Checkbox
                        onChange={handleGlobal}
                        defaultChecked={selectedReminder?.global ?? global}>
                        Global
                    </Checkbox>
                    <Select
                        disabled={global}
                        mode='multiple'
                        style={{ width: '100%' }}
                        placeholder='Seleccionar usuarios'
                        onChange={(value) => setSelectedUsers(value)}
                        optionLabelProp='label'
                        defaultValue={defaultUsers}>
                        {userInformation.map((users) => (
                            <Option key={users.id} value={users.usuario}>
                                {users.nombre}
                            </Option>
                        ))}
                    </Select>
                    <div className='site-calendar-demo-card'>
                        <RangePicker onChange={handleDayRanges} defaultValue={rangeValue} />
                    </div>
                    <div className='site-calendar-demo-card'>
                        <h3>Horario</h3>
                        <TimePicker
                            use12Hours
                            defaultValue={defaultHour || defaultCurrentHour}
                            format='HH:mm'
                            onChange={handleTime}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CardsComponent;
