

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: process.cwd(),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'StyleBase',
      fileName: (format) => `style-base.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: 'dist',
    sourcemap: true,
    cssCodeSplit: false // one CSS file for the whole library
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/scss/_tokens.scss" ;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: []
});

