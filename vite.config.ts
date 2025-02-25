import react from '@vitejs/plugin-react';
import { URL, fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@examples': fileURLToPath(new URL('./src/examples', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@commons': fileURLToPath(new URL('./src/commons', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@apis': fileURLToPath(new URL('./src/apis', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@type': fileURLToPath(new URL('./src/type', import.meta.url)),
      '/images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '/svg': fileURLToPath(new URL('./src/assets/svg', import.meta.url)),
      '/lottie': fileURLToPath(new URL('./src/assets/lottie', import.meta.url)),
    },
  },
});
