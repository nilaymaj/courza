import Errors from '../utils/errors';
import { err } from '../utils/logger';

export default function controller(handler) {
  return async function(req, res) {
    try {
      const result = await handler(req, res);
      return result;
    } catch (error) {
      switch (error.name) {
        case 'NotFoundError':
          return res.status(404).send(new Errors.NotFoundError('Resource does not exist. Incorrect ID, perhaps?'));
        case 'ValidationError':
          return res.status(400).send(new Errors.ValidationError('Validation failed. Data has incorrect format/type.'));
        case 'CredentialsError':
          return res.status(401).send(new Errors.CredentialsError('Bad credentials. The password is incorrect.'));
        case 'MongoError':
          return res.status(409).send(new Errors.DuplicateError('Resource with same key already exists.'));
        default:
          err(error);
          return res.status(500).send(new Error('An unknown error occurred.'));
      }
    }
  };
}
