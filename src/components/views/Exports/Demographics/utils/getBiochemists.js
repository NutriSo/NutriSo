import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getBiochemists = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        colesterolHDL,
        colesterolLDL,
        colesterolTotal,
        glucosaAyuno,
        glucosaDespues,
        microbiotaIntestinal,
        trigliceridos,
    } = data;

    return {
        colesterolHDL,
        colesterolLDL,
        colesterolTotal,
        glucosaAyuno,
        glucosaDespues,
        microbiotaIntestinal,
        trigliceridos,
    };
};

export default getBiochemists;
