// scripts/build.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔨 Building style-base...");

// Ensure dist directory exists
const distDir = path.resolve(__dirname, "../dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Compile SCSS → CSS using PostCSS
execSync(
  `npx postcss src/index.scss -o dist/style-base.css --env production`,
  { stdio: "inherit" }
);

// Copy JS entry file (optional if you have JS utils)
if (fs.existsSync(path.resolve(__dirname, "../src/index.js"))) {
  fs.copyFileSync(
    path.resolve(__dirname, "../src/index.js"),
    path.resolve(distDir, "index.js")
  );
}

console.log("✅ Build complete!");
