import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolve } from "path";
import { mkdirSync, rmSync, existsSync, readdirSync } from "fs";

import { runScaffolding } from "../src/index.js";

describe("CLI Scaffolding Tests", () => {
  const tempTestDir: string = resolve(__dirname, "temp-test-dir");
  let projectPath: string;

  beforeEach(() => {
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const projectName = `test-project-${uniqueId}`;
    projectPath = resolve(tempTestDir, projectName);

    if (existsSync(tempTestDir)) {
      rmSync(tempTestDir, { recursive: true, force: true });
    }
    mkdirSync(tempTestDir, { recursive: true });
    process.chdir(tempTestDir);
  });

  afterEach(() => {
    if (existsSync(tempTestDir)) {
      rmSync(tempTestDir, { recursive: true, force: true });
    }
  });

  it("should create the main project folder", async () => {
    await runScaffolding(projectPath);
    expect(existsSync(projectPath)).toBe(true);
  });

  it("should create all the template files inside the project folder", async () => {
    await runScaffolding(projectPath);

    const filesInProject = readdirSync(projectPath);
    const expectedFiles = [
      ".prettierrc",
      "eslint.config.mjs",
      "package.json",
      "tsconfig.json",
      "src",
    ];

    for (const file of expectedFiles) {
      expect(filesInProject).toContain(file);
    }

    expect(filesInProject.length).toBe(expectedFiles.length);
  });

  it("should throw an error if no project name is provided", async () => {
    await expect(runScaffolding("")).rejects.toThrow(
      "Project name is required.",
    );
  });
});
