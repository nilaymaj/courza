function createError(errorName) {
  return function customError(message) {
    Error.call(this, message);
    this.name = errorName;
  };
}

const NotFoundError = createError('NotFoundError');
const ValidationError = createError('ValidationError');
const CredentialsError = createError('CredentialsError');
const DuplicateError = createError('DuplicateError');

module.exports = { NotFoundError, ValidationError, CredentialsError, DuplicateError };
