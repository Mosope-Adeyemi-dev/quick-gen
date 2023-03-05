const { mkdirSync, rmdirSync, existsSync } = require("fs");
const { join } = require("path");
const { homedir } = require("os");
const { spawn } = require("cross-spawn");
const chalk = require("chalk");

const log = console.log;
const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");
const info = chalk.bold.blue;
const success = chalk.bold.green;
const processCompleted = chalk.bgGreen.bold.black;

const defaultSetup = async (project_name, options) => {
  const { parent_directory, framework } = options;

  const projectPath = join(homedir(), parent_directory, project_name);

  //Check if project already exists in directory
  if (existsSync(projectPath)) {
    log(warning(`⛔ Warning: Project already exists at: '${projectPath}'.`));
    process.exit(1);
  }

  switch (framework) {
    case "node/express":
      {
        log(info("💠 Info: Starting setup"));

        // create project folder
        mkdirSync(projectPath);

        //run setup commands
        const npmInit = spawn.sync("npm", ["init", "-y"], {
          cwd: projectPath,
          stdio: "pipe",
        });
        const npmInstall = spawn.sync("npm", ["i", "express"], {
          cwd: projectPath,
          stdio: "pipe",
        });

        if (npmInit.status != 0) {
          rmdirSync(projectPath, { cwd: parent_directory });

          log(error("Error: Failed to initialize project with npm"));
          process.exit(1);
        }

        // Open project in vs code.
        spawn.sync("code", ["."], { cwd: projectPath });

        // Outputs
        log(processCompleted("✅ Process completed!"));
        log(
          success(
            `Project '${project_name}' created in '${parent_directory}' with ${framework} framework`
          )
        );
      }
      break;
    case "nuxtJS":
      {
        log(info("💠 Info: Starting setup"));

        //run setup commands
        const nuxtInit = spawn.sync("npx", ["nuxi", "init", project_name], {
          cwd: join(homedir(), parent_directory),
          stdio: "inherit",
        });

        // Handle if child process fails
        if (nuxtInit.status != 0) {
          log(error("Failed to initialize nuxtJS project."));
          process.exit(1);
        }

        //Open vsCode in project
        spawn.sync("code", ["."], { cwd: projectPath });

        //Outputs
        log(processCompleted("✅ Process completed!"));
        log(
          success(
            `Project '${project_name}' created in '${parent_directory}' with ${framework} framework`
          )
        );
      }
      break;
    default:
      {
        console.error(`Invalid framework specified: ${framework}`);
      }
      break;
  }
};

module.exports = defaultSetup;
