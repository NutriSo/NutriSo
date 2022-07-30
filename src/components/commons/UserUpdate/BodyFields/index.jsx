import React, { useState, useEffect } from 'react';

import apiURL from '@/axios/axiosConfig';
import CampoCor from '@/components/commons/Charts/CampoCor';

import Popup from './Popup';
import './BodyFields.scss';

const BodyFields = ({ id }) => {
    const [infoCampoCor, setInfoCampCor] = useState({});
    const [infoCorDates, setInfoCorDates] = useState({});
    const [grasa, setGrasa] = useState(-1);
    const [masa, setMasa] = useState(-1);
    const [agua, setAgua] = useState(-1);
    const [osea, setOsea] = useState(-1);
    const [visceral, setVisceral] = useState(-1);
    const [tMetabolica, setTMetabolica] = useState(-1);
    const [eMetabolica, setEMetabolica] = useState(-1);

    const [isOpen, setIsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    const togglePopupErrorCampCor = () => {
        setHasError(!hasError);
    };

    const togglePopupCampCor = () => {
        setIsOpen(!isOpen);
    };

    const onCloseError = () => {
        setHasError(false);
    };

    const getinfoCampCor = async () => {
        try {
            const { data, status } = await apiURL.get(
                `/extrasComposCorp/individual?usuario=${id}`
            );

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

    const updateCampCor = async () => {
        if (
            grasa !== -1 ||
            masa !== -1 ||
            agua !== -1 ||
            osea !== -1 ||
            visceral !== -1 ||
            tMetabolica !== -1 ||
            eMetabolica !== -1
        ) {
            if (!infoCampoCor?.masas) {
                try {
                    console.log('POST');
                    const body = {
                        porcentGrasa: { fecha: new Date(), valor: grasa },
                        porcentMasa: { fecha: new Date(), valor: masa },
                        porcentAgua: { fecha: new Date(), valor: agua },
                        densidadOsea: { fecha: new Date(), valor: osea },
                        grasaVisceral: {
                            fecha: new Date(),
                            valor: visceral,
                        },
                        tasaMetabolica: {
                            fecha: new Date(),
                            valor: tMetabolica,
                        },
                        edadMetabolica: {
                            fecha: new Date(),
                            valor: eMetabolica,
                        },
                    };

                    const res2 = await apiURL.post(
                        `/extrasComposCorp/individual?usuario=${id}`,
                        body
                    );
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
                        porcentGrasa: { fecha: new Date(), valor: grasa },
                        porcentMasa: { fecha: new Date(), valor: masa },
                        porcentAgua: { fecha: new Date(), valor: agua },
                        densidadOsea: { fecha: new Date(), valor: osea },
                        grasaVisceral: {
                            fecha: new Date(),
                            valor: visceral,
                        },
                        tasaMetabolica: {
                            fecha: new Date(),
                            valor: tMetabolica,
                        },
                        edadMetabolica: {
                            fecha: new Date(),
                            valor: eMetabolica,
                        },
                    };

                    const res2 = await apiURL.patch(
                        `/extrasComposCorp/individual?usuario=${id}`,
                        body
                    );
                    console.log(res2);
                } catch (error) {
                    console.groupCollapsed('Error en la funcion updateCampCor');
                    console.error(error);
                    console.groupEnd();
                }
            }
            setIsOpen(false);
        } else {
            setHasError(true);
        }
        setGrasa(-1);
        setMasa(-1);
        setAgua(-1);
        setOsea(-1);
        setVisceral(-1);
        setTMetabolica(-1);
        setEMetabolica(-1);
        setIsOpen(false);
    };

    useEffect(() => {
        getinfoCampCor();

        return () => {
            setInfoCorDates({});
        };
    }, [id]);

    return (
        <>
            <div className='basicContainer'>
                {' '}
                {/**containerCampoCor, basicInfo-Title, campCor-Container3 */}
                <div className='containData'>
                    <h2>Composición corporal</h2>
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
                {isOpen && (
                    <Popup
                        content={
                            <>
                                <strong>
                                    <p id='popTitle'>Agregando un nuevo valor</p>
                                </strong>
                                <div className='basicInfo-Container'>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Porcentaje de grasa:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setGrasa(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Porcentaje de masa:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setMasa(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Porcentaje de agua:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setAgua(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                {/**PARTICION DE CAMPOS */}
                                <div className='basicInfo-Container'>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Densidad osea:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setOsea(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Grasa visceral:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setVisceral(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Tasa metabolica:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setTMetabolica(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                {/**NUEVA PARTICION 1 SOLO */}
                                <div className='basicInfo-Container'>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-campCor'>
                                                Edad metabolica:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='input-campCor'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setEMetabolica(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <button
                                    className='btn-see-circunferencia'
                                    onClick={updateCampCor}
                                    value='Add'>
                                    Agregar
                                </button>
                            </>
                        }
                        handleClose={togglePopupCampCor}
                    />
                )}
            </div>

            {hasError && (
                <Popup
                    content={
                        <>
                            <strong>
                                <p>Error</p>
                            </strong>
                            <center>
                                <p>Porfavor ingrese todos los campos para guardar</p>
                            </center>
                            <button
                                className='btn-see-circunferencia'
                                onClick={onCloseError}
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
