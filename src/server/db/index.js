import { createConnection } from 'mongoose';
import { DEV_DB_URL } from '../../utils/constants';
import { getEnvVariable as env } from '../utils';
import { DbSchema, DbTypes } from './schema';

/**
 * Creates a new connection to a mongo database
 *
 * @returns {object} Mongoose connection object
 */
export const connectToDb = async function() {
  const dbURL = env('env') === 'production' ? env('prod_url') : DEV_DB_URL;
  const dbConnectionOpts = { useNewUrlParser: true };
  const db = await createConnection(dbURL, dbConnectionOpts);
  return db;
};

export const Schema = DbSchema;
export const Types = DbTypes;
