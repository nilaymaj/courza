function createError(errorName) {
  return function customError(message) {
    Error.call(this, message);
    this.name = errorName;
  };
}

const errorNames = [
  'NotFoundError',
  'ValidationError',
  'CredentialsError',
  'DuplicateError',
  'AuthorizationError',
  'ServerError'
];
const errors = {};
for (const e of errorNames) {
  errors[e] = createError(e);
}

module.exports = errors;
