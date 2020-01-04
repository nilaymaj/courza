const Errors = require('../utils/errors');

module.exports = function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'NotFoundError':
      return res.status(404).send(new Errors.NotFoundError('Resource does not exist.'));
    case 'ValidationError':
      return res.status(400).send(new Errors.ValidationError('Validation failed. Data has incorrect format/type.'));
    case 'CredentialsError':
      return res.status(401).send(new Errors.CredentialsError('Bad credentials. The password is incorrect.'));
    case 'MongoError':
    case 'DuplicateError':
      return res.status(409).send(new Errors.DuplicateError('Resource with same key already exists.'));
    case 'AuthorizationError':
      return res.status(403).send(new Errors.AuthorizationError('Invalid or missing token found.'));
    default:
      return res.status(500).send(new Errors.ServerError('An unknown error occurred.'));
  }
};
