import { isEmptyArray, isEmptyObject } from '@/utils';

import getRowProperties from './getRowProperties';

const MINIMUM_EXCEL_ROWS = 1;
const DEFAULT_RESPONSE = {};

const getLastElementFromArray = (data = []) => {
    return data[data.length - 1];
};

const getHistoryLength = (data = []) => {
    return data?.length > 0 ? data?.length : MINIMUM_EXCEL_ROWS;
};

const getArrayToString = (data = []) => {
    if (data.length === 0) {
        return '';
    }

    const [firstElement] = data;

    return data.length > 1 ? data.join(', ') : firstElement;
};

const getMeasureData = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const { actividadFisica, altura, peso } = data;
    const { intensidad, minXdia, tipoDeActividad, vecesXsemana } =
        actividadFisica;

    const lastWeight = getLastElementFromArray(peso);

    return {
        intensidad,
        minXdia,
        tipoDeActividad,
        vecesXsemana,
        altura,
        peso: lastWeight,
    };
};

const getSleepingData = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }
    const { despiertaPorLaNoche, estadoDeDescanso, frecuencia, horasDeSueño } =
        data;

    const lastDespiertaPorLaNoche =
        getLastElementFromArray(despiertaPorLaNoche);
    const lastEstadoDeDescanso = getLastElementFromArray(estadoDeDescanso);
    const lastFrecuencia = getLastElementFromArray(frecuencia);
    const lastHorasDeSueño = getLastElementFromArray(horasDeSueño);

    return {
        despiertaPorLaNoche: lastDespiertaPorLaNoche?.valor,
        estadoDeDescanso: lastEstadoDeDescanso?.valor,
        frecuencia: lastFrecuencia?.valor,
        horasDeSueño: lastHorasDeSueño?.valor,
    };
};

const getUserInformation = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        apellidoMaterno,
        apellidoPaterno,
        celular,
        ciudadDeResidencia,
        estadoDeNacimiento,
        fechaDeNacimiento,
        genero,
        nombre,
        paisDeNacimiento,
        tiempoViviendoAhi,
        usuario,
    } = data;

    return {
        usuario,
        apellidoMaterno,
        apellidoPaterno,
        celular,
        ciudadDeResidencia,
        estadoDeNacimiento,
        fechaDeNacimiento: new Date(fechaDeNacimiento).toLocaleDateString(),
        genero,
        nombre,
        paisDeNacimiento,
        tiempoViviendoAhi,
    };
};

const getEconomicData = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

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
    } = data;

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

const getFeedingData = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        alergiasAlimentarias,
        comidaFavorita,
        comidaNoFavorita,
        estatusDieta,
        lugarDeCompras,
        quienCocina,
    } = data;

    const estatusDietaValue =
        estatusDieta.sigueDieta === 'Si' ? estatusDieta?.tipoDieta ?? '' : 'No';

    return {
        alergiasAlimentarias: getArrayToString(alergiasAlimentarias),
        comidaFavorita: getArrayToString(comidaFavorita),
        comidaNoFavorita: getArrayToString(comidaNoFavorita),
        sigueDieta: estatusDieta.sigueDieta === 'Si' ? 'Si' : 'No',
        conNutriologo: estatusDietaValue,
        lugarDeCompras: getArrayToString(lugarDeCompras),
        quienCocina: getArrayToString(quienCocina),
    };
};

const getNumberOfRows = (data = []) => {
    const normalizedRows = data.map((user) => {
        const { clinic } = user;
        const { antecedentesHeredoFamiliares } = clinic;

        const total = getHistoryLength(antecedentesHeredoFamiliares);

        return {
            ...user,
            rows: total,
        };
    });

    return normalizedRows;
};

const getSuplemtData = (data = []) => {
    const suplements = data.map((suplement) => suplement.suplemento);
    const filtered = suplements.filter((suplement) => suplement !== 'N/A');

    if (filtered.length === 0) {
        return 'No';
    }

    return getArrayToString(suplements);
};

const getClinicData = (data) => {
    if (isEmptyObject(data)) {
        return DEFAULT_RESPONSE;
    }

    const {
        antecedentesHeredoFamiliares,
        antecedentesPatologicos,
        medicamentos,
        suplementos,
    } = data;

    return {
        antecedentesHeredoFamiliares,
        antecedentesPatologicos: getArrayToString(antecedentesPatologicos),
        medicamentos: getArrayToString(medicamentos),
        suplementos: getSuplemtData(suplementos),
    };
};

const duplicateRowDataByTotal = (data = []) => {
    const result = [];

    data.forEach((userData) => {
        const repeatNumber = userData.rows;

        const measures = getMeasureData(userData.measures);
        const sleeping = getSleepingData(userData.sleeping);
        const information = getUserInformation(userData.information);
        const economic = getEconomicData(userData.economic);
        const feeding = getFeedingData(userData.feeding);
        const clinic = getClinicData(userData.clinic);

        const payload = {
            ...measures,
            ...sleeping,
            ...information,
            ...economic,
            ...feeding,
            suplemento: clinic.suplementos,
            medicamentos: clinic.medicamentos,
            antecedentesPatologicos: clinic.antecedentesPatologicos,
        };

        for (let i = 0; i < repeatNumber; i++) {
            const copy = { ...payload };

            const element =
                clinic?.antecedentesHeredoFamiliares?.[i] ?? undefined;

            if (element === undefined) {
                Object.assign(copy, { familiar: 'No', padeceEnfermedad: '' });
                result.push(copy);
                return;
            }

            const familiar = element?.familiar ?? 'No';
            const enfermedad = element?.enfermedad ?? '';

            Object.assign(copy, { familiar, padeceEnfermedad: enfermedad });
            result.push(copy);
        }
    });

    return result;
};

const caseNormalizeRows = (data, userIds) => {
    if (isEmptyArray(data)) {
        return [];
    }

    const rowsData = data.map((row) => getRowProperties(row));
    const preparedData = getNumberOfRows(rowsData);
    const duplicatedRows = duplicateRowDataByTotal(preparedData);

    const finalData = duplicatedRows.map((row) => {
        const { usuario } = row;
        const userID = userIds.findIndex((id) => id === usuario);

        return {
            ...row,
            idPaciente: userID + 1,
        };
    });

    return finalData;
};

export default caseNormalizeRows;
