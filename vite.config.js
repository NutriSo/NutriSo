import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log('Comand: ', command, '\nMode: ', mode);
    if (mode === 'production') {
        return {
            base: './',
            plugins: [react()],
            resolve: {
                browser: true,
                dedupe: ['react'],
                preferBuiltins: false,
                alias: {
                    './runtimeConfig': './runtimeConfig.browser',
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
            },
            server: {
                host: true,
            },
        };
    }

    return {
        plugins: [react()],
        server: {
            host: true,
        },
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        },
    };
});
