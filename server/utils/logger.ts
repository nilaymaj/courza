import chalk from 'chalk';
import { has, get } from 'lodash';

const LOG_AREAS = {
  db: 'green',
  server: 'cyan',
  aws: 'yellow',
  web: 'blue',
  ws: 'red',
};

const LOG_LEVELS = {
  error: 'red',
  warn: 'yellow',
};

type LogArea = keyof typeof LOG_AREAS;

const boldenLog = (logMessage: string, logArea: LogArea): string => {
  if (!logArea) return logMessage;
  return chalk.bold(`[${logArea}] `) + logMessage;
};

export const log = (logMessage: string, logArea: LogArea): void => {
  let finalString = boldenLog(logMessage, logArea);
  if (has(LOG_AREAS, logArea))
    finalString = chalk[get(LOG_AREAS, logArea)](finalString);
  console.log(finalString);
};

export const err = (logMessage: string, logArea: LogArea): void => {
  const finalString = boldenLog(logMessage, logArea);
  console.error(chalk[LOG_LEVELS.error](finalString));
};

export const warn = (logMessage: string, logArea: LogArea): void => {
  const finalString = boldenLog(logMessage, logArea);
  console.warn(chalk[LOG_LEVELS.warn](finalString));
};

export const info = (logMessage: string, logArea: LogArea): void => {
  const finalString = boldenLog(logMessage, logArea);
  console.log(finalString);
};
