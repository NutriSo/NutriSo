import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;
const DEV_URL = import.meta.env.VITE_API_URL_DEV;

const instance = axios.create({
    baseURL: URL,
    // baseURL: DEV_URL,
    timeout: 50000,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    config.headers.common['Authorization'] = `Bearer ${token}`;
    config.headers.common['Content-Type'] = 'application/json';
    //console.log('Config: ', config);
    return config;
});

export default instance;
