const chalk = require("chalk");
const log = console.log;
const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");
const info = chalk.bold.blue;
const success = chalk.bold.green;
const processCompleted = chalk.bgGreen.bold.black;

const logger = (type, message) => {
  switch (type) {
    case "error":
      return log(error(message));

      break;
    case "warn":
      return log(warning(message));

      break;
    case "info":
      return log(info(message));

      break;
    case "success":
      return log(success(message));

      break;
    case "complete":
      return log(processCompleted(message));

      break;
    default:
      break;
  }
};

module.exports = logger;
