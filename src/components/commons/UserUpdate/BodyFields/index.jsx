import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs } from 'antd';
import Popup from './Popup';

import CampoCor from '../../Charts/CampoCor';

import './BodyFields.scss';

const BodyFields = ({ id }) => {
    const [infoCampoCor, setInfoCampCor] = useState({});
    const [infoCorDates, setInfoCorDates] = useState({});
    let [grasaEntry, setGrasaEn] = useState(-1);
    let [masaEntry, setMasaEn] = useState(-1);
    let [aguaEntry, setAguaEn] = useState(-1);
    let [oseaEntry, setOseaEn] = useState(-1);
    let [visceralEntry, setVisceralEn] = useState(-1);
    let [tMetabolicaEntry, setTMetabolicaEn] = useState(-1);
    let [eMetabolicaEntry, setEMetabolicaEn] = useState(-1);

    //popup Window Campos Corporales
    const [isOpenCampCor, setIsOpenCampCor] = useState(false);
    const togglePopupCampCor = () => {
        setIsOpenCampCor(!isOpenCampCor);
    };

    useEffect(() => {
        getinfoCampCor();

        return () => {
            setInfoCorDates({});
        };
    }, [id]);

    const getinfoCampCor = async () => {
        try {
            const { data, status } = await apiURL.get(`/extrasComposCorp/individual?usuario=${id}`);

            if (status === 200 || data.length > 0) {
                const grasas = data[0].porcentGrasa.map((elem) => elem.valor);
                const masas = data[0].porcentMasa.map((elem) => elem.valor);
                const agua = data[0].porcentAgua.map((elem) => elem.valor);
                const grasaVisceral = data[0].grasaVisceral.map((elem) => elem.valor);
                const densidadOsea = data[0].densidadOsea.map((elem) => elem.valor);
                const edadMetabolica = data[0].edadMetabolica.map((elem) => elem.valor);
                const tasaMetabolica = data[0].tasaMetabolica.map((elem) => elem.valor);
                const dates = data[0].porcentGrasa.map((elem) => elem.fecha);

                setInfoCorDates(dates);

                setInfoCampCor({
                    grasas,
                    masas,
                    agua,
                    grasaVisceral,
                    densidadOsea,
                    edadMetabolica,
                    tasaMetabolica,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion getinfoCampCor');
            console.error(error);
            console.groupEnd();
        }
    };

    //popup Window Error Circunferencia
    const [isOpenErrorCampCor, setIsOpenErrorCampCor] = useState(false);
    const togglePopupErrorCampCor = () => {
        setIsOpenErrorCampCor(!isOpenErrorCampCor);
    };

    const updateCampCor = async () => {
        if (
            grasaEntry !== -1 ||
            masaEntry !== -1 ||
            aguaEntry !== -1 ||
            oseaEntry !== -1 ||
            visceralEntry !== -1 ||
            tMetabolicaEntry !== -1 ||
            eMetabolicaEntry !== -1
        ) {
            if (!infoCampoCor?.masas) {
                try {
                    console.log('POST');
                    const body = {
                        porcentGrasa: { fecha: new Date(), valor: grasaEntry },
                        porcentMasa: { fecha: new Date(), valor: masaEntry },
                        porcentAgua: { fecha: new Date(), valor: aguaEntry },
                        densidadOsea: { fecha: new Date(), valor: oseaEntry },
                        grasaVisceral: {
                            fecha: new Date(),
                            valor: visceralEntry,
                        },
                        tasaMetabolica: {
                            fecha: new Date(),
                            valor: tMetabolicaEntry,
                        },
                        edadMetabolica: {
                            fecha: new Date(),
                            valor: eMetabolicaEntry,
                        },
                    };

                    const res2 = await apiURL.post(`/extrasComposCorp/individual?usuario=${id}`, body);
                    console.log(res2);
                } catch (error) {
                    console.groupCollapsed('Error en la funcion updateCampCor');
                    console.error(error);
                    console.groupEnd();
                }
            } else {
                try {
                    console.log('PATCH');
                    const body = {
                        porcentGrasa: { fecha: new Date(), valor: grasaEntry },
                        porcentMasa: { fecha: new Date(), valor: masaEntry },
                        porcentAgua: { fecha: new Date(), valor: aguaEntry },
                        densidadOsea: { fecha: new Date(), valor: oseaEntry },
                        grasaVisceral: {
                            fecha: new Date(),
                            valor: visceralEntry,
                        },
                        tasaMetabolica: {
                            fecha: new Date(),
                            valor: tMetabolicaEntry,
                        },
                        edadMetabolica: {
                            fecha: new Date(),
                            valor: eMetabolicaEntry,
                        },
                    };

                    const res2 = await apiURL.patch(`/extrasComposCorp/individual?usuario=${id}`, body);
                    console.log(res2);
                } catch (error) {
                    console.groupCollapsed('Error en la funcion updateCampCor');
                    console.error(error);
                    console.groupEnd();
                }
            }
            setIsOpenCampCor(false);
        } else {
            setIsOpenErrorCampCor(true);
        }
        setGrasaEn(-1);
        setMasaEn(-1);
        setAguaEn(-1);
        setOseaEn(-1);
        setVisceralEn(-1);
        setTMetabolicaEn(-1);
        setEMetabolicaEn(-1);
        setIsOpenCampCor(false);
    };

    const closeErrorCampCor = () => {
        setIsOpenErrorCampCor(false);
    };

    return (
        <>
            <div className='basicContainer'> {/**containerCampoCor, basicInfo-Title, campCor-Container3 */}
                <div className='containData'>
                    <h2>Campos Corporales</h2>
                    {/*Grafica-----------------------------------------------------------------------*/}
                    <div className='basicInfo-Container-Slide'>
                        {infoCampoCor?.grasas && Array.isArray(infoCampoCor.grasas) && (
                            <CampoCor data={infoCampoCor} dates={infoCorDates} />
                        )}
                    </div>
                </div>
            </div>

            <div className='basicContainer'>
                <input
                    type='button'
                    value='Agregar'
                    onClick={togglePopupCampCor}
                    className='btn-see-circunferencia'
                />
                <p></p>
                {isOpenCampCor && (
                    <Popup
                        content={
                            <>
                                <strong><p id='popTitle'>Agregando un nuevo valor</p></strong>
                                <div className='basicInfo-Container'>
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Porcentaje de grasa:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setGrasaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Porcentaje de masa:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setMasaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Porcentaje de agua:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setAguaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                {/**PARTICION DE CAMPOS */}
                                <div className="basicInfo-Container">
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Densidad osea:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setOseaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Grasa visceral:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setVisceralEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Tasa metabolica:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setTMetabolicaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                {/**NUEVA PARTICION 1 SOLO */}
                                <div className="basicInfo-Container">
                                    <div className='entradas'>
                                        <div className="labels">
                                            <label className='label-campCor'>Edad metabolica:</label>
                                        </div>
                                        <div className="inputs">
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setEMetabolicaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <button className='btn-see-circunferencia' onClick={updateCampCor} value='Add'>
                                    Agregar
                                </button>
                            </>
                        }
                        handleClose={togglePopupCampCor}
                    />
                )}
            </div>

            {isOpenErrorCampCor && (
                <Popup
                    content={
                        <>
                            <strong><p>Error</p></strong>
                            <center><p>Porfavor ingrese todos los campos para guardar</p></center>
                            <button
                                className='btn-see-circunferencia'
                                onClick={closeErrorCampCor}
                                value='Add'>
                                Ok
                            </button>
                        </>
                    }
                    handleClose={togglePopupErrorCampCor}
                />
            )}
        </>
    );

};

export default BodyFields;