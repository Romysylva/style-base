// sb.config.js
// const tokens = require("./sb.tokens");

// module.exports = {
//   tokens,
//   paths: {
//     src: "./src",
//     dist: "./dist"
//   },
//   css: {
//     preprocessor: "scss",
//     variables: tokens.colors,
//     radius: tokens.radius,
//     spacing: tokens.spacing,
//     typography: tokens.typography
//   },
//   js: {
//     entry: "./src/index.js",
//     output: {
//       filename: "style-base.js",
//       path: "./dist"
//     }
//   }
// };


// sb.config.js
// Style-Base configuration file

const tokens = require("./sb.tokens");

module.exports = {
  tokens,

  // Default theme mode: 'light' | 'dark' | 'custom'
  mode: "light",

  // Available themes
  themes: {
    light: tokens.colors.light,
    dark: tokens.colors.dark,
    custom: tokens.colors.custom
  },

  // Design tokens
  radii: tokens.radii,
  spacing: tokens.spacing,
  shadows: tokens.shadows,
  typography: tokens.typography,
  breakpoints: tokens.breakpoints,

  // Paths
  paths: {
    src: "./src",
    dist: "./dist",
    scss: "./src/scss",
    js: "./src/js",
    components: "./src/components",
    themes: "./src/themes"
  },

  // Build settings
  build: {
    cssOutput: "style-base.css",
    cssMinOutput: "style-base.min.css",
    jsOutput: "style-base.js",
    jsMinOutput: "style-base.min.js"
  },

  // Plugins (extend later if needed)
  plugins: []
};
