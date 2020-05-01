import { Request, Response, NextFunction, Handler } from 'express';
import handleErr from '../middleware/errorHandler';

type IHandler<T extends Request> = (
  arg0: T,
  arg1: Response,
  arg2: NextFunction
) => any;

/**
 * Wrapper for defining route handlers and middleware. Bubbles up any thrown error
 * to the error handler and returns corresponding error response
 *
 * @param {IHandler} handler Route handler
 * @returns Route handler with error catching
 */
export default function controller<T extends Request>(
  handler: IHandler<T>
): IHandler<T> {
  return async function (req: T, res: Response, next: NextFunction) {
    try {
      return await handler(req, res, next);
    } catch (err) {
      return handleErr(err, req, res);
    }
  };
}
