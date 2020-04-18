const chalk = require('chalk');
const { has, get } = require('lodash');

const LOG_AREAS = {
  db: 'green',
  server: 'cyan',
  web: 'blue'
};

const LOG_LEVELS = {
  error: 'red',
  warn: 'yellow'
};

function boldenLog(logMessage, logArea) {
  if (!logArea) return logMessage;
  return chalk.bold(`[${logArea}] `) + logMessage;
}

exports.log = function log(logMessage, logArea) {
  let finalString = boldenLog(logMessage, logArea);
  if (has(LOG_AREAS, logArea)) finalString = chalk[get(LOG_AREAS, logArea)](finalString);
  console.log(finalString);
};

exports.err = function err(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.error(chalk[LOG_LEVELS.error](finalString));
};

exports.warn = function warn(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.warn(chalk[LOG_LEVELS.warn](finalString));
};

exports.info = function info(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.log(finalString);
};
