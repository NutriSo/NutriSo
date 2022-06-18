import React, { useState, useEffect } from 'react';
import apiURL from '../../../axios/axiosConfig';

import { DatePicker, Space } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

import Weight from '../../commons/UserUpdate/Weight';
import Circumference from '../../commons/UserUpdate/Circumference';
import BodyFields from '../../commons/UserUpdate/BodyFields';
import BioIndicators from '../../commons/UserUpdate/BioIndicators';
import OverallStatus from '../../commons/UserUpdate/OverallStatus';
import SolarExposition from '../../commons/UserUpdate/SolarExposition';
import Gastrointestinal from '../../commons/UserUpdate/Gastrointestinal';
import Lactation from '../../commons/UserUpdate/Lactation';
import { capitilizeWord, isInvalidElem, isEmptyString, getUserHash } from '../../../utils';

import './user.scss';

const standardAvatar =
    'https://res.cloudinary.com/dwjv6orjf/image/upload/v1618875313/standard_avatar_txfgx5.png';

const Usuarios = () => {
    const [info, setInfo] = useState({});
    let [name, setName] = useState('');
    let [apellidoP, setApellidoP] = useState('');
    let [apellidoM, setApellidoM] = useState('');
    let [celular, setCelular] = useState('');
    let [ciudadResidencia, setCiudadResidencia] = useState('');
    let [tiempoResidando, setTiempoResidando] = useState('');
    let [estadoDeNacomiento, setEstadoDeNacimiento] = useState('');
    let [fechaNacimiento, setFechaNacimiento] = useState('');
    let [genero, setGenero] = useState('');

    const globalUserId = getUserHash();
    const isPhotoExist = !isInvalidElem(info?.foto) && !isEmptyString(info?.foto);
    const formattedBirthday = dayjs(info.fechaDeNacimiento).format('YYYY-MM-DD');

    function onChange(date, dateString) {
        setFechaNacimiento(dateString);
    }

    useEffect(() => {
        fethInfo();
        return () => {
            setInfo({});
        };
    }, []);

    useEffect(() => {
        if (info?.usuario) {
        }
    }, [info]);

    const fethInfo = async () => {
        try {
            const { data, status } = await apiURL.get(
                `/informacionUsuarios/individual?usuario=${globalUserId}`
            );

            setInfo(data);
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfo');
            console.error(error);
            console.groupEnd();
        }
    };

    async function GuardarCambios() {
        if (name !== '') {
        } else {
            name = info.nombre;
        }

        if (apellidoP !== '') {
        } else {
            apellidoP = info.apellidoPaterno;
        }

        if (apellidoM !== '') {
        } else {
            apellidoM = info.apellidoMaterno;
        }

        if (celular !== '') {
        } else {
            celular = info.celular;
        }

        if (ciudadResidencia !== '') {
        } else {
            ciudadResidencia = info.ciudadDeResidencia;
        }

        if (tiempoResidando !== '') {
        } else {
            tiempoResidando = info.tiempoViviendoAhi;
        }

        if (estadoDeNacomiento !== '') {
        } else {
            estadoDeNacomiento = info.estadoDeNacimiento;
        }

        if (fechaNacimiento !== '') {
        } else {
            fechaNacimiento = info.fechaDeNacimiento;
        }

        if (genero !== '') {
        } else {
            genero = info.genero;
        }

        try {
            const body = {
                nombre: name,
                apellidoPaterno: apellidoP,
                apellidoMaterno: apellidoM,
                celular: celular,
                ciudadDeResidencia: ciudadResidencia,
                tiempoViviendoAhi: tiempoResidando,
                estadoDeNacimiento: estadoDeNacomiento,
                fechaDeNacimiento: fechaNacimiento,
                genero: genero,
            };

            const res = await apiURL.patch(
                `/informacionUsuarios/individual?usuario=${globalUserId}`,
                body
            );
            console.log(res);
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfo');
            console.error(error);
            console.groupEnd();
        }

        fethInfo();
    }

    return (
        <>
            <div className='glassbackground'>
                <div className='containerBasicInfo'>
                    <div className='basicInfo-Title'>Configuración de perfil</div>

                    <div className='profile-imgBasic'>
                        <img
                            src={isPhotoExist ? info.foto : standardAvatar}
                            className='photo'
                            alt='userImage'
                        />
                    </div>

                    <div className='basicInfo-Name-Container'>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-name'>Nombre:</label>
                            <input
                                className='lb-name'
                                placeholder={info.nombre || ''}
                                type='text'
                                name='nombre'
                                onChange={(event) => setName(event.target.value)}></input>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-name'>Apellido Paterno:</label>
                            <input
                                className='lb-name'
                                placeholder={info.apellidoPaterno || ''}
                                type='text'
                                name='apellidoPaterno'
                                onChange={(event) =>
                                    setApellidoP(event.target.value)
                                }></input>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-name'>Apellido Materno:</label>
                            <input
                                className='lb-name'
                                placeholder={info.apellidoMaterno || ''}
                                type='text'
                                name='apellidoMaterno'
                                onChange={(event) =>
                                    setApellidoM(event.target.value)
                                }></input>
                        </div>
                    </div>
                    <div className='basicInfo-homeCel-Container'>
                        <div className='basicInfo-homeCel-Container2'>
                            <label className='id-name'>Celular:</label>
                            <input
                                className='lb-name'
                                placeholder={info.celular || ''}
                                type='number'
                                name='celular'
                                onChange={(event) => setCelular(event.target.value)}></input>
                        </div>
                        <div className='basicInfo-homeCel-Container2'>
                            <label className='id-name'>Ciudad de residencia:</label>
                            <input
                                className='lb-name'
                                placeholder={info.ciudadDeResidencia || ''}
                                type='text'
                                name='ciudad'
                                onChange={(event) =>
                                    setCiudadResidencia(event.target.value)
                                }></input>
                        </div>
                        <div className='basicInfo-homeCel-Container2'>
                            <label className='id-name'>Tiempo Residando:</label>
                            <input
                                className='lb-name'
                                placeholder={capitilizeWord(info.tiempoViviendoAhi || '')}
                                type='text'
                                name='residando'
                                onChange={(event) =>
                                    setTiempoResidando(event.target.value)
                                }></input>
                        </div>
                    </div>
                    <div className='basicInfo-birthPlaceGender-Container'>
                        <div className='basicInfo-birthPlaceGender-Container2'>
                            <label className='id-name'>Estado de Nacimiento:</label>
                            <input
                                className='lb-name'
                                placeholder={capitilizeWord(info.estadoDeNacimiento || '')}
                                type='text'
                                name='estadoDN'
                                onChange={(event) =>
                                    setEstadoDeNacimiento(event.target.value)
                                }></input>
                        </div>
                        <div className='basicInfo-birthPlaceGender-Container2'>
                            <label className='id-name'>Fecha de Nacimiento:</label>
                            <Space direction='vertical'>
                                {formattedBirthday !==
                                    dayjs(new Date()).format('YYYY-MM-DD') && (
                                    <DatePicker
                                        defaultValue={moment(formattedBirthday, 'YYYY-MM-DD')}
                                        placeholder={formattedBirthday}
                                        onChange={onChange}
                                    />
                                )}
                            </Space>
                        </div>
                        <div className='basicInfo-birthPlaceGender-Container2'>
                            <label className='id-name'>Genero:</label>
                            <input
                                className='lb-name'
                                placeholder={capitilizeWord(info.genero || '')}
                                type='text'
                                name='genero'
                                onChange={(event) => setGenero(event.target.value)}></input>
                        </div>
                    </div>
                    <div className='basicInfo-Save-Container'>
                        <div className='basicInfo-Save-Container2'>
                            <button
                                className='btn-Save-basicInfo'
                                onClick={() => GuardarCambios()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <Weight id={globalUserId} />
                <Circumference id={globalUserId} />
                <BodyFields id={globalUserId} />
                <BioIndicators id={globalUserId} />
                <OverallStatus id={globalUserId} />
                <SolarExposition id={globalUserId} />
                <Gastrointestinal id={globalUserId} />
                <Lactation id={globalUserId} />
            </div>
        </>
    );
};

export default Usuarios;
