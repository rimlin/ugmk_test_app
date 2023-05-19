/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // Исправление HMR: https://github.com/vitejs/vite/issues/3033#issuecomment-1360691044
    {
      name: 'singleHMR',
      handleHotUpdate({ modules }) {
        modules.map(m => {
          m.importedModules = new Set();
          m.importers = new Set();
        });

        return modules;
      }
    }
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
});
