// Run this ONCE from your backend folder:
// node fix-dotenvx.js
//
// This removes dotenvx (which prints your API key) and
// switches to standard dotenv which is silent.

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

console.log("🔧 Fixing dotenvx issue...\n");

// Step 1: Read package.json
const pkg = JSON.parse(readFileSync("package.json", "utf8"));

// Step 2: Check if dotenvx is being used in scripts
const scripts = pkg.scripts || {};
let changed = false;

for (const [key, val] of Object.entries(scripts)) {
  if (val.includes("dotenvx")) {
    // Replace dotenvx run -- with just node/nodemon
    pkg.scripts[key] = val
      .replace("dotenvx run -- nodemon", "nodemon")
      .replace("dotenvx run -- node", "node")
      .replace(/dotenvx run\s*--\s*/, "");
    console.log(`✅ Fixed script "${key}": ${pkg.scripts[key]}`);
    changed = true;
  }
}

if (changed) {
  writeFileSync("package.json", JSON.stringify(pkg, null, 2), "utf8");
  console.log("✅ package.json updated\n");
} else {
  console.log("ℹ️  No dotenvx found in scripts\n");
}

// Step 3: Install standard dotenv if not present
try {
  execSync("npm list dotenv", { stdio: "pipe" });
  console.log("✅ dotenv already installed\n");
} catch {
  console.log("📦 Installing dotenv...");
  execSync("npm install dotenv", { stdio: "inherit" });
}

// Step 4: Remove dotenvx
try {
  execSync("npm list @dotenvx/dotenvx", { stdio: "pipe" });
  console.log("🗑️  Removing dotenvx...");
  execSync("npm uninstall @dotenvx/dotenvx dotenvx", { stdio: "inherit" });
  console.log("✅ dotenvx removed\n");
} catch {
  console.log("ℹ️  dotenvx not installed as package\n");
}

console.log("✅ Done! Now:");
console.log("   1. Get a new API key from https://platform.openai.com/api-keys");
console.log("   2. Paste it in .env as OPENAI_API_KEY=your_key");
console.log("   3. Run: npm run dev");
console.log("   4. The key will NO LONGER appear in the terminal");