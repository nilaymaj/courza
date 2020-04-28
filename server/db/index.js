import { connect } from 'mongoose';
import { DEV_DB_URL } from '../utils/constants';
import { getEnvVariable as env } from '../utils/base';
import { DbSchema, DbTypes } from './schema';

/**
 * Creates a new connection to a mongo database
 *
 * @returns {object} Mongoose connection object
 */
export const connectToDb = async () => {
  const envMode = process.env.NODE_ENV;
  const dbURL = envMode === 'PRODUCTION' ? env('prod_url') : DEV_DB_URL;
  const dbConnectionOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  const db = await connect(dbURL, dbConnectionOpts);
  return db;
};

export const Schema = DbSchema;
export const Types = DbTypes;
