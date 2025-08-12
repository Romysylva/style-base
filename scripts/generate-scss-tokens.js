// scripts/generate-scss-tokens.js
const fs = require("fs");
const tokens = require("../sb.tokens");

function toCSSVars(obj, prefix = "--sb") {
  let vars = "";
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      vars += toCSSVars(obj[key], `${prefix}-${key}`);
    } else {
      vars += `  ${prefix}-${key}: ${obj[key]};\n`;
    }
  }
  return vars;
}

const scssContent = `:root {\n${toCSSVars(tokens)}}
`;

fs.writeFileSync("./src/tokens/_tokens.scss", scssContent);
console.log("✅ _tokens.scss generated from sb.tokens.js");
