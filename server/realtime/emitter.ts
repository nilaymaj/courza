import socketIoEmitter from 'socket.io-emitter';
import { EventType, EventPayload } from './events';
import mng from 'mongoose';

let _socketEmitter: socketIoEmitter.SocketIOEmitter;

const _getIo = () => {
  if (_socketEmitter) return _socketEmitter;
  _socketEmitter = socketIoEmitter({ host: 'localhost', port: 6379 });
  return _socketEmitter;
};

/**
 * Send an event to all users or users in a particular channel
 */
export const emitToCourse = <T extends EventType>(
  courseId: string | mng.Types.ObjectId,
  type: T,
  payload: EventPayload<T>
) => {
  const io = _getIo();
  io.emit(courseId, { type, payload });
};
