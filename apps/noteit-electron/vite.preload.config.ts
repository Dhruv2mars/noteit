import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: resolve(__dirname, '.vite/build'),
    lib: {
      entry: resolve(__dirname, 'src/preload.ts'),
      formats: ['cjs'],
      fileName: 'preload',
    },
    rollupOptions: {
      // Prevent bundling of external dependencies
      external: ['electron'],
    },
    // Prevent wiping other build artifacts
    emptyOutDir: false,
  },
});
