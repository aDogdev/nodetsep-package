#!/usr/bin/env node

import { resolve } from "path";
import { mkdirSync, readdirSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";

export function runScaffolding(projectName: string): void {
  if (!projectName) {
    throw new Error("Project name is required.");
  }

  const projectPath: string = resolve(process.cwd(), projectName);
  const templatePath: string = resolve(
    fileURLToPath(import.meta.url),
    "../../templates",
  );

  console.log(`✅ Creating project in: ${projectPath}`);

  try {
    mkdirSync(projectPath);
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error creating directory: ${err.message}`);
    throw new Error("Directory creation failed.");
  }

  try {
    const templateFiles: string[] = readdirSync(templatePath);
    for (const file of templateFiles) {
      const sourcePath: string = resolve(templatePath, file);
      const destinationPath: string = resolve(projectPath, file);
      copyFileSync(sourcePath, destinationPath);
      console.log(`📄 Copied ${file}`);
    }
  } catch (error) {
    const e: Error = error as Error;
    console.error(`❌ Error copying template files: ${e.message}`);
    throw new Error("File copying failed.");
  }

  console.log("✅ Project created successfully!");
  console.log("Next steps:");
  console.log(`  cd ${projectName}`);
  console.log("  pnpm install");
}
const scriptPath: string | undefined = process.argv[1];
if (scriptPath && import.meta.url.endsWith(scriptPath)) {
  const projectName = process.argv[2];
  if (projectName) {
    try {
      runScaffolding(projectName);
    } catch (error) {
      console.error(`\n A critical error occurred. Scaffolding failed.`);
      process.exit(1);
    }
  } else {
    console.error("❌ Error: Please specify the project name.");
    console.log("Usage: pnpm nodetsep <project-name>");
    process.exit(1);
  }
}
