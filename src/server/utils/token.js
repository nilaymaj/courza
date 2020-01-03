import jwt from 'jsonwebtoken';
import { getEnvVariable as env } from '../utils/base';

const PUBLIC_KEY = env('public_key');
const PRIVATE_KEY = env('private_key');
if (!PUBLIC_KEY) throw new Error('Public key for OAuth token not found.');
if (!PRIVATE_KEY) throw new Error('Private key for OAuth token not found.');

export const decodeToken = token => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    return decoded;
  } catch (err) {
    throw new Error('Invalid token.');
  }
};

export const generateToken = payload => {
  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: 'RS256'
  });
  return token;
};
