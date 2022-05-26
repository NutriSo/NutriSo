import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    };
});
