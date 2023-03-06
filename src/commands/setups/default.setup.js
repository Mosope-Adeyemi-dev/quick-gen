const { mkdirSync, rmdirSync, existsSync } = require("fs");
const { join } = require("path");
const { homedir } = require("os");
const { spawn } = require("cross-spawn");
const logger = require("../../utils/log");

const defaultSetup = async (project_name, options) => {
  const { parent_directory, framework } = options;

  const projectPath = join(homedir(), parent_directory, project_name);

  //Check if project already exists in directory
  if (existsSync(projectPath)) {
    logger("warn", `⛔ Warning: Project already exists at: '${projectPath}'.`);
    process.exit(1);
  }

  switch (framework) {
    case "node/express":
      {
        logger("info", "💠 Info: Starting setup");

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
          logger("error", "Error: Failed to initialize project with npm");
          process.exit(1);
        }

        // Open project in vs code.
        spawn.sync("code", ["."], { cwd: projectPath });

        // Outputs
        logger("processCompleted", "✅ Process completed!");
        logger(
          "success",
          `Project '${project_name}' created in '${parent_directory}' with ${framework} framework`
        );
      }
      break;
    case "nuxtJS":
      {
        logger("info", "💠 Info: Starting setup");

        //run setup commands
        const nuxtInit = spawn.sync("npx", ["nuxi", "init", project_name], {
          cwd: join(homedir(), parent_directory),
          stdio: "inherit",
        });

        // Handle if child process fails
        if (nuxtInit.status != 0) {
          logger("error", "Failed to initialize nuxtJS project.");
          process.exit(1);
        }

        //Open vsCode in project
        spawn.sync("code", ["."], { cwd: projectPath });

        //Outputs
        logger("complete", "✅ Process completed!");
        logger(
          "success",
          `Project '${project_name}' created in '${parent_directory}' with ${framework} framework`
        );
      }
      break;
    default:
      {
        logger("error", `Invalid framework specified: ${framework}`);
      }
      break;
  }
};

module.exports = defaultSetup;
