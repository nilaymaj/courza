const express = require('express');
const morgan = require('morgan');
const { CourseRouter, ChatRouter, StudentRouter } = require('./routes');
const { connectToDb } = require('./db');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/courses', CourseRouter);
app.use('/chats', ChatRouter);
app.use('/students', StudentRouter);

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
