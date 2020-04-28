// @flow
function createError(errorName: string): Class<Error> {
  return class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = errorName;
      this.message = message;
    }
  };
}

export const NotFoundError = createError('NotFoundError');
export const ValidationError = createError('ValidationError');
export const CredentialsError = createError('CredentialsError');
export const DuplicateError = createError('DuplicateError');
export const AuthorizationError = createError('AuthorizationError');
export const ServerError = createError('ServerError');
