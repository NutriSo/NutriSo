import apiURL from '../../axios/axiosConfig';

import endpoints from '../endpoints';

const getGroupNames = async () => {
    const response = await apiURL.get(`${endpoints.FOOD_GROUPS}/export1`);
    return response.data;
};

const getSubGroupNames = async () => {
    const response = await apiURL.get(`${endpoints.FOOD_GROUPS}/export2`);
    return response.data;
};

const getUltraProcessedNames = async () => {
    const response = await apiURL.get(`${endpoints.FOOD_GROUPS}/export3`);
    return response.data;
};

const getAppropriateSubGroupNames = async () => {
    const response = await apiURL.get(`${endpoints.FOOD_GROUPS}/export4`);
    return response.data;
};

const getSMAEGroupNames = async () => {
    const response = await apiURL.get(`${endpoints.FOOD_GROUPS}/export5`);
    return response.data;
};

export default {
    getGroupNames,
    getSubGroupNames,
    getUltraProcessedNames,
    getAppropriateSubGroupNames,
    getSMAEGroupNames,
};
