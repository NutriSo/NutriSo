import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getBreastfeeding = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        artificial,
        articialContemplada,
        maternaContemplada,
        maternaExclusiva,
        mixta,
        mixtaContemplada,
        tiempolactancia,
    } = data;

    return {
        artificial,
        articialContemplada,
        maternaContemplada,
        maternaExclusiva,
        mixta,
        mixtaContemplada,
        tiempolactancia,
    };
};

export default getBreastfeeding;
