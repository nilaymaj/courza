// @flow
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { getEnvVariable as env } from '../utils/base';
import { AuthorizationError } from '../utils/errors';

let PUBLIC_KEY, PRIVATE_KEY;
try {
  PUBLIC_KEY = fs.readFileSync(
    path.join(__dirname, '../keys/public.key'),
    'utf8'
  );
  PRIVATE_KEY = fs.readFileSync(
    path.join(__dirname, '../keys/private.key'),
    'utf8'
  );
} catch (err) {
  throw new Error('Error in reading key.');
}

export const decodeToken = (token: string): Object => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    return decoded;
  } catch (err) {
    throw new AuthorizationError('Missing or invalid token.');
  }
};

export const generateToken = (payload: Object): string => {
  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: 'RS256',
  });
  return token;
};
