// @flow
import bcrypt from 'bcrypt';
import { IITK_EMAIL_REGEX } from './constants';
import { ObjectId } from 'mongoose';

/**
 * Simple function to easily create descriptive errors
 *
 * @param {string} errorName Name of the error
 * @param {string} errorMessage Error message
 * @returns {Error} Error object with given name and message
 */
export function error(errorName: string, errorMessage: string): Error {
  const error = new Error();
  error.name = errorName;
  error.message = errorMessage;
  return error;
}

/**
 * Get username from IITK email id
 *
 * @param {string} email Email id to be parsed
 * @returns {string} Username of the email id
 *
 */
export function getUsernameFromEmail(email: string): Object {
  // Capture username and subdomain from given email
  const groups = email.match(IITK_EMAIL_REGEX);
  if (groups === null) throw error('EmailError', 'Email is not a valid IITK email ID.');
  const username = groups[1];
  return username;
}

/**
 * Get the value of an environment variable
 *
 * @param {string} varName Name of the environment variable
 * @param {*} [defaultValue] Value to be returned if variable not found
 * @returns {*} Value of the environment variable
 *
 */
export function getEnvVariable(varName: string, defaultValue?: string): ?string {
  const fullVarName = `process.env.COURZA_${varName.toUpperCase()}`;
  let envValue = eval(fullVarName);
  if (envValue === undefined) envValue = defaultValue;
  return envValue;
}

/**
 * Hashes the given string
 *
 * @param {string} str String to be hashed
 * @returns {Promise<string>} Promise that resolves with hashed string
 */
export async function hash(str: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(str, saltRounds);
  return hash;
}

/**
 * Compares plaintext string with a hash, and returns result
 *
 * @param {string} str Plaintext string
 * @param {string} hash Hash to compare to
 * @returns {Promise<boolean>} Promise that resolves to true, if compare succeeds
 */
export async function compareHash(str: string, hash: string) {
  const match = await bcrypt.compare(str, hash);
  return match;
}

/**
 * Converts a valid string to a Mongoose ObjectID
 *
 * @param {string} str String to be converted to ObjectID
 * @returns {ObjectId} ObjectID corresponding to the string
 */
export function toObjectID(str: string) {
  return new ObjectId(str);
}
