const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;
const chalk = require('chalk');

const package = require(`${__dirname}/../package.json`);

const levels = {
  info: chalk.greenBright,
  warn: chalk.yellow,
  error: chalk.red
};

const logFormat = printf(({level, message, label, timestamp}) => `${timestamp} [${label}][${level}] ${JSON.stringify(message)}`);
const consoleFormat = printf(({level, message, label, timestamp}) => levels[level](`${timestamp} [${label}][${level}] ${JSON.stringify(message)}`));

module.exports = app => {
  const appName = package.name;

  // Initialize logger method
  const logger = createLogger({
    format: combine(
      label({label: appName}),
      timestamp(),
      logFormat
    )
  });

  // If we're not in production then log to the `console`:
  if (!process.env.NODE_ENV || process.env.NODE_ENV == 'dev') {
    logger.add(new transports.Console({
      format: combine(
        label({label: appName}),
        timestamp(),
        consoleFormat
      )
    }));
  } else {
    logger.add(new transports.File({filename: 'logs/error.log', level: 'error'}));
    logger.add(new transports.File({filename: 'logs/combined.log',}));
  }

  logger.info(`Starting ${appName} application`);
  app.logger = logger;
};