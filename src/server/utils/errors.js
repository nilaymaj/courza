function createError(errorName) {
  return class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = errorName;
    }
  };
}

const NotFoundError = createError('NotFoundError');
const ValidationError = createError('ValidationError');
const CredentialsError = createError('CredentialsError');
const DuplicateError = createError('DuplicateError');

export default { NotFoundError, ValidationError, CredentialsError, DuplicateError };
export { NotFoundError, ValidationError, CredentialsError, DuplicateError };
