import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs } from 'antd';
import Popup from './Popup';

import Circunferencia from '../../Charts/Circunferencia';

import './Circumference.scss';

const Circumference = ({ id }) => {
    const [infoCircunferencia, setInfoCircunferencia] = useState({});
    const [circunferenciaDates, setCircunferenciaDates] = useState({
        cintura: '',
        cadera: '',
    });
    const [cinturaEntry, setCinturaEn] = useState(-1);
    const [caderaEntry, setCaderaEn] = useState(-1);

    useEffect(() => {
        getCircunferencias();

        return () => {
            setCircunferenciaDates({});
        };
    }, [id]);

    //popup Window Circunferencia
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    //popup Window Error Circunferencia
    const [isOpenError, setIsOpenError] = useState(false);
    const togglePopupError = () => {
        setIsOpenError(!isOpenError);
    };

    const getCircunferencias = async () => {
        try {
            const { data, status } = await apiURL.get(
                `/extrasCircunferencia/individual?usuario=${id}`
            );

            if (status === 200 || data.length > 0) {
                const cadera = data[0].cadera.map((elem) => elem.valor);
                const cintura = data[0].cintura.map((elem) => elem.valor);
                const datesCadera = data[0].cadera.map((elem) => elem.fecha);
                const datesCintura = data[0].cintura.map((elem) => elem.fecha);

                setCircunferenciaDates({
                    cadera: datesCadera,
                    cintura: datesCintura,
                });

                setInfoCircunferencia({
                    cadera: cadera,
                    cintura: cintura,
                });
            }
        } catch (error) {
            console.groupCollapsed('Error en la funcion fetchInfo');
            console.error(error);
            console.groupEnd();
        }
    };

    const updateCinturas = async () => {
        if (cinturaEntry !== -1 && caderaEntry !== -1) {
            if (!infoCircunferencia?.cadera || !infoCircunferencia?.cintura) {
                try {
                    const body = {
                        cintura: { fecha: new Date(), valor: cinturaEntry },
                        cadera: { fecha: new Date(), valor: caderaEntry },
                    };

                    const cin = await apiURL.post(
                        `/extrasCircunferencia/individual?usuario=${id}`,
                        body
                    );
                    console.log(cin);
                } catch (error) {
                    console.groupCollapsed('Error en la funcion updateCintura');
                    console.error(error);
                    console.groupEnd();
                }
            } else {
                try {
                    const body = {
                        cintura: { fecha: new Date(), valor: cinturaEntry },
                        cadera: { fecha: new Date(), valor: caderaEntry },
                    };

                    const cin = await apiURL.patch(
                        `/extrasCircunferencia/individual?usuario=${id}`,
                        body
                    );
                    console.log(cin);
                } catch (error) {
                    console.groupCollapsed('Error en la funcion updateCintura');
                    console.error(error);
                    console.groupEnd();
                }
            }

            setIsOpen(false);
        } else {
            setIsOpenError(true);
        }
        setCinturaEn(-1);
        setCaderaEn(-1);
        setIsOpen(false);
    };

    const closeError = () => {
        setIsOpenError(false);
    };

    return (
        <>
            <div className='basicContainer'>
                {' '}
                {/**containerCircunferencia, basicInfo-Title */}
                <div className='containData'>
                    <h2>Circunferencia</h2>
                    <div className='basicInfo-Container-Slide'>
                        {' '}
                        {/** No se le aplica el Slide porque es un canvas puedo quitar el Slide de aqui */}
                        {infoCircunferencia?.cintura?.length > 0 && (
                            <Circunferencia
                                data={infoCircunferencia}
                                dates={circunferenciaDates.cadera}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className='basicContainer'>
                <input
                    type='button'
                    value='Agregar'
                    onClick={togglePopup}
                    className='btn-see-circunferencia'
                />
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
                                            <label className='label-circunferencia'>
                                                Cintura:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='lb-name'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setCinturaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                    <div className='entradas'>
                                        <div className='labels'>
                                            <label className='label-circunferencia'>
                                                Cadera:
                                            </label>
                                        </div>
                                        <div className='inputs'>
                                            <input
                                                className='lb-name'
                                                type='number'
                                                name='numero'
                                                min={0}
                                                placeholder={''}
                                                onChange={(event) =>
                                                    setCaderaEn(event.target.value)
                                                }></input>
                                        </div>
                                    </div>
                                </div>

                                <br />
                                <button
                                    className='btn-see-circunferencia'
                                    onClick={updateCinturas}
                                    value='Add'>
                                    Agregar
                                </button>
                            </>
                        }
                        handleClose={togglePopup}
                    />
                )}
            </div>

            {/*PopUpError----------------------------------------------------------------*/}
            {isOpenError && (
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
                                onClick={closeError}
                                value='Add'>
                                Ok
                            </button>
                        </>
                    }
                    handleClose={togglePopupError}
                />
            )}
        </>
    );
};

export default Circumference;
