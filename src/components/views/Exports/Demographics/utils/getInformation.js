import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getInformation = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        apellidoMaterno,
        apellidoPaterno,
        celular,
        ciudadDeResidencia,
        estadoDeNacimiento,
        fechaDeNacimiento,
        genero,
        nombre,
        paisDeNacimiento,
        tiempoViviendoAhi,
    } = data;

    return {
        apellidoMaterno,
        apellidoPaterno,
        celular,
        ciudadDeResidencia,
        estadoDeNacimiento,
        fechaDeNacimiento,
        genero,
        nombre,
        paisDeNacimiento,
        tiempoViviendoAhi,
    };
};

export default getInformation;
