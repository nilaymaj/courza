import os from 'os';
import cluster from 'cluster';
import * as logger from './utils/logger';
import startHttpServer from './server';
import { init as startSocketServer } from './realtime';

// const numSocketWorkers =
//   process.env.NODE_ENV === 'production' ? os.cpus().length : 1;
const numSocketWorkers = 1;

// Initiate process cluster with master node for HTTP server
// and worker nodes for Socket.IO server
if (cluster.isMaster) {
  for (let i = 0; i < numSocketWorkers; ++i) {
    cluster.fork();
    cluster.on('exit', () => console.log('A worker died :('));
  }
  logger.log('Started websocket cluster', 'ws');

  startHttpServer();
} else if (cluster.isWorker) {
  startSocketServer(cluster);
}
