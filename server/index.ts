import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import MainRouter from './routes';
import * as logger from './utils/logger';
import { initSocketManager } from './realtime';
import { DEV_DB_URL } from './utils/constants';
import http from 'http';
import socketIo from 'socket.io';

const server = http.createServer(app);
const io = socketIo(server, { serveClient: false });
initSocketManager(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', MainRouter);

// Connect to database
connect(DEV_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    logger.log('Successfully connected to database.', 'db');
  })
  .catch((err) => {
    logger.err(`Error connecting to db: ${err}`, 'db');
  });

// Start listening
const PORT = 8000;
server.listen(PORT, () => {
  logger.log(`Started server at port ${PORT}`, 'server');
});
