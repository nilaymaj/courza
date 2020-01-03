import chalk from 'chalk';
import { has, get } from 'lodash';

export const LOG_AREAS = {
  db: 'green',
  server: 'cyan',
  web: 'blue'
};

export const LOG_LEVELS = {
  error: 'red',
  warn: 'yellow'
};

export function boldenLog(logMessage, logArea) {
  if (!logArea) return logMessage;
  return chalk.bold(`[${logArea}] `) + logMessage;
}

export function log(logMessage, logArea) {
  let finalString = boldenLog(logMessage, logArea);
  if (has(LOG_AREAS, logArea)) finalString = chalk[get(LOG_AREAS, logArea)](finalString);
  console.log(finalString);
}

export function err(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.error(chalk[LOG_LEVELS.error](finalString));
}

export function warn(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.warn(chalk[LOG_LEVELS.warn](finalString));
}

export function info(logMessage, logArea) {
  const finalString = boldenLog(logMessage, logArea);
  console.log(finalString);
}

export default { log, err, warn, info, boldenLog };
