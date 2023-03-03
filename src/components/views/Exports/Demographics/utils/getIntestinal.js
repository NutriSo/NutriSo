import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getIntestinal = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { diarrea, estreñimiento, inflamacionAbdominal, reflujo } = data;

    return { diarrea, estreñimiento, inflamacionAbdominal, reflujo };
};

export default getIntestinal;
