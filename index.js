const { program } = require("commander");
const pkg = require("./package.json");
const defaultSetup = require("./src/commands/setups/default.setup");
const importSetup = require("./src/commands/setups/import.setup");

program
  .name("quickgen-cli")
  .version(pkg.version, "-V, --version", "show the current version")
  .description(pkg.description);

/* =============== COMMANDS =============== */
program
  .command("setup <project_name>")
  .alias("s")
  .requiredOption(
    "-dir, --parent_directory <directory>",
    "Parent directory to create the project folder in"
  )
  .requiredOption(
    "-f, --framework <framework>",
    "Framework to use for the project",
    ["node/express", "nuxtJS"]
  )
  .description(
    "Setup a new project with a quickgen default framework template."
  )
  .action(async (project_name, options) => {
    await defaultSetup(project_name, options);
  });

program
  .command("import-setup <project_name>")
  .alias("i")
  .requiredOption(
    "-dir, --parent_directory <directory>",
    "Parent directory to create the project folder in"
  )
  .requiredOption(
    "-u, --url <import_url>",
    "Url of Github repo you want to import"
  )
  .description(
    "Setup a new project by importing an exiting boilerplate from github."
  )
  .action(async (project_name, options) => {
    await importSetup(project_name, options);
  });

program.parse(process.argv);

/**
 * ToDo
 * Allow users specify the package manager to use
 * Support for more frameworks
 * Support for default templates and custom specific templates
 * Add support for configuration files, upload a config file on web
 * Support for testing with jest
 * Support for github work flows
 */
/**
 * COMMANDS
 * 1. quickgen setup <project_name> -dir "programs" -f "node/express"
 * 2. quickgen my-setup <project_name> -t "<your custom setup name here>"
 * 3. quickgen import-setup <project_name> -u "<github url here>"
 */
