import apiURL from '@/axios/axiosConfig';

export const getSku = async () => {
    try {
        const { data } = await apiURL.get('alimentos/obtenerUltimo/Valor');
        return Number(data.sku + 1);
    } catch (error) {
        console.groupCollapsed('[GET SKU]');
        console.error(error);
        console.groupEnd();
        return null;
    }
};
