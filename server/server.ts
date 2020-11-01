import express from 'express';
const app = express();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import MainRouter from './routes';
import * as logger from './utils/logger';
import { initStorage } from './utils/storage';
import { initMailService } from './utils/email';
import http from 'http';
import path from 'path';

const dbHost = process.env.NODE_ENV === 'production' ? 'mongo' : 'localhost';
const DB_URL = `mongodb://${dbHost}:27017/courza`;

/**
 * Setup and initialize the Express server
 */
const startHttpServer = async () => {
  const server = http.createServer(app);

  // Middleware
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use('/api', MainRouter);
  app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
  );

  // Connect to database
  connect(DB_URL, {
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

  // Connect to email service provider
  initMailService();

  // Start listening
  const PORT = 8000;
  server.listen(PORT, () => {
    logger.log(`Started server at port ${PORT}`, 'server');
  });
};

export default startHttpServer;
