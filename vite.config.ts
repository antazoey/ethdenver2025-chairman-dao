import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import environment from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'web',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
});
