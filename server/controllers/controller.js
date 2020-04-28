import Errors from '../utils/errors';
import { err } from '../utils/logger';

export default function controller(handler) {
  return async function (req, res, next) {
    try {
      return await handler(req, res, next);
    } catch (err) {
      console.log(err instanceof Error);
      next(err);
    }
  };
}
