import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getClinicalIndicators = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { acantosisNigricans, presionArterialDiastolica, presionArterialSistolica } = data;

    return { acantosisNigricans, presionArterialDiastolica, presionArterialSistolica };
};

export default getClinicalIndicators;
