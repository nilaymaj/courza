import socketIo from 'socket.io';
import redisAdapter from 'socket.io-redis';

const REDIS_HOST =
  process.env.NODE_ENV === 'production' ? 'redis' : 'localhost';

/**
 * Creates and initializes a single Socket.IO server that listens
 * for connections and forwards events from Redis pub/sub.
 */
const initiateSocketIoServer = (cluster: typeof import('cluster')) => {
  const io = socketIo({
    transports: ['websocket'],
    allowUpgrades: false,
  });
  io.adapter(redisAdapter({ host: REDIS_HOST, port: 6379 }));
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
