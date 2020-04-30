import { Request, Response, NextFunction } from 'express';

type IHandler<T extends Request> = (
  arg0: T,
  arg1: Response,
  arg2: NextFunction
) => any;

export default function controller<T extends Request>(handler: IHandler<T>) {
  return async function (req: T, res: Response, next: NextFunction) {
    try {
      return await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
