#!/usr/bin/env node

import { exit } from "process";
import { resolve } from "path";
import { mkdirSync, readdirSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";

console.log("🚀 Initializing nodetsep...");

const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Error: Please specify the project name.");
  console.log("Usage: pnpm nodetsep <project-name>");
  exit(1);
}

const projectPath = resolve(process.cwd(), projectName);

// fileURLToPath and '..' is necessary to get the correct path to `templates`
// when this script is compiled and run from the `dist` folder.
const templatePath = resolve(fileURLToPath(import.meta.url), "../../templates");

console.log(`✅ Creating project in: ${projectPath}`);

try {
  mkdirSync(projectPath);
} catch (error) {
  const err = error as Error;
  console.error(`❌ Error creating directory: ${err.message}`);
  console.error("The directory may already exist. Please choose another name.");
  exit(1);
}

try {
  const templateFiles = readdirSync(templatePath);
  for (const file of templateFiles) {
    const sourcePath = resolve(templatePath, file);
    const destinationPath = resolve(projectPath, file);
    copyFileSync(sourcePath, destinationPath);
    console.log(`📄 Copied ${file}`);
  }
} catch (error) {
  const err = error as Error;
  console.error(`❌ Error copying template files: ${err.message}`);
  exit(1);
}

console.log("✅ Project created successfully!");
console.log("Next steps:");
console.log(`  cd ${projectName}`);
console.log("  pnpm install");
