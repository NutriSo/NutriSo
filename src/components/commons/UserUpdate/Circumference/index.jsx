import React, { useState, useEffect } from 'react';
import apiURL from '../../../../axios/axiosConfig';
import { Tabs } from 'antd';
import Popup from './Popup';

import Circunferencia from '../../Charts/Circunferencia';

import './Circumference.scss';

const Circumference = ({id}) =>{
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
            const { data, status } = await apiURL.get(`/extrasCircunferencia/individual?usuario=${id}`);

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

                    const cin = await apiURL.post(`/extrasCircunferencia/individual?usuario=${id}`, body);
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

                    const cin = await apiURL.patch(`/extrasCircunferencia/individual?usuario=${id}`, body);
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
        <div className='containerCircunferencia'>
                    <div className='basicInfo-Title'>Circunferencia</div>
                    <div className='circunferencia-Container3'>
                        {infoCircunferencia?.cintura?.length > 0 && (
                            <Circunferencia data={infoCircunferencia} dates={circunferenciaDates.cadera} />
                        )}
                    </div>
                    {/*Fin de grafica----------------------------------------------------------------*/}
                    <div>
                        <div className='circunferencia-Container'>
                            <div className='campoCor-Container2'>
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
                                                <b>Agregando un nuevo valor</b>
                                                <div>
                                                    <div className='circunferencia-Container'>
                                                        <div className='circunferencia-Container4'>
                                                            <label className='label-circunferencia'>Cintura:</label>
                                                            <input
                                                                className='input-circunferencia'
                                                                type='number'
                                                                name='numero'
                                                                min={0}
                                                                placeholder={''}
                                                                onChange={(event) =>
                                                                    setCinturaEn(event.target.value)
                                                                }></input>
                                                        </div>
                                                        <div className='circunferencia-Container4'>
                                                            <label className='label-circunferencia'>Cadera:</label>
                                                            <input
                                                                className='input-circunferencia'
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
                        </div>
                    </div>

                    {/*PopUpError----------------------------------------------------------------*/}
                    <div>
                        <div className='campCor-Container'>
                            <div className='campoCor-Container2'>
                                <p></p>
                                {isOpenError && (
                                    <Popup
                                        content={
                                            <>
                                                <b>Error</b>
                                                <div>
                                                    <div className='campoCor-Container'>
                                                        <div className='campCor-Container4'>
                                                            <label className='label-campCor'>
                                                                Porfavor ingrese todos los campos para guardar
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className='btn-see-camCor' onClick={closeError} value='Add'>
                                                    Okay
                                                </button>
                                            </>
                                        }
                                        handleClose={togglePopupError}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
    );

};

export default Circumference;