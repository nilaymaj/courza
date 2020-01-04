const { connect } = require('mongoose');
const { DEV_DB_URL } = require('../utils/constants');
const { getEnvVariable: env } = require('../utils/base');
const { DbSchema, DbTypes } = require('./schema');

/**
 * Creates a new connection to a mongo database
 *
 * @returns {object} Mongoose connection object
 */
exports.connectToDb = async function() {
  const envMode = process.env.NODE_ENV;
  const dbURL = envMode === 'PRODUCTION' ? env('prod_url') : DEV_DB_URL;
  const dbConnectionOpts = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
  const db = await connect(dbURL, dbConnectionOpts);
  return db;
};

exports.Schema = DbSchema;
exports.Types = DbTypes;
