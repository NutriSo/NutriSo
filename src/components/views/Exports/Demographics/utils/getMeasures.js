import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getMeasures = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { actividadFisica, peso, registroPeso, altura } = data;

    return { actividadFisica, peso, registroPeso, altura };
};

export default getMeasures;
