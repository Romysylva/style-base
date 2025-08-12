
// scripts/publish.js
const { execSync } = require("child_process");

console.log("🚀 Publishing style-base...");

// Build the package first
execSync("node scripts/build.js", { stdio: "inherit" });

// Publish to npm under your scope
execSync("npm publish --access public", { stdio: "inherit" });

console.log("🎉 Publish complete!");
