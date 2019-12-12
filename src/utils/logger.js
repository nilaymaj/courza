// @flow
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

export function boldenLog(logMessage: string, logArea?: string) {
  if (!logArea) return logMessage;
  return chalk.bold(`[${logArea}] `) + logMessage;
}

export function log(logMessage: string, logArea?: string) {
  let finalString = boldenLog(logMessage, logArea);
  if (has(LOG_AREAS, logArea))
    finalString = chalk[get(LOG_AREAS, logArea)](finalString);
  console.log(finalString);
}

export function err(logMessage: string, logArea?: string) {
  const finalString = boldenLog(logMessage, logArea);
  console.error(chalk[LOG_LEVELS.error](finalString));
}

export function warn(logMessage: string, logArea?: string) {
  const finalString = boldenLog(logMessage, logArea);
  console.warn(chalk[LOG_LEVELS.warn](finalString));
}

export function info(logMessage: string, logArea?: string) {
  const finalString = boldenLog(logMessage, logArea);
  console.log(finalString);
}

export default { log, err, warn, info, boldenLog };

log('Created new document in students', 'db');
log('Started server at port 8000', 'server');
log('Clicked!!!', 'web');
log('Without logArea defined!');
console.log();
err('DB connection failed.', 'db');
warn('useOldOption is deprecated', 'db');
info('Successfully connected', 'db');
