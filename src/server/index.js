const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MainRouter = require('./routes');
const { connectToDb } = require('./db');
const logger = require('./utils/logger');
const { objectify, errorHandler } = require('./middleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', MainRouter);

connectToDb()
  .then(() => {
    logger.log('Successfully connected to database.', 'db');
  })
  .catch(err => {
    logger.err(`Error connecting to db: ${err}`, 'db');
  });

const PORT = 8000;
app.listen(PORT, () => {
  logger.log(`Started server at port ${PORT}`, 'server');
});
