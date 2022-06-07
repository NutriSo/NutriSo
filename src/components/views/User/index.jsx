import React, { useState, useEffect } from 'react';
import apiURL from '../../../axios/axiosConfig';

import { DatePicker, Space, Select, Form, message } from 'antd';
import Popup from './popup';
import moment from 'moment';
import dayjs from 'dayjs';

import { isEmptyArray } from '../../../utils';


import CampoCor from '../../commons/Charts/CampoCor';
import IndicadoresBio from '../../commons/Charts/IndicadoresBio';
import Weight from '../../commons/UserUpdate/Weight';
import Circumference from '../../commons/UserUpdate/Circumference';
import BodyFields from '../../commons/UserUpdate/BodyFields';
import { capitilizeWord } from '../../../utils';
import { Rules } from '../../../utils/formRules';

import './user.scss';

const standardAvatar = 'https://res.cloudinary.com/dwjv6orjf/image/upload/v1618875313/standard_avatar_txfgx5.png';

const Usuarios = () => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [info, setInfo] = useState({});
    const { Option } = Select;

    const globalUserId = window.location.hash.split('usuarios/')[1].trim();
    const isPhotoExist = info?.foto && info.foto !== '';
    const formattedBirthday = dayjs(info.fechaDeNacimiento).format('YYYY-MM-DD');
    //Variables
    let [name, setName] = useState('');
    let [apellidoP, setApellidoP] = useState('');
    let [apellidoM, setApellidoM] = useState('');
    let [celular, setCelular] = useState('');
    let [ciudadResidencia, setCiudadResidencia] = useState('');
    let [tiempoResidando, setTiempoResidando] = useState('');
    let [estadoDeNacomiento, setEstadoDeNacimiento] = useState('');
    let [fechaNacimiento, setFechaNacimiento] = useState('');
    let [genero, setGenero] = useState('');

    //Circunferencia


    //Campos Corporales
    

    // Bioquimicos
    const [infoBioquimicos, setInfoBioquimicos] = useState({});
    const [infoBioquimicosDates, setBioquimicosDates] = useState({});

    //Estado General
    const [infoEstadoGeneral, setInfoEstadoGenral] = useState({});
    const [generalCheckPYM, setGeneralCheckPYM] = useState({});
    const [generalCheckNa, setGeneralCheckNa] = useState({});
    const [generalCheckPi, setGeneralCheckPi] = useState({});
    const [generalCheckNails, setGeneralCheckNails] = useState({});
    const [generalCheckCabello, setGeneralCheckCabello] = useState({});
    const [generalCheckBoca1, setGeneralCheckBoca1] = useState({});
    const [generalCheckBoca2, setGeneralCheckBoca2] = useState({});
    const [generalCheckBoca3, setGeneralCheckBoca3] = useState({});
    const [generalCheckBoca4, setGeneralCheckBoca4] = useState({});

    //Exposicion Solar
    const [infoExpoSol, setInfoExpoSol] = useState({});
    const [ExpoSolChecBloSolar, setExpoSolCheckBloSolar] = useState({});

    //Gastro intestinal
    const [inflamacionIntestinal, setInflaInt] = useState();
    const [diarea, setDiarrea] = useState();
    const [estrenimiento, setEstrenimiento] = useState();
    const [reflujo, setReflujo] = useState();
    const [frecuenciaInflamacionIntestinal, setFrecuenciaInfInt] = useState();
    const [frecuenciaDiarrea, setFrecuenciaDiarrea] = useState('');
    const [frecuenciaEstreimiento, setFrecuenciaEstreimiento] = useState('');
    const [frecuenciaReflujo, setFrecuenciaReflujo] = useState('');

    //Indicadores Clinicos Schema
    let [presionArterialEntry, setPresionArterialEn] = useState();
    let [acanthosisNigricansEntry, setAcenthosisNigricansEn] = useState();
    const [newPresionArterial, setPresionArterial] = useState([]);
    const [newAcanthosisNigricans, setAcanthosisNigricans] = useState([]);
    const [newPosicionesCliSchema, setPosicionesCliSchema] = useState([]);

    //Indicadores de Sueño
    let [horasDeSleepEntry, setHorasDeSleepEn] = useState();
    let [estadoDeDescansoEntry, setEstadoDeDescansoEn] = useState();
    //let [frecuenciaDesXNocheEntry, setFrecuenciaDesXNocheEn] = useState();
    const [newHorasSleep, setHorasSleep] = useState([]);
    const [newEstadoDeDescanso, setEstadoDeDescanso] = useState([]);
    const [despiertaXNoche, setDespiertaXNoche] = useState();
    const [frecuenciaDesXNoche, setFrecuenciaDesXNoche] = useState();
    const [newPosicionesIndSleep, setPosicionesIndSleep] = useState([]);

    //Lactancia
    const [infoLactancia, setInfoLactancia] = useState({});
    const [LactanciaCheckExlusiva, setLactanciaExclusiva] = useState({});

    function onChange(date, dateString) {
        setFechaNacimiento(dateString);
    }

    //popup Window Estado General
    const [isOpenEstadoG, setIsOpenEstadoG] = useState(false);
    const togglePopupEstadoG = () => {
        setIsOpenEstadoG(!isOpenEstadoG);
    };

    //popup Window Exposicion solar
    const [isOpenExpoSol, setIsOpenExpoSol] = useState(false);
    const togglePopupExpoSol = () => {
        setIsOpenExpoSol(!isOpenExpoSol);
    };

    //popup Window Indicadores bioquimicos
    const [isOpenIndicadoresBio, setIsOpenIndicadoresBio] = useState(false);
    const togglePopupIndicadoresBio = () => {
        setIsOpenIndicadoresBio(!isOpenIndicadoresBio);
    };

    //popup Window Indicadores Clinicos Schema
    const [isOpenIndicadoresCliSchema, setIsOpenIndicadoresCliShema] = useState(false);
    const togglePopupIndicadoresCliSchema = () => {
        setIsOpenIndicadoresCliShema(!isOpenIndicadoresCliSchema);
    };

    //popup Window Indicadores Sueño
    const [isOpenIndicadoresSleep, setIsOpenIndicadoresSleep] = useState(false);
    const togglePopupIndicadoresSleep = () => {
        setIsOpenIndicadoresSleep(!isOpenIndicadoresSleep);
    };

    //popup Window Error Circunferencia
    const [isOpenErrorCampCor, setIsOpenErrorCampCor] = useState(false);
    const togglePopupErrorCampCor = () => {
        setIsOpenErrorCampCor(!isOpenErrorCampCor);
    };

    useEffect(() => {
        fethInfo();
        return () => {
            setInfo({});
        };
    }, []);

    useEffect(() => {
        if (info?.usuario) {
            getEstadoGeneral();
            getExpoSolar();
            getBioquimicos();
            getLactancia();
        }
    }, [info]);

    const fethInfo = async () => {
        try {
            const userId = window.location.hash.split('usuarios/')[1].trim();

            const { data, status } = await apiURL.get(`/informacionUsuarios/individual?usuario=${userId}`);

            setInfo(data);
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfo');
            console.error(error);
            console.groupEnd();
        }
    };

    

    

    const getEstadoGeneral = async () => {
        try {
            const { data, status } = await apiURL.get(`/extrasEstadoGeneral/individual?usuario=${info?.usuario}`);

            if (status === 200 || data.length > 0) {
                const muchoCansancio = data[0].muchoCansancio.map((elem) => elem.valor);

                setInfoEstadoGenral({
                    muchoCansancio: muchoCansancio,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoEstadoGeneral');
            console.error(error);
            console.groupEnd();
        }
    };

    const getExpoSolar = async () => {
        try {
            const { data, status } = await apiURL.get(`/exposicionSolar/individual?usuario=${info?.usuario}`);

            if (status === 200 || data.length > 0) {
                const minutosAlSol = data[0]?.minutosAlSol.map((elem) => elem.valor);

                setInfoExpoSol({
                    minutosAlSol: minutosAlSol,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoExopSolar');
            console.error(error);
            console.groupEnd();
        }
    };

    const getBioquimicos = async () => {
        try {
            const { data, status } = await apiURL.get(`bioquimicos/individual?usuario=${info?.usuario}`);

            if (status === 200 || data.length > 0) {
                const glucosaAyuno = data[0].glucosaAyuno.map((elem) => elem.valor);
                console.log(glucosaAyuno);
                const glucosaDespues = data[0].glucosaDespues.map((elem) => elem.valor);
                const trigliceridos = data[0].trigliceridos.map((elem) => elem.valor);
                const colesterolTotal = data[0].colesterolTotal.map((elem) => elem.valor);
                const colesterolLDL = data[0].colesterolLDL.map((elem) => elem.valor);
                const colesterolHDL = data[0].colesterolHDL.map((elem) => elem.valor);
                const microbiotaIntestinal = data[0].microbiotaIntestinal.map((elem) => elem.valor);
                const datesBio = data[0].glucosaAyuno.map((elem) => elem.fecha);

                setBioquimicosDates(datesBio);

                setInfoBioquimicos({
                    glucosaAyuno,
                    glucosaDespues,
                    trigliceridos,
                    colesterolTotal,
                    colesterolLDL,
                    colesterolHDL,
                    microbiotaIntestinal,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion getBioquimicos');
            console.error(error);
            console.groupEnd();
        }
    };
    // console.log(infoLactancia);
    const getLactancia = async () => {
        try {
            const { data, status } = await apiURL.get(`/lactancia/individual?usuario=${globalUserId}`);
            // console.log(data);
            if (status === 200 || data.length > 0) {
                const maternaExclusiva = data?.maternaExclusiva;
                const artificial = data?.artificial;
                const mixta = data?.mixta;
                const maternaContemplada = data?.maternaContemplada;
                const mixtaContemplada = data?.mixtaContemplada;
                const artificialContemplada = data?.artificialContemplada;

                setInfoLactancia({
                    maternaExclusiva,
                    artificial,
                    mixta,
                    maternaContemplada,
                    mixtaContemplada,
                    artificialContemplada,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfoLactancia');
            console.error(error);
            console.groupEnd();
        }
    };

    

    

    const updateEstadoGeneral = async (values) => {
        try {
            if (infoEstadoGeneral?.muchoCansancio) {
                const pies = {
                    seHinchan: generalCheckPYM ? 'No' : values.seHinchan,
                    aQuehora: generalCheckPYM ? 'N/A' : values.saQuehora,
                    frecuencia: generalCheckPYM ? 'N/A' : values.frecuencia,
                    horasSentado: generalCheckPYM ? 'N/A' : values.horasSentado,
                    horasParado: generalCheckPYM ? 'N/A' : values.horasParado,
                    fecha: new Date(),
                };

                const nariz = {
                    sangradoDe: generalCheckNa ? 'No' : values.sangradoDe,
                    frecuenciaDe: generalCheckNa ? 'N/A' : values.frecuenciaDe,
                    fecha: new Date(),
                };

                const piel = {
                    manchasRojasMoretes: generalCheckPi ? 'No' : values.manchasRojasMoretes,
                    frecuenciaDeEllo: generalCheckPi ? 'N/A' : values.frecuenciaDeEllo,

                    fecha: new Date(),
                };

                const unas = {
                    quebradizas: generalCheckNails ? 'No' : values.quebradizas,
                    frecuencia2: generalCheckNails ? 'N/A' : values.frecuencia2,
                    fecha: new Date(),
                };

                const cabello = {
                    caidaDeCabello: generalCheckCabello ? 'No' : values.caidaDeCabello,
                    cabelloQuebradizo: generalCheckCabello ? 'N/A' : values.cabelloQuebradizo,
                    cabelloTenidoOTratamiento: generalCheckCabello ? 'N/A' : values.cabelloTenidoOTratamiento,
                    fecha: new Date(),
                };

                const boca = {
                    cortadurasEnComisuras: generalCheckBoca1 ? 'No' : values.cortadurasEnComisuras,
                    frecuencia3: generalCheckBoca1 ? 'N/A' : values.frecuencia3,
                    inflamacionDeLengua: generalCheckBoca2 ? 'No' : values.inflamacionDeLengua,
                    frecuenciaDe2: generalCheckBoca2 ? 'N/A' : values.frecuenciaDe2,
                    inflamacionEncias: generalCheckBoca3 ? 'No' : values.inflamacionEncias,
                    frecuenciaDeIE: generalCheckBoca3 ? 'N/A' : values.frecuenciaDeIE,
                    sangradoEncias: generalCheckBoca4 ? 'No' : values.sangradoEncias,
                    frecuenciaDeSE: generalCheckBoca4 ? 'N/A' : values.frecuenciaDeSE,
                    fecha: new Date(),
                };

                const body = {
                    usuario: info.usuario,
                    muchoCansancio: {
                        valor: values.muchoCansancio,
                        fecha: new Date(),
                    },
                    mareos: { valor: values.mareos, fecha: new Date() },
                    muchaSed: { valor: values.muchaSed, fecha: new Date() },
                    muchasGanasDeOrinar: {
                        valor: values.muchasGanasDeOrinar,
                        fecha: new Date(),
                    },
                    muchaHambre: {
                        valor: values.muchaHambre,
                        fecha: new Date(),
                    },
                    piesYmanos: pies,
                    nariz,
                    piel,
                    unas,
                    cabello,
                    boca,
                    tipoDeNacimiento: values.tipoDeNacimiento,
                };
                console.log('Body', body);
                console.log('PATCH');
                const { data } = await apiURL.patch(`extrasEstadoGeneral/individual?usuario=${info.usuario}`, body);
                console.log(data);
            } else {
                const datosPies = {
                    seHinchan: generalCheckPYM ? 'No' : values.seHinchan,
                    aQuehora: generalCheckPYM ? 'N/A' : values.saQuehora,
                    frecuencia: generalCheckPYM ? 'N/A' : values.frecuencia,
                    horasSentado: generalCheckPYM ? 'N/A' : values.horasSentado,
                    horasParado: generalCheckPYM ? 'N/A' : values.horasParado,
                    fecha: new Date(),
                };
                const datosNariz = {
                    sangradoDe: generalCheckNa ? 'No' : values.sangradoDe,
                    frecuenciaDe: generalCheckNa ? 'N/A' : values.frecuenciaDe,
                    fecha: new Date(),
                };
                const datosPiel = {
                    manchasRojasMoretes: generalCheckPi ? 'No' : values.manchasRojasMoretes,
                    frecuenciaDeEllo: generalCheckPi ? 'N/A' : values.frecuenciaDeEllo,
                    fecha: new Date(),
                };
                const datosNails = {
                    quebradizas: generalCheckNails ? 'No' : values.quebradizas,
                    frecuencia: generalCheckNails ? 'N/A' : values.frecuencia2,
                    fecha: new Date(),
                };
                const datosCabello = {
                    caidaDeCabello: generalCheckCabello ? 'No' : values.caidaDeCabello,
                    cabelloQuebradizo: generalCheckCabello ? 'N/A' : values.cabelloQuebradizo,
                    cabelloTenidoOTratamiento: generalCheckCabello ? 'N/A' : values.cabelloTenidoOTratamiento,
                    fecha: new Date(),
                };
                const datosBoca = {
                    cortadurasEnComisuras: generalCheckBoca1 ? 'No' : values.cortadurasEnComisuras,
                    frecuencia3: generalCheckBoca1 ? 'N/A' : values.frecuencia3,
                    inflamacionDeLengua: generalCheckBoca2 ? 'No' : values.inflamacionDeLengua,
                    frecuenciaDe2: generalCheckBoca2 ? 'N/A' : values.frecuenciaDe2,
                    inflamacionEncias: generalCheckBoca3 ? 'No' : values.inflamacionEncias,
                    frecuenciaDeIE: generalCheckBoca3 ? 'N/A' : values.frecuenciaDeIE,
                    sangradoEncias: generalCheckBoca4 ? 'No' : values.sangradoEncias,
                    frecuenciaDeSE: generalCheckBoca4 ? 'N/A' : values.frecuenciaDeSE,
                    fecha: new Date(),
                };
                // Este body no te va a servir para hacer el patch, puesto que ya no será necesario enviar arreglos, sino, objetos.
                const body = {
                    usuario: info.usuario,
                    muchoCansancio: [{ valor: values.muchoCansancio, fecha: new Date() }],
                    mareos: [{ valor: values.mareos, fecha: new Date() }],
                    muchaSed: [{ valor: values.muchaSed, fecha: new Date() }],
                    muchasGanasDeOrinar: [
                        {
                            valor: values.muchasGanasDeOrinar,
                            fecha: new Date(),
                        },
                    ],
                    muchaHambre: [{ valor: values.muchaHambre, fecha: new Date() }],
                    piesYmanos: [datosPies],
                    nariz: [datosNariz],
                    piel: [datosPiel],
                    unas: [datosNails],
                    cabello: [datosCabello],
                    boca: [datosBoca],
                    tipoDeNacimiento: values.tipoDeNacimiento,
                };
                console.log('Body', body);
                console.log('POST');
                const { data } = await apiURL.post(`extrasEstadoGeneral/individual?usuario=${info.usuario}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateEstadoGeneral');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateExpoSol = async (values) => {
        console.log('Aqui estoy ');
        try {
            if (infoExpoSol?.minutosAlSol) {
                const body = {
                    usuario: info.usuario,
                    minutosAlSol: {
                        valor: values.minutosAlSol,
                        fecha: new Date(),
                    },
                    cubresTuPiel: { valor: values.cubresTuPiel, fecha: new Date() },
                    bloqueadorSolar: ExpoSolChecBloSolar ? 'No' : { valor: values.bloqueadorSolar, fecha: new Date() },
                    diasXsemana: ExpoSolChecBloSolar ? 'N/A' : { valor: values.diasXsemana, fecha: new Date() },
                };
                console.log('Body', body);
                console.log('PATCH');

                const { data } = await apiURL.patch(`exposicionSolar/individual?usuario=${info.usuario}`, body);
                console.log(data);
            } else {
                const body = {
                    usuario: info.usuario,
                    minutosAlSol: [{ valor: values.minutosAlSol, fecha: new Date() }],
                    cubresTuPiel: [{ valor: values.cubresTuPiel, fecha: new Date() }],
                    bloqueadorSolar: [
                        ExpoSolChecBloSolar ? 'No' : { valor: values.bloqueadorSolar, fecha: new Date() },
                    ],
                    diasXsemana: [ExpoSolChecBloSolar ? 'N/A' : { valor: values.diasXsemana, fecha: new Date() }],
                };
                console.log('Body', body);
                console.log('POST');

                const { data } = await apiURL.post(`exposicionSolar/individual?usuario=${info.usuario}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateExpoSol');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateIndicadoresBio = async (values) => {
        try {
            const body = {
                glucosaAyuno: { valor: values.glucosaAyuno, fecha: new Date() },
                glucosaDespues: {
                    valor: values.glucosaDespues,
                    fecha: new Date(),
                    minutos: values.minutos,
                },
                trigliceridos: {
                    valor: values.trigliceridos,
                    fecha: new Date(),
                },
                colesterolTotal: {
                    valor: values.colesterolTotal,
                    fecha: new Date(),
                },
                colesterolLDL: {
                    valor: values.colesterolLDL,
                    fecha: new Date(),
                },
                colesterolHDL: {
                    valor: values.colesterolHDL,
                    fecha: new Date(),
                },
                microbiotaIntestinal: {
                    valor: values.microbiotaIntestinal,
                    fecha: new Date(),
                },
            };
            console.log(infoBioquimicos);
            if (infoBioquimicos?.glucosaAyuno) {
                console.log('PATCH');
                const { data } = await apiURL.patch(`bioquimicos/individual?usuario=${info.usuario}`, body);
                console.log(data);
            } else {
                console.log('POST');
                const { data } = await apiURL.post(`bioquimicos/individual?usuario=${info.usuario}`, body);
                console.log(data);
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateIndicadoresBio');
            console.error(error);
            console.groupEnd();
        }

        setIsOpenIndicadoresBio(false);
    };

    const updateLactancia = async (values) => {
        console.log('Hello');
        const matExc = !isEmptyArray(infoLactancia?.maternaExclusiva);
        const artif = !isEmptyArray(infoLactancia?.artificial);
        const mix = !isEmptyArray(infoLactancia?.mixta);
        const mixCont = !isEmptyArray(infoLactancia?.mixtaContaminada);
        const artifCont = !isEmptyArray(infoLactancia?.artificialContaminada);

        const userId = window.location.hash.split('usuarios/')[1].trim();
        try {
            if (matExc || artif || mix || mixCont || artifCont) {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: globalUserId,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: globalUserId,
                        artificial: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: globalUserId,
                        mixta: [LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() }],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: globalUserId,
                        maternaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: globalUserId,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: globalUserId,
                        artificialContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.patch(`lactancia/individual?usuario=${globalUserId}`, body);
                    console.log(data);
                }
                console.log('PATCH');
            } else {
                const opc = values.opcionLactancia;
                console.log(opc);

                if (opc === 'Lactancia materna exclusiva') {
                    const body = {
                        usuario: info.usuario,
                        maternaExclusiva: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial') {
                    const body = {
                        usuario: info.usuario,
                        artificial: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta') {
                    const body = {
                        usuario: info.usuario,
                        mixta: [LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() }],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia materna complementada') {
                    const body = {
                        usuario: info.usuario,
                        maternaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia mixta complementada') {
                    const body = {
                        usuario: info.usuario,
                        mixtaContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                if (opc === 'Lactancia artificial complementada') {
                    const body = {
                        usuario: info.usuario,
                        artificialContemplada: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.opcionLactancia, fecha: new Date() },
                        ],
                        tiempoLactancia: [
                            LactanciaCheckExlusiva ? 'N/A' : { valor: values.tiempoLactancia, fecha: new Date() },
                        ],
                    };
                    console.log('Body', body);
                    const { data } = await apiURL.post(`lactancia/individual?usuario=${info.usuario}`, body);
                    console.log(data);
                }

                console.log('POST');
            }
        } catch (error) {
            console.groupCollapsed('[ERROR] updateLactancia');
            console.error(error);
            console.groupEnd();
        }
    };
    
    

    function InflamacionInt(e) {
        const x = e;
        setInflaInt(x);
    }

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
            const userId = window.location.hash.split('usuarios/')[1].trim();

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

            const res = await apiURL.patch(`/informacionUsuarios/individual?usuario=${userId}`, body);
            console.log(res);
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfo');
            console.error(error);
            console.groupEnd();
        }

        fethInfo();
    }

    async function GuardarGastroInt() {}

    async function guardarLactancia() {}

    return (
        <>
            <div className='glassbackground'>
                <div className='containerBasicInfo'>
                    <div className='basicInfo-Title'>Profile Settings</div>

                    <div className='profile-imgBasic'>
                        <img src={isPhotoExist ? info.foto : standardAvatar} className='photo' alt='userImage' />
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
                                onChange={(event) => setApellidoP(event.target.value)}></input>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-name'>Apellido Materno:</label>
                            <input
                                className='lb-name'
                                placeholder={info.apellidoMaterno || ''}
                                type='text'
                                name='apellidoMaterno'
                                onChange={(event) => setApellidoM(event.target.value)}></input>
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
                                onChange={(event) => setCiudadResidencia(event.target.value)}></input>
                        </div>
                        <div className='basicInfo-homeCel-Container2'>
                            <label className='id-name'>Tiempo Residando:</label>
                            <input
                                className='lb-name'
                                placeholder={capitilizeWord(info.tiempoViviendoAhi || '')}
                                type='text'
                                name='residando'
                                onChange={(event) => setTiempoResidando(event.target.value)}></input>
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
                                onChange={(event) => setEstadoDeNacimiento(event.target.value)}></input>
                        </div>
                        <div className='basicInfo-birthPlaceGender-Container2'>
                            <label className='id-name'>Fecha de Nacimiento:</label>
                            <Space direction='vertical'>
                                {formattedBirthday !== dayjs(new Date()).format('YYYY-MM-DD') && (
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
                            <button className='btn-Save-basicInfo' onClick={() => GuardarCambios()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <Weight id={globalUserId} />
                <Circumference id={globalUserId} /> 

                {/*new Campos Corporales--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                

                {/*Indicadores Bioquimicos--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='containerCampoCor'>
                    <div className='basicInfo-Title'>Indicadores Bioquimicos</div>
                    {/*Grafica-----------------------------------------------------------------------*/}
                    <div className='campCor-Container3'>
                        <div>
                            {infoBioquimicos?.glucosaAyuno?.length > 0 && (
                                <IndicadoresBio data={infoBioquimicos} dates={infoBioquimicosDates} />
                            )}
                        </div>
                    </div>
                    {/*Fin de grafica----------------------------------------------------------------*/}
                    <div>
                        <div className='campCor-Container'>
                            <div className='campoCor-Container2'>
                                <input
                                    type='button'
                                    value='Agregar'
                                    onClick={togglePopupIndicadoresBio}
                                    className='btn-see-camCor'
                                />
                                <p></p>
                                {isOpenIndicadoresBio && (
                                    <Popup
                                        content={
                                            <Form form={form} requiredMark={false} onFinish={updateIndicadoresBio}>
                                                <b>Agregando un nuevo valor</b>
                                                <div>
                                                    <div className='campoCor-Container'>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Glucosa en el ayuno'
                                                                name='glucosaAyuno'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Glucosa después'
                                                                name='glucosaDespues'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label='Minutos después'
                                                                name='minutos'
                                                                rules={[Rules.minZero]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Trigliceridos'
                                                                name='trigliceridos'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Colesterol total'
                                                                name='colesterolTotal'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Colesterol LDL'
                                                                name='colesterolLDL'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Colesterol HDL'
                                                                name='colesterolHDL'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className='campCor-Container4'>
                                                            <Form.Item
                                                                label='Microbiota intestital'
                                                                name='microbiotaIntestinal'
                                                                rules={[Rules.minOne]}>
                                                                <input
                                                                    className='input-campCor'
                                                                    type='number'
                                                                    name='numero'
                                                                    min={0}
                                                                    placeholder=''
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    htmlType='submit'
                                                    className='btn-see-camCor'
                                                    /* onClick={
                                                        updateIndicadoresBio
                                                    } */
                                                    value='Add'>
                                                    Agregar
                                                </button>
                                            </Form>
                                        }
                                        handleClose={togglePopupIndicadoresBio}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/*new new Estado Genaral--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='containerEstadoGen'>
                    <div className='basicInfo-Title3'>Estado general</div>
                    <Form form={form} requiredMark={false} onFinish={updateEstadoGeneral}>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Mucho cansancio:</label>
                                <Form.Item
                                    name='muchoCansancio'
                                    className='lb-gastrInSelect'
                                    rules={[Rules.basicSpanish]}>
                                    <Select name='mCancancio' defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Mareos:</label>
                                <Form.Item name='mareos' className='lb-gastrInSelect' rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Mucha sed:</label>
                                <Form.Item name='muchaSed' className='lb-gastrInSelect' rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Muchas ganas de orinar:</label>
                                <Form.Item
                                    name='muchasGanasDeOrinar'
                                    className='lb-gastrInSelect'
                                    rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Mucha Hambre:</label>
                                <Form.Item name='muchaHambre' className='lb-gastrInSelect' rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Title2'>Pies y manos</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Se hinchan sus pies o manos?</label>
                                <Form.Item
                                    name='seHinchan'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckPYM(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿A qúe hora del día ocurre?</label>
                                <Form.Item
                                    name='aQuehora'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckPYM} defaultValue={''}>
                                        <Option value={'Al despertar'}>Al despertar</Option>
                                        <Option value={'Durante el día'}>Durante el día</Option>
                                        <Option value={'En la noche'}>En la noche</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con que frecuencia ocurre?</label>
                                <Form.Item
                                    name='frecuencia'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckPYM} defaultValue={''}>
                                        <Option value={'Al despertar'}>Todos los días</Option>
                                        <Option value={'Durante el día'}>1 a 3 veces a la semana</Option>
                                        <Option value={'En la noche'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Cuántas horas pasa sentado al día? </label>
                                <Form.Item
                                    name='horasSentado'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    {/*<input disabled = {generalCheckPYM} className='lb-gastrIn2'></input>*/}
                                    <input
                                        disabled={generalCheckPYM}
                                        type='text'
                                        name='hSentado'
                                        className='lb-gastrIn2'
                                        placeholder=''
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Cuántas horas pasa parado al día? </label>
                                <Form.Item
                                    name='horasParado'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    {/*<input disabled = {generalCheckPYM} className='lb-gastrIn2'></input>*/}
                                    <input
                                        disabled={generalCheckPYM}
                                        type='text'
                                        name='hParado'
                                        className='lb-gastrIn2'
                                        placeholder=''
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Title2'>Nariz</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Sangrado de nariz:</label>
                                <Form.Item
                                    name='sangradoDe'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckNa(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre? </label>
                                <Form.Item
                                    name='frecuenciaDe'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckNa} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 2 veces a la semana'}>1 a 2 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Title2'>Piel</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Manchas rojas en su piel o moretes sin motivo:</label>
                                <Form.Item
                                    name='manchasRojasMoretes'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckPi(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre? </label>
                                <Form.Item
                                    name='frecuenciaDeEllo'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckPi} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 2 veces a la semana'}>1 a 2 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Title2'>Uñas</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Uñas quebradizas:</label>
                                <Form.Item
                                    name='quebradizas'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckNails(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>
                                    ¿Ha realizado algún tratamiento estético en sus uñas recientemente?
                                </label>
                                <Form.Item
                                    name='frecuencia2'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckNails} defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Title2'>Cabello</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Caída de cabello:</label>
                                <Form.Item
                                    name='caidaDeCabello'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckCabello(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Cabello quebradizo</label>
                                <Form.Item
                                    name='cabelloQuebradizo'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckCabello} defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>
                                    ¿Tiene su cabello teñido o bajo algún tratamiento estético?
                                </label>
                                <Form.Item
                                    name='cabelloTenidoOTratamiento'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckCabello} defaultValue={''}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Title2'>Boca</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Cortaduras en las comisuras de su boca:</label>
                                <Form.Item
                                    name='cortadurasEnComisuras'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckBoca1(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre?</label>
                                <Form.Item
                                    name='frecuencia3'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckBoca1} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Inflamación en lengua:</label>
                                <Form.Item
                                    name='inflamacionDeLengua'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckBoca2(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre?</label>
                                <Form.Item
                                    name='frecuenciaDe2'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckBoca2} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Inflamación de encías :</label>
                                <Form.Item
                                    name='inflamacionEncias'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckBoca3(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre?</label>
                                <Form.Item
                                    name='frecuenciaDeIE'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckBoca3} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Sangrado de encías:</label>
                                <Form.Item
                                    name='sangradoEncias'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select
                                        onChange={(value) => setGeneralCheckBoca4(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>¿Con qué frecuencia ocurre?</label>
                                <Form.Item
                                    name='frecuenciaDeSE'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={generalCheckBoca4} defaultValue={''}>
                                        <Option value={'Casi todos los días'}>Casi todos los días</Option>
                                        <Option value={'1 a 3 veces a la semana'}>1 a 3 veces a la semana</Option>
                                        <Option value={'1 o 2 veces al mes'}>1 o 2 veces al mes</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Title2'>Nacimiento</div>

                        <div className='basicInfo-Name-Container3'>
                            <div className='basicInfo-Name-Container4'>
                                <label className='id-gastroIn'>Naciste por:</label>
                                <Form.Item
                                    name='tipoDeNacimiento'
                                    className='lb-gastrInSelect'
                                    rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Parto vaginal'}>Parto vaginal</Option>
                                        <Option value={'Cesárea'}>Cesárea</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Save-Container'>
                            <div className='basicInfo-Save-Container2'>
                                <button
                                    className='btn-Save-basicInfo2'
                                    htmlType='submit'
                                    /*onClick={() => updateEstadoGeneral()}*/
                                    value='Add'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>

                {/*new Expocicion solar--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='containerGastroInt'>
                    <div className='basicInfo-Title'>Expocición Solar</div>
                    <Form form={form3} requiredMark={false} onFinish={updateExpoSol}>
                        <div className='basicInfo-Name-Container5'>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>¿Cuántos minutos te expones al sol al día</label>
                                <Form.Item
                                    name='minutosAlSol'
                                    className='lb-gastrInSelect'
                                    rules={[Rules.basicSpanish]}>
                                    <Select name='mMinSol' defaultValue={''}>
                                        <Option value={'Menos de 5 minutos'}>Menos de 5 minutos</Option>
                                        <Option value={'5 a 10 minutos'}>5 a 10 minutos</Option>
                                        <Option value={'10 a 15 minutos'}>10 a 15 minutos</Option>
                                        <Option value={'15 a 20 minutos'}>15 a 20 minutos</Option>
                                        <Option value={'20 a 30 minutos'}>20 a 30 minutos</Option>
                                        <Option value={'30 minutos a 1 hora'}>30 minutos a 1 hora</Option>
                                        <Option value={'Más de 1 hora'}>Más de 1 hora</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>
                                    ¿Cubres tu piel con ropa de manga larga, pantalón, gorra o sombrero?
                                </label>
                                <Form.Item
                                    name='cubresTuPiel'
                                    className='lb-gastrInSelect'
                                    rules={[Rules.basicSpanish]}>
                                    <Select defaultValue={''}>
                                        <Option value={'Siempre'}>Siempre</Option>
                                        <Option value={'A veces'}>A veces</Option>
                                        <Option value={'Nunca'}>Nunca</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Name-Container5'>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>¿Utilizas bloqueador solar?</label>
                                <Form.Item
                                    name='bloqueadorSolar'
                                    className='lb-gastrInSelect'
                                    /*rules={[Rules.basicSpanish]}*/
                                >
                                    <Select
                                        onChange={(value) => setExpoSolCheckBloSolar(value === 'No' ? true : false)}
                                        defaultValue={'No'}>
                                        <Option value={'Si'}>Si</Option>
                                        <Option value={'No'}>No</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>¿Cuántos días a la semana?</label>
                                <Form.Item
                                    name='diasXsemana'
                                    className='lb-gastrInSelect'
                                    /*
                                    rules={[
                                        Rules.basicSpanish,
                                    ]}*/
                                >
                                    <Select disabled={ExpoSolChecBloSolar} defaultValue={''}>
                                        <Option value={'1'}>1</Option>
                                        <Option value={'2'}>2</Option>
                                        <Option value={'3'}>3</Option>
                                        <Option value={'4'}>4</Option>
                                        <Option value={'5'}>5</Option>
                                        <Option value={'6'}>6</Option>
                                        <Option value={'7'}>7</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='basicInfo-Save-Container'>
                            <div className='basicInfo-Save-Container2'>
                                <button
                                    className='btn-Save-basicInfo3'
                                    htmlType='submit'
                                    /*onClick={() => updateEstadoGeneral()}*/
                                    value='Add'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>

                {/*Gastro intestinal--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='containerGastroInt'>
                    <div className='basicInfo-Title'>Gastro intestinal</div>

                    <div className='basicInfo-Name-Container'>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Inflamación intestinal:</label>
                            <Select
                                id='inflaInt'
                                defaultValue={'No'}
                                className='lb-gastrInSelect'
                                onChange={(e) => InflamacionInt(e)}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Frecuencia:</label>
                            <input
                                className='lb-gastrIn'
                                placeholder={''}
                                type='text'
                                name='Frecuencia'
                                onChange={(event) => setFrecuenciaInfInt(event.target.value)}></input>
                        </div>
                    </div>
                    <div className='basicInfo-homeCel-Container'>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Diarrea:</label>
                            <Select
                                id='inflaInt'
                                defaultValue={'No'}
                                className='lb-gastrInSelect'
                                onChange={(e) => setDiarrea(e)}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Frecuencia:</label>
                            <input
                                className='lb-gastrIn'
                                placeholder={''}
                                type='text'
                                name='Frecuencia'
                                onChange={(event) => setFrecuenciaDiarrea(event.target.value)}></input>
                        </div>
                    </div>
                    <div className='basicInfo-birthPlaceGender-Container'>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Estreñimiento:</label>
                            <Select
                                id='inflaInt'
                                defaultValue={'No'}
                                className='lb-gastrInSelect'
                                onChange={(e) => setEstrenimiento(e)}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Frecuencia:</label>
                            <input
                                className='lb-gastrIn'
                                placeholder={''}
                                type='text'
                                name='Frecuencia'
                                onChange={(event) => setFrecuenciaEstreimiento(event.target.value)}></input>
                        </div>
                    </div>
                    <div className='basicInfo-Name-Container'>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Reflujo:</label>
                            <Select
                                id='inflaInt'
                                defaultValue={'No'}
                                className='lb-gastrInSelect'
                                onChange={(e) => setReflujo(e)}>
                                <Option value={'Si'}>Si</Option>
                                <Option value={'No'}>No</Option>
                            </Select>
                        </div>
                        <div className='basicInfo-Name-Container2'>
                            <label className='id-gastroIn'>Frecuencia:</label>
                            <input
                                className='lb-gastrIn'
                                placeholder={''}
                                type='text'
                                name='Frecuencia'
                                onChange={(event) => setFrecuenciaReflujo(event.target.value)}></input>
                        </div>
                    </div>
                    <div className='basicInfo-Save-Container'>
                        <div className='basicInfo-Save-Container2'>
                            <button className='btn-Save-basicInfo' onClick={() => GuardarGastroInt()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                {/*Lactancia Schema--------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='containerGastroInt'>
                    <div className='basicInfo-Title'>Lactancia</div>
                    <Form form={form2} requiredMark={false} onFinish={updateLactancia}>
                        <div className='basicInfo-Name-Container5'>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>Lactancia materna exclusiva:</label>
                                <Form.Item
                                    name='opcionLactancia'
                                    className='lb-gastrInSelect'
                                    /*rules={[Rules.basicSpanish]}*/
                                >
                                    <Select
                                        onChange={(value) => setLactanciaExclusiva(value === '' ? true : false)}
                                        defaultValue={''}>
                                        <Option value={'Lactancia materna exclusiva'}>
                                            Lactancia materna exclusiva
                                        </Option>
                                        <Option value={'Lactancia artificial'}>Lactancia artificial</Option>
                                        <Option value={'Lactancia mixta'}>Lactancia mixta</Option>
                                        <Option value={'Lactancia materna complementada'}>
                                            Lactancia materna complementada
                                        </Option>
                                        <Option value={'Lactancia mixta complementada'}>
                                            Lactancia mixta complementada
                                        </Option>
                                        <Option value={'Lactancia artificial complementada'}>
                                            Lactancia artificial complementada
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='basicInfo-Name-Container6'>
                                <label className='id-gastroIn'>¿Por cuánto tiempo? </label>
                                <Form.Item name='tiempoLactancia' rules={[Rules.basicSpanish]} required='true'>
                                    {/*<input disabled = {generalCheckPYM} className='lb-gastrIn2'></input>*/}
                                    <input
                                        disabled={LactanciaCheckExlusiva}
                                        type='text'
                                        name='tLactancia'
                                        className='lb-gastrIn2'
                                        placeholder=''
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='basicInfo-Save-Container'>
                            <div className='basicInfo-Save-Container2'>
                                <button
                                    className='btn-Save-basicInfo3'
                                    htmlType='submit'
                                    /*onClick={() => updateEstadoGeneral()}*/
                                    value='Add'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Usuarios;
