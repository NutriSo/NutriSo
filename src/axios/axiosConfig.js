import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: URL,
    timeout: 50000,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    config.headers.common['Authorization'] = `Bearer ${token}`;
    config.headers.common['Content-Type'] = 'application/json';

    return config;
});

export default instance;
