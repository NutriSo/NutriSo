import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getFeeding = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        comidaFavorita,
        comidaNoFavorita,
        alergiasAlimentarias,
        estatusDieta,
        lugarDeCompras,
        quienCocina,
    } = data;

    return {
        comidaFavorita,
        comidaNoFavorita,
        alergiasAlimentarias,
        estatusDieta,
        lugarDeCompras,
        quienCocina,
    };
};

export default getFeeding;
