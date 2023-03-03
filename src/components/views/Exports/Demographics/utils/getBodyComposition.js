import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getBodyComposition = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        densidadOsea,
        edadMetabolica,
        grasaVisceral,
        porcentAgua,
        porcentMasa,
        tasaMetabolica,
    } = data;

    return {
        densidadOsea,
        edadMetabolica,
        grasaVisceral,
        porcentAgua,
        porcentMasa,
        tasaMetabolica,
    };
};

export default getBodyComposition;
