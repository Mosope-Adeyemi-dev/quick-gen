const { mkdirSync, rmdirSync, existsSync } = require('fs');
const { join } = require('path');
const { homedir } = require('os')
const { program } = require('commander');
const { execSync, spawnSync } = require('child_process');
const { spawn } = require('cross-spawn')

// Define the command line arguments for the program
program
    .version('0.0.1')
    .requiredOption('-pwd, --parent_directory <directory>', 'Parent directory to create the project folder in')
    .requiredOption('-fwk, --framework <framework>', 'Framework to use for the project')
    .requiredOption('-project, --project_name <name>', 'Name of the project folder to create')
    .option('-open, --open_code <openCode>', 'Whether or not to open VScode after successful project setup')
    .parse(process.argv);

//Parse options
const options = program.opts()

// Create the project directory
const { parent_directory, framework, project_name, open_code } = options;

if (!parent_directory || !framework || !project_name || !open_code) {
    console.error('Error: Missing required argument');
    program.help();
}

const projectPath = join(homedir() ,parent_directory, project_name);

//Check if project already exists in directory
if (existsSync(projectPath)) {
    console.error(`⛔ Error: Project already exists at: '${projectPath}'.`);
    process.exit(1);
}

if (Boolean(open_code) != true && Boolean(open_code) != false) console.error(`Invalid value for openCode: ${open_code}`)

if (framework === 'node/express') {
    // create project folder
    mkdirSync(projectPath);

    //run setup commands
    const npmInit = spawn.sync('npm', ['init', '-y'], { cwd: projectPath, stdio: 'inherit' });
    const npmInstall = spawn.sync('npm', ['i', 'express'], { cwd: projectPath, stdio: 'inherit' });
    const gitInit = spawn.sync('git', ['init'], { cwd: projectPath, stdio: 'inherit' })

    if (npmInit.status === 0) {
        //Open vsCode in project
        if (Boolean(open_code) == true) spawn.sync('code', ['.'], { cwd: projectPath })

        //Outputs
        console.log('\n\nProcess completed! 🎉');
        console.log('\n\nNew node/express project initialized successfully');
        console.info(`\n\nProject '${project_name}' created in '${parent_directory}' with ${framework} framework`);
        console.log('\n\nBuilt by mosope.dev');

    } else {
        //delete created folder if it falls
        rmdirSync(projectPath, { cwd: projectPath })
        console.error('\n\nFailed to initialize project with npm');
    }
} else if (framework === 'nuxtJS') {
    //run setup commands
    const nuxtInit = spawn.sync('npx', ['nuxi', 'init', project_name], { cwd: join(homedir(), parent_directory), stdio: 'inherit' });

    if (nuxtInit.status === 0) {
        //Open vsCode in project
        if (Boolean(open_code) == true) spawn.sync('code', ['.'], { cwd: projectPath })

        //Outputs
        console.log('\n\nProcess completed! 🎉');
        console.log('\nNew NuxtJS project initialized successfully');
        console.info(`Project '${project_name}' created in '${parent_directory}' with ${framework} framework`);
        console.log('Built by mosope.dev');

    } else {
        console.error('\nFailed to initialize nuxtJS project.');
    }
} else {
    console.error(`Invalid framework specified: ${framework}`);
}

/**
 * ToDo
 * Allow users specify the package manager to use
 * Support for more frameworks
 * Support for default templates and custom specific templates
 * Add support for configuration files: Instead of specifying all the options on the command line, you can allow users to specify a configuration file that contains the options.
 * Support for testing with jest
 * Support for github work flows
 */