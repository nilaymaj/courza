let _manager;

const authenticate = (socket, next) => {
  const req = socket.request.headers;
  console.log(req);
  next();
};

export const initSocketManager = (io) => {
  _manager = io;
  _manager.use(authenticate);
  _manager.on('connection', (socket) => {
    socket.emit('message', { foo: 'bar' });
    socket.on('message', (content) => {
      broadcastToAll(content);
    });
  });
};

export const broadcastToAll = (content) => {
  content = parseInt(content, 10) + 1;
  _manager.emit('message', content.toString());
};
