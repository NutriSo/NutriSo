import React, { useState, useEffect } from 'react';

import UploadImg from '../../commons/UploadImgs';
import apiURL from '../../../axios/axiosConfig';

import { Switch, message, Input, Button, Form } from 'antd';

import './Administracion.scss';

const Administracion = () => {
    const [form] = Form.useForm();
    const [imagenes, setImagenes] = useState([]);
    const [updateStates, setUpdateStates] = useState({
        bioquimicos: false,
        circunferencia: false,
        camposCorporales: false,
        gastrointestinal: false,
        clinicos: false,
        sueno: false,
        exposicionSolar: false,
        estadoGeneral: false,
        informacionPersonal: false,
    });
    const [updateStatesOn, setUpdateStatesOn] = useState(false);

    useEffect(() => {
        getOpcionesEdicion();
        getOnOff();
        fetchImagenes();
        getOpcionesEdicion();
    }, []);

    const getOnOff = async () => {
        try {
            const { data } = await apiURL.get('/opcionesRegistro');

            const onOf = data?.[0].registroLibre;

            setUpdateStatesOn(onOf);
        } catch (error) {
            console.error(error);
        }
    };

    const getOpcionesEdicion = async () => {
        try {
            const { data } = await apiURL.get('/opcionesEdicion');
            const {
                bioquimicos,
                camposCorporales,
                circunferencia,
                clinicos,
                estadoGeneral,
                exposicionSolar,
                gastroIntestinal,
                informacionPersonal,
                sueno,
            } = data[0];

            setUpdateStates({
                bioquimicos,
                camposCorporales,
                circunferencia,
                clinicos,
                estadoGeneral,
                exposicionSolar,
                gastroIntestinal,
                informacionPersonal,
                sueno,
            });
        } catch (error) {
            console.groupCollapsed('Error xd');
            console.error(error);
            console.groupEnd();
        }
    };

    const fetchImagenes = async () => {
        try {
            const { data } = await apiURL.get('piramide');

            setImagenes(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePatch = async (props) => {
        try {
            const body = getCurrentBody(props.key, props.value);

            const { status } = await apiURL.patch('opcionesEdicion', body);

            getOpcionesEdicion();
            if (status === 200) message.success('Se actualizó correctamente');
        } catch (error) {
            console.error(error);
        }
    };
    const handlePatchOnOff = async () => {
        try {
            const body = { registroLibre: !updateStatesOn };

            const { status } = await apiURL.patch('opcionesRegistro', body);

            getOnOff();
            if (status === 200) message.success('Se actualizó correctamente');
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentBody = (key, value) => {
        switch (key) {
            case 1:
                setUpdateStates((prevState) => {
                    return { ...prevState, informacionPersonal: value };
                });
                return { informacionPersonal: value };
            case 2:
                setUpdateStates((prevState) => {
                    return { ...prevState, circunferencia: value };
                });
                return { circunferencia: value };
            case 3:
                setUpdateStates((prevState) => {
                    return { ...prevState, camposCorporales: value };
                });
                return { camposCorporales: value };
            case 4:
                setUpdateStates((prevState) => {
                    return { ...prevState, estadoGeneral: value };
                });
                return { estadoGeneral: value };
            case 5:
                setUpdateStates((prevState) => {
                    return { ...prevState, exposicionSolar: value };
                });
                return { exposicionSolar: value };
            case 6:
                setUpdateStates((prevState) => {
                    return { ...prevState, gastrointestinal: value };
                });
                return { gastroIntestinal: value };
            case 7:
                setUpdateStates((prevState) => {
                    return { ...prevState, bioquimicos: value };
                });
                return { bioquimicos: value };
            case 8:
                setUpdateStates((prevState) => {
                    return { ...prevState, clinicos: value };
                });
                return { clinicos: value };
            case 9:
                setUpdateStates((prevState) => {
                    return { ...prevState, sueno: value };
                });
                return { sueno: value };
            default:
                break;
        }
    };

    const handlePostLevel = async (body) => {
        const { data, status } = await apiURL.post('piramide', body);

        return { data, status };
    };

    const onFinish = async (values) => {
        try {
            const body = {
                nivel: values.nivel,
                url: values.url,
            };

            const hasLevels = imagenes.length > 0;

            if (hasLevels) {
                const levelExist = imagenes.findIndex((elem) => elem.nivel === values.nivel);

                if (levelExist !== -1) {
                    const toPatch = imagenes[levelExist];
                    const id = toPatch._id;

                    const { status } = await apiURL.patch(`piramide/${id}`, body);

                    if (status === 200) message.success('Se actualizó correctamente');
                } else {
                    const { data } = await handlePostLevel(body);

                    setImagenes([...imagenes, data]);
                    message.success('Se creó correctamente');
                }
            } else {
                const { data } = await handlePostLevel(body);

                setImagenes([...imagenes, data]);
                message.success('Se creó correctamente');
            }
            fetchImagenes();
        } catch (error) {
            console.log(error);
        }
    };

    const mapImagenes = (lvl) => {
        const imgCount = imagenes[0]?.url?.length > 0;

        const withoutImages = <p>Sin imágenes</p>;

        if (!imgCount) return withoutImages;

        const images = imagenes.map((registro) => {
            const { nivel, url } = registro;

            if (nivel !== lvl) return null;

            return url.map((url, index) => (
                <UploadImg key={index} id='imagenNivel' url={url} disabled />
            ));
        });

        const nornalizedImages = images.filter((elem) => elem !== null);
        const toReturn = nornalizedImages.length > 0 ? nornalizedImages : withoutImages;

        return toReturn;
    };

    return (
        <div className='main-Administracion'>
            <div className='primerosDos'>
                <div className='segundo'>
                    <label className='texto'>OFF</label>
                    <Switch
                        className='switch'
                        checked={updateStatesOn}
                        onChange={handlePatchOnOff}
                    />
                    <label className='texto'>ON</label>
                </div>
                <div className='primero'>
                    <div className='labels'>
                        <label className='texto'>Informacion personal</label>
                        <label class='texto'>Circunferencia</label>
                        <label className='texto'>Campos corporales</label>
                        <label className='texto'>Estado general</label>
                        <label className='texto'>Exposicion solar</label>
                        <label className='texto'>Gastro intestinal</label>
                        <label className='texto'>Bioquimicos</label>
                        <label className='texto'>Clinicos</label>
                        <label className='texto'>Sueño</label>
                    </div>

                    <div className='switches'>
                        <Switch
                            className='switch'
                            checked={updateStates.informacionPersonal}
                            onChange={(s) => handlePatch({ key: 1, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.circunferencia}
                            onChange={(s) => handlePatch({ key: 2, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.camposCorporales}
                            onChange={(s) => handlePatch({ key: 3, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.estadoGeneral}
                            onChange={(s) => handlePatch({ key: 4, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.exposicionSolar}
                            onChange={(s) => handlePatch({ key: 5, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.gastroIntestinal}
                            onChange={(s) => handlePatch({ key: 6, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.bioquimicos}
                            onChange={(s) => handlePatch({ key: 7, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.clinicos}
                            onChange={(s) => handlePatch({ key: 8, value: s })}
                        />
                        <Switch
                            className='switch'
                            checked={updateStates.sueno}
                            onChange={(s) => handlePatch({ key: 9, value: s })}
                        />
                    </div>
                </div>
            </div>
            <div className='tercero'>
                <div className='dataInput'>
                    <Form form={form} onFinish={onFinish} className='form'>
                        <Form.Item name='nivel' label='Nivel'>
                            <Input type={'number'} min={0} max={5} />
                        </Form.Item>
                        <Form.Item name='url' label='URL'>
                            <Input />
                        </Form.Item>
                        <div className='btnera'>
                            <Button htmlType='submit' type='primary' id='btnSubir'>
                                Subir
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='levels'>
                    <label id='titleLvl'>Lvl 5</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('5')}</div>
                    </div>
                    <label id='titleLvl'>Lvl 4</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('4')}</div>
                    </div>
                    <label id='titleLvl'>Lvl 3</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('3')}</div>
                    </div>
                    <label id='titleLvl'>Lvl 2</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('2')}</div>
                    </div>
                    <label id='titleLvl'>Lvl 1</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('1')}</div>
                    </div>
                    <label id='titleLvl'>Lvl 0</label>
                    <div className='lvl'>
                        <div className='imagenes'>{mapImagenes('0')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Administracion;
