import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getClinic = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { historiaClinica } = data;
    const {
        antecedentesHeredoFamiliares,
        antecedentesPatologicos,
        medicamentos,
        suplementos,
    } = historiaClinica;

    return {
        antecedentesHeredoFamiliares,
        antecedentesPatologicos,
        medicamentos,
        suplementos,
    };
};

export default getClinic;
