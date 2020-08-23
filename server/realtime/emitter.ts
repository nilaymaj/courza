import socketIoEmitter from 'socket.io-emitter';

let _socketEmitter: socketIoEmitter.SocketIOEmitter;

const _getIo = () => {
  const io = socketIoEmitter({ host: 'localhost', port: 6379 });
  _socketEmitter = io;
  return _socketEmitter;
};

/**
 * Send an event to all users or users in a particular channel
 */
export const emit = (data: any, channel?: string) => {
  const io = _getIo();
  io.emit(channel, data);
};
