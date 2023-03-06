const { spawn } = require("cross-spawn");
const { join } = require("path");
const { homedir } = require("os");
const logger = require("../../utils/log");
const {
  mkdirSync,
  rmdirSync,
  existsSync,
  readdirSync,
  renameSync,
} = require("fs");

const importSetup = async (project_name, options) => {
  const { parent_directory, url } = options;

  const projectPath = join(homedir(), parent_directory, project_name);

  if (existsSync(projectPath)) {
    logger("warn", `⛔ Warning: Project already exists at: '${projectPath}'.`);
    process.exit(1);
  }

  logger("info", "💠 Info: Starting project setup");

  mkdirSync(projectPath);

  logger("info", "💠 Info: Importing repo from github");

  const importRepo = spawn.sync("git", ["clone", url], {
    cwd: join(homedir(), parent_directory),
    stdio: "inherit",
  });

  // Get Repo name
  const match = url.match(/.*\/(.*)$/);
  const repoName = match[1].split(".")[0];

  const tempPath = join(homedir(), parent_directory, repoName);

  // Copy content of temp folder to project directory
  const files = readdirSync(tempPath);
  files.forEach((file) => {
    renameSync(join(tempPath, file), join(projectPath, file));
  });

  // Delete temporary cloned folder
  rmdirSync(tempPath);

  if (importRepo.status != 0) {
    rmdirSync(projectPath, { cwd: parent_directory });
    logger("error", "Unable to import boilerplate repo, try again.");
    process.exit(1);
  }

  // Open project in vs code.
  spawn.sync("code", ["."], { cwd: projectPath });

  // Outputs
  logger("complete", "✅ Process completed!");
  logger(
    "success",
    `Project '${project_name}' created in '${parent_directory}'.`
  );
};

module.exports = importSetup;
