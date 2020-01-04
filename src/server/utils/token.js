const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { getEnvVariable: env } = require('../utils/base');
const { AuthorizationError } = require('../utils/errors');

let PUBLIC_KEY, PRIVATE_KEY;
try {
  PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');
  PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
} catch (err) {
  throw new Error('Error in reading key.');
}

exports.decodeToken = token => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    return decoded;
  } catch (err) {
    throw new AuthorizationError('Missing or invalid token.');
  }
};

exports.generateToken = payload => {
  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: 'RS256'
  });
  return token;
};
