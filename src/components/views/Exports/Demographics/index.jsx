import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';

import { message } from 'antd';
import dayjs from 'dayjs';

import ButtonsArea from '../../../commons/ButtonsArea';
import { columns } from './data';
import {
    capitilizeWord,
    isEmptyString,
    isInvalidElem,
    getCurrentAge,
    returnJoinedArray,
    returnJoinedArrayByKey,
    normalize24HoursTo12Hours,
    isEmptyArray,
} from '../../../../utils';

const Demographics = ({ selected = false, setLoading }) => {
    const [exportData, setExportData] = useState([]);
    const [info1, setInfo1] = useState([]);
    const [info2, setInfo2] = useState([]);
    const [info3, setInfo3] = useState([]);
    const [info4, setInfo4] = useState([]);
    const [info5, setInfo5] = useState([]);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);
    const [flag4, setFlag4] = useState(false);
    const [flag5, setFlag5] = useState(false);
    const [fileReady, setFileReady] = useState(false);

    useEffect(() => {
        selected && getExportData();
        return () => {
            setExportData(null);
            setFileReady(false);
        };
    }, [selected]);

    useEffect(() => {
        getInfo2();
    }, [info1.length]);

    useEffect(() => {
        getInfo3();
    }, [flag2]);

    useEffect(() => {
        getInfo4();
    }, [flag3]);

    useEffect(() => {
        getInfo5();
    }, [flag4]);

    useEffect(() => {
        setExportData(info5);
    }, [flag5]);

    const getExportData = async () => {
        try {
            const { data } = await apiURL.get('/informacionUsuarios');
            setInfo1(data);
        } catch (error) {
            setFileReady(false);
            console.groupCollapsed('[Demographics.jsx]');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 1');
        }
    };

    const getInfo2 = () => {
        try {
            info1.map(async (item, index) => {
                const {
                    usuario,
                    apellidoMaterno,
                    apellidoPaterno,
                    nombre,
                    celular,
                    genero,
                    estadoDeNacimiento,
                    tiempoViviendoAhi,
                    ciudadDeResidencia,
                    fechaDeNacimiento,
                } = item;

                const updatedInfo = {
                    idPaciente: usuario,
                    apellidoPaterno: apellidoPaterno,
                    apellidoMaterno: apellidoMaterno,
                    nombre: nombre,
                    fechaDeNacimiento:
                        (fechaDeNacimiento &&
                            dayjs(fechaDeNacimiento).format('DD-MM-YYYY')) ||
                        '',
                    celular: celular,
                    genero: capitilizeWord(genero),
                    edad: getCurrentAge(fechaDeNacimiento),
                    estadoDeNacimiento: estadoDeNacimiento,
                    ciudadDeResidencia: ciudadDeResidencia,
                    tiempoViviendoAhi: tiempoViviendoAhi,
                };

                const { data } = await apiURL.get(
                    `datosUsuarios/individual?usuario=${item.usuario}`
                );

                const { altura, peso, actividadFisica } = data[0];

                const lastWeight = peso[peso.length - 1];
                const hasActivity = !isEmptyString(actividadFisica.tipoDeActividad);
                const normalizeMinDay =
                    (actividadFisica?.minXdia && actividadFisica?.minXdia) || 0;
                const normalizeRepeats =
                    (actividadFisica?.vecesXsemana && actividadFisica?.vecesXsemana) || 0;

                updatedInfo.altura = altura ?? '';
                updatedInfo.peso = lastWeight || '';
                updatedInfo.actividadFisica = (hasActivity && 'Sí') || 'No';
                updatedInfo.tipoDeActividad =
                    (hasActivity && capitilizeWord(actividadFisica.tipoDeActividad)) || '';
                updatedInfo.intensidad =
                    (actividadFisica?.intensidad &&
                        capitilizeWord(actividadFisica.intensidad)) ||
                    '';
                updatedInfo.vecesXsemana = normalizeRepeats?.toLowerCase().split('veces')[0];
                updatedInfo.minXdia = normalizeMinDay?.toLowerCase().split('o')[0];
                setInfo2((prevState) => [...prevState, updatedInfo]);

                if (index === info1.length - 1) setFlag2(true);
            });
        } catch (error) {
            console.groupCollapsed('[Demographics.jsx] getInfo2');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 2');
        }
    };

    const getInfo3 = () => {
        try {
            info2.map(async (item, index) => {
                const { data } = await apiURL.get(
                    `historialClinico/individual?usuario=${item.idPaciente}`
                );

                const { historiaClinica } = data;

                const hasHistory =
                    historiaClinica?.antecedentesPatologicos &&
                    !isEmptyArray(historiaClinica.antecedentesPatologicos);
                const hasConsumption = historiaClinica?.suplementos;

                // Corregir aquí el NA DE LA BD.
                const updatedInfo = {
                    ...item,
                    padeceEnfermedad: (hasHistory && 'Sí') || 'No',
                    suplemento:
                        (hasConsumption &&
                            returnJoinedArrayByKey(
                                'suplemento',
                                historiaClinica.suplementos
                            )) ||
                        'No',
                };

                setInfo3((prevState) => [...prevState, updatedInfo]);

                if (index === info2.length - 1) setFlag3(true);
            });
        } catch (error) {
            console.groupCollapsed('[Demographics.jsx] getInfo3');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 3');
        }
    };

    const getInfo4 = () => {
        try {
            info3.map(async (item, index) => {
                const { data } = await apiURL.get(
                    `/datosSocioeconomicos/individual?usuario=${item.idPaciente}`
                );

                const { nivelSocioeconomico } = data;

                if (isInvalidElem(nivelSocioeconomico)) return;

                const {
                    educacion,
                    ocupacion,
                    diasDeTrabajoXsemana,
                    modalidad,
                    horarioEntrada,
                    horarioSalida,
                    ingresosMes,
                    dineroDeAlimentacionXmesIndivi,
                    dineroDeAlimentacionXmesHogar,
                } = nivelSocioeconomico;

                const updatedInfo = {
                    ...item,
                    educacion: educacion || '',
                    ocupacion: ocupacion || '',
                    diasDeTrabajoXsemana: diasDeTrabajoXsemana || '',
                    modalidad: modalidad || '',
                    horarioEntrada: normalize24HoursTo12Hours(horarioEntrada),
                    horarioSalida: normalize24HoursTo12Hours(horarioSalida),
                    ingresosMes: ingresosMes || '',
                    dineroDeAlimentacionXmesIndivi: dineroDeAlimentacionXmesIndivi || '',
                    dineroDeAlimentacionXmesHogar: dineroDeAlimentacionXmesHogar || '',
                };

                setInfo4((prevState) => [...prevState, updatedInfo]);

                if (index === info3.length - 1) setFlag4(true);
            });
        } catch (error) {
            console.groupCollapsed('[Demographics.jsx] getInfo4');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 4');
        }
    };

    const getInfo5 = () => {
        try {
            info4.map(async (item, index) => {
                const { data } = await apiURL.get(
                    `/alimentacionUsuarios/individual?usuario=${item.idPaciente}`
                );

                const {
                    estatusDieta,
                    comidaFavorita,
                    comidaNoFavorita,
                    alergiasAlimentarias,
                    lugarDeCompras,
                    quienCocina,
                    extras,
                    desayuno,
                    colacion1,
                    comida,
                    colacion2,
                    cena,
                    desayunoAyer,
                    colacion1Ayer,
                    comidaAyer,
                    colacion2Ayer,
                    cenaAyer,
                } = data;

                const hasInvalidStatus =
                    isInvalidElem(estatusDieta?.sigueDieta) ||
                    isEmptyString(estatusDieta?.sigueDieta);
                const newStatus = (hasInvalidStatus && estatusDieta?.sigueDieta) || 'No';
                const hasInvalidNutritionistValue = !isInvalidElem(
                    estatusDieta?.conNutriologo
                );
                const withNutritionist = estatusDieta?.conNutriologo === 0 ? 'No' : 'Sí';
                const hasAllergies =
                    !isInvalidElem(alergiasAlimentarias) &&
                    alergiasAlimentarias?.length > 0 &&
                    !isEmptyString(alergiasAlimentarias[0]);

                const updatedInfo = {
                    ...item,
                    comidaFavorita: returnJoinedArray(comidaFavorita),
                    comidaNoFavorita: returnJoinedArray(comidaNoFavorita),
                    lugarDeCompras: returnJoinedArray(lugarDeCompras),
                    quienCocina: returnJoinedArray(quienCocina),
                    sigueDieta: newStatus,
                    conNutriologo: (hasInvalidNutritionistValue && 'No') || withNutritionist,
                    alergiasAlimentarias:
                        (hasAllergies && returnJoinedArray(alergiasAlimentarias)) || 'No',
                };

                setInfo5((prevState) => [...prevState, updatedInfo]);

                if (index === info4.length - 1) {
                    setFlag5(true);
                    setTimeout(() => {
                        setFileReady(true);
                        setLoading(false);
                    }, 1000);
                }
            });
        } catch (error) {
            console.groupCollapsed('[Demographics.jsx] getInfo5');
            console.log(error);
            console.groupEnd();
            message.error('Ocurrió un error en el paso número 5');
        }
    };

    return (
        <ButtonsArea
            fileReady={fileReady}
            xlsxData={{
                columns: columns,
                data: exportData,
                fileName: `Datos demográficos total ${dayjs(new Date()).format(
                    'DD-MM-YYYY'
                )}`,
            }}
        />
    );
};

export default Demographics;
