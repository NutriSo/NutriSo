import { isEmptyObject } from '@/utils';

import { DEFAULT_RESPONSE } from '../constants';

const getEconomic = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { nivelSocioeconomico } = data;
    const {
        diasDeTrabajoXsemana,
        dineroDeAlimentacionXmesHogar,
        dineroDeAlimentacionXmesIndivi,
        educacion,
        horarioEntrada,
        horarioSalida,
        ingresosMes,
        modalidad,
        ocupacion,
    } = nivelSocioeconomico;

    return {
        diasDeTrabajoXsemana,
        dineroDeAlimentacionXmesHogar,
        dineroDeAlimentacionXmesIndivi,
        educacion,
        horarioEntrada,
        horarioSalida,
        ingresosMes,
        modalidad,
        ocupacion,
    };
};

export default getEconomic;
