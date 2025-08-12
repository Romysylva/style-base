// import { defineConfig } from "vite";
// import path from "path";

// export default defineConfig({
//   root: ".",
//   build: {
//     outDir: "dist",
//     lib: {
//       entry: path.resolve(__dirname, "src/scss/sb.scss"),
//       name: "style-base",
//       fileName: (format) => `style-base.${format}.js`
//     },
//     rollupOptions: {
//       output: {
//         assetFileNames: "style-base.css"
//       }
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "src/sb.tokens";`
//       }
//     }
//   }
// });

import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue'; // if you're using Vue; remove if not needed
import dts from 'vite-plugin-dts'; // For generating TypeScript declaration files, optional

export default defineConfig({
  root: process.cwd(),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), // your main entry file
      name: 'StyleBase',
      fileName: (format) => `style-base.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: [], // add external dependencies here (e.g., 'react' if used)
      output: {
        globals: {
          // global names for external deps
        }
      }
    },
    outDir: 'dist',
    sourcemap: true,
    cssCodeSplit: true // separate CSS files for each component
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/sb.tokens.scss";` // auto-import tokens everywhere
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    // If using Vue or React, include relevant plugins here.
    // dts(), // uncomment if you want to generate TypeScript declarations
  ]
});
