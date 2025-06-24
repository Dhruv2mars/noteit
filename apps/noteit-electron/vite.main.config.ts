import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: resolve(__dirname, '.vite/build'),
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
      fileName: 'main',
    },
    rollupOptions: {
      // Prevent bundling of external dependencies
      external: ['electron', 'electron-updater', 'electron-log/main'],
    },
    // Prevent wiping other build artifacts
    emptyOutDir: false,
  },
});
