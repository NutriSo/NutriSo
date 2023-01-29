import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getSunExposure = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { bloqueadorSolar, cubresTuPiel, diasXsemana, minutosAlSol } = data;

    return {
        bloqueadorSolar,
        cubresTuPiel,
        diasXsemana,
        minutosAlSol,
    };
};

export default getSunExposure;
