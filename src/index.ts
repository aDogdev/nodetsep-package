#!/usr/bin/env node

import { resolve } from "path";
import { mkdir, cp } from "fs/promises";
import { fileURLToPath } from "url";

export async function runScaffolding(projectName: string): Promise<void> {
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
    await mkdir(projectPath);
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error creating directory: ${err.message}`);
    throw new Error("Directory creation failed.");
  }

  try {
    await cp(templatePath, projectPath, { recursive: true });
    console.log("✅ Copied template files successfully!");
  } catch (error) {
    const e: Error = error as Error;
    console.error(`❌ Error copying template files: ${e.message}`);
    throw new Error("File copying failed.");
  }

  console.log("✅ Project created successfully!");
  console.log("Next steps:");
  console.log(`  cd ${projectName}`);
  console.log("  pnpm install");
  console.log("  pnpm run dev");
}
const scriptPath: string | undefined = process.argv[1];
if (scriptPath && import.meta.url.endsWith(scriptPath)) {
  const projectName = process.argv[2];
  if (projectName) {
    try {
      await runScaffolding(projectName);
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
