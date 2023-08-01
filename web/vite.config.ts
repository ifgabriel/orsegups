import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  build: {
    sourcemap: true,
  },
  plugins: [react(), tsconfigPaths()],
  publicDir: 'public',
  server: {
    host: true,
    port: 3000,
  },
})
