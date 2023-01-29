import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getGeneral = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        boca,
        cabello,
        mareos,
        muchaHambre,
        muchaSed,
        muchasGanasDeOrinar,
        muchoCansancio,
        nariz,
        piel,
        piesYmanos,
        unas,
        tipoDeNacimiento,
    } = data;

    return {
        boca,
        cabello,
        mareos,
        muchaHambre,
        muchaSed,
        muchasGanasDeOrinar,
        muchoCansancio,
        nariz,
        piel,
        piesYmanos,
        unas,
        tipoDeNacimiento,
    };
};

export default getGeneral;
