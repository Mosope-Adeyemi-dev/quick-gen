# QuickGen Documentation

QuickGen is an npm package designed to simplify the process of generating boilerplate code for multiple JavaScript frameworks. Whether you are working with Node.js, Express, Nuxt.js, React, or any other JavaScript framework, QuickGen allows you to quickly set up a new project with predefined templates and configurations.

## Installation

To install QuickGen, open your terminal and run the following command:

```
npm i -g quickgen-cli
```

## Usage

QuickGen provides several commands to help you generate and customize your project's boilerplate code. Here are the available commands:

### 1. quickgen default setup

This command sets up a new project using the specified framework. It creates a directory with the provided project name and generates the boilerplate code based on the chosen framework. Supported default frameworks include Node.js, Express, Nuxt.js, and React.

Example:

```
quickgen setup myproject -dir "programs" -f "node/express"
```

<!-- ### 2. custom setup

With this command, you can create a custom setup by specifying your own setup name. QuickGen will generate the necessary files and structure based on your custom setup.

Example:

```
quickgen custom-setup myproject -t "my-custom-setup"
``` -->

### 2. import setup

This command allows you to import a pre-existing setup from a GitHub repository. Simply provide the project name and the GitHub URL of the setup you want to import.

Example:

```
quickgen import-setup myproject -u "https://github.com/username/repo"
```

### Additional Commands

To get more information about the available commands and their usage, you can use the following helpful commands:

```
quickgen -h    // Displays the help menu with command descriptions and usage examples
quickgen -V // Displays the current version of QuickGen
```

## Todo

QuickGen is continuously evolving to meet the needs of its users. Here are some features and improvements planned for future releases:

* Select desired package manager (e.g., npm, yarn) to be used for the generated project.
* Expand the list of supported frameworks to include more JavaScript frameworks.
* Introduce support for configuration files, enabling users to upload a config file to further customize their projects.
* Integrate testing capabilities using Jest.
* Incorporate GitHub workflows for seamless integration and deployment processes.

Stay tuned for updates and new releases as we continue to enhance QuickGen and make it even more powerful and convenient for your project generation needs.

Happy coding with QuickGen!
