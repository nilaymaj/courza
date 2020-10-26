import { Request, Response, NextFunction } from 'express';
import handleErr from '../middleware/errorHandler';
import mng from 'mongoose';
import { NotFoundError } from '../utils/errors';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { IEnrolment } from '../models/enrolment';
import { IResource } from '../models/resource';
import { IThread } from '../models/thread';
import { IMessage } from '../models/message';
import { IResourceCategory } from '../models/resource-category';
import { IUserTimestamp } from '../models/user-timestamp';

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

/**
 * Finds by id in given model and returns doc. If not
 * found, throws a NotFoundError
 */
export const getByIdOrThrow = async <T extends keyof AllModelDocs>(
  model: T,
  id: string
): Promise<CreatedDoc<T>> => {
  const mdl = mng.model(model);
  try {
    const doc = await mdl.findById(id);
    if (!doc) throw new Error(); // Skip to catch block
    return <CreatedDoc<T>>doc;
  } catch (err) {
    throw new NotFoundError(`${mdl.modelName} not found.`);
  }
};

type AllModelDocs = {
  Course: ICourse;
  Student: IStudent;
  Thread: IThread;
  Resource: IResource;
  ResourceCategory: IResourceCategory;
  Enrolment: IEnrolment;
  Message: IMessage;
  UserTimestamp: IUserTimestamp;
};

type CreatedDoc<T extends keyof AllModelDocs> = AllModelDocs[T];
