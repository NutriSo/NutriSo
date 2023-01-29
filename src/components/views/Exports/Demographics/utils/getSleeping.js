import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getSleeping = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { despiertaPorLaNoche, estadoDeDescanso, frecuencia, horasDeSueño } = data;

    return { despiertaPorLaNoche, estadoDeDescanso, frecuencia, horasDeSueño };
};

export default getSleeping;
