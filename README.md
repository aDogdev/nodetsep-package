# nodetsep

A CLI to quickly initialize Node.js projects with TypeScript, ts-node-dev, ESLint, and Prettier preconfigured.

## Usage

To create a new project, run the following command in your terminal. Replace `<project-name>` with the desired name for your new directory.

```bash
npx nodetsep <project-name>
```

This will create a new folder with a complete setup, including:
- TypeScript configuration (`tsconfig.json`)
- ESLint and Prettier for code quality and formatting
- A basic `package.json`
- A starter `src/index.ts` file

### Example

```bash
npx nodetsep my-awesome-project
```

After the command finishes, you can navigate into your new project:

```bash
cd my-awesome-project
pnpm install
```

## Local Development

If you want to contribute to the development of `nodetsep`, follow these steps to set up the project locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aDogdev/nodetsep-package.git
    cd nodetsep-package
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as the package manager.
    ```bash
    pnpm install
    ```

3.  **Run in development mode:**
    This command starts `nodemon` to watch for changes in the `src` directory and re-run the script with `ts-node`.
    ```bash
    pnpm run dev
    ```
