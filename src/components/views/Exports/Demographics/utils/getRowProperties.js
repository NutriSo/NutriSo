import { isInvalidElem } from '@/utils';

import getBiochemists from './getBiochemists';
import getBodyComposition from './getBodyComposition';
import getBreastfeeding from './getBreastfeeding';
import getClinic from './getClinic';
import getClinicalIndicators from './getClinicalIndicators';
import getEconomic from './getEconomic';
import getFeeding from './getFeeding';
import getGeneral from './getGeneral';
import getInformation from './getInformation';
import getIntestinal from './getIntestinal';
import getMeasures from './getMeasures';
import getSleeping from './getSleeping';
import getSunExposure from './getSunExposure';

const getRowProperties = (data) => {
    if (isInvalidElem(data)) {
        return DEFAULT_RESPONSE;
    }

    const obj = {
        biochemists: getBiochemists(data.bioquimicos),
        bodyComposition: getBodyComposition(data.corporal),
        breastfeeding: getBreastfeeding(data.lactancia),
        clinic: getClinic(data.clinico),
        clinicalIndicators: getClinicalIndicators(data.indicadorClinico),
        economic: getEconomic(data.economico),
        feeding: getFeeding(data.alimentacion),
        general: getGeneral(data.general),
        information: getInformation(data.informacion),
        intestinal: getIntestinal(data.gastroIntestinal),
        measures: getMeasures(data.medida),
        sleeping: getSleeping(data.sueño),
        sunExposure: getSunExposure(data.exposicion),
    };

    return obj;
};

export default getRowProperties;
