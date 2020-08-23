import socketIo from 'socket.io';
import redisAdapter from 'socket.io-redis';

/**
 * Creates and initializes a single Socket.IO server that listens
 * for connections and forwards events from Redis pub/sub.
 */
const initiateSocketIoServer = (cluster: typeof import('cluster')) => {
  const io = socketIo({
    transports: ['websocket'],
    allowUpgrades: false,
  });
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
  io.on('connection', function (socket) {
    console.log('User connected on worker:', cluster.worker.id);
    socket.emit('data', 'connected to worker: ' + cluster.worker.id);

    socket.on('disconnect', (err) => {
      console.log(`DISCONN: ${socket.id} | ${err}`);
    });
  });
  io.listen(8001);
};

export default initiateSocketIoServer;
