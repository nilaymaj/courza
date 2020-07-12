import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import MainRouter from './routes';
import * as logger from './utils/logger';
import { DEV_DB_URL } from './utils/constants';
import { initStorage } from './utils/storage';
import http from 'http';

const server = http.createServer(app);

// Middleware
app.use(cors({ origin: 'http://test.lclhost.com:3000', credentials: true }));
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

// Set up AWS service object
initStorage()
  .then(() => {
    logger.log('Credentials loaded successfully', 'aws');
  })
  .catch((err) => {
    logger.err(`Couldn't load credentials: ${err}`, 'aws');
  });

// Start listening
const PORT = 8000;
server.listen(PORT, () => {
  logger.log(`Started server at port ${PORT}`, 'server');
});
