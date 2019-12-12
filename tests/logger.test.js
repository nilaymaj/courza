import chalk from 'chalk';
import logger, { LOG_LEVELS, LOG_AREAS } from '../src/utils/logger';

/**
 * Tests for the logger utility are not really complete.
 * For instance, tests for area and level logs without area
 * specified are missing. Although, boldenLog for both cases is
 * tested and bracketing happens in boldenLog, so it shouldn't break.
 */

// Define the expected values logger is to be called with
const boldenLog = chalk.bold('[db] ') + 'Bolded';
const noAreaBoldenLog = 'No area bolded';

const dbAreaLog = chalk[LOG_AREAS.db](logger.boldenLog('DB area test', 'db'));
const otherAreaLog = logger.boldenLog('Non specified area', 'other');

const errLog = chalk[LOG_LEVELS.error](logger.boldenLog('Err log test', 'db'));
const warnLog = chalk[LOG_LEVELS.warn](logger.boldenLog('Warn log test', 'db'));
const infoLog = logger.boldenLog('Info log test', 'db');

// Test the logger
describe('Tests for the logger utility', () => {
  const log = jest.spyOn(global.console, 'log');
  const err = jest.spyOn(global.console, 'error');
  const warn = jest.spyOn(global.console, 'warn');

  test('Test logger bolded string', () => {
    console.log(logger.boldenLog('Bolded', 'db'));
    expect(log).toHaveBeenCalledWith(boldenLog);
    console.log(logger.boldenLog('No area bolded'));
    expect(log).toHaveBeenCalledWith(noAreaBoldenLog);
    jest.clearAllMocks();
  });

  test('Test logger area color', () => {
    logger.log('DB area test', 'db');
    expect(log).toHaveBeenCalledWith(dbAreaLog);
    logger.log('Non specified area', 'other');
    expect(log).toHaveBeenCalledWith(otherAreaLog);
    jest.clearAllMocks();
  });

  test('Test logger level color', () => {
    logger.err('Err log test', 'db');
    expect(err).toHaveBeenCalledWith(errLog);
    logger.warn('Warn log test', 'db');
    expect(warn).toHaveBeenCalledWith(warnLog);
    logger.info('Info log test', 'db');
    expect(log).toHaveBeenCalledWith(infoLog);
    jest.clearAllMocks();
  });
});
