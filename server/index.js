const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MainRouter = require('./routes');
const { connectToDb } = require('./db');
const logger = require('./utils/logger');
const { initSocketManager } = require('./realtime');
const server = require('http').createServer(app);
const io = require('socket.io')(server, { serveClient: false });

initSocketManager(io);

// io.on('connection', (socket) => {
//   console.log('Hello');
//   io.on('message', (socket) => {
//     console.log('Got something!');
//   });
//   socket.emit('message', { _id: '5ebcd' });
// });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', MainRouter);

connectToDb()
  .then(() => {
    logger.log('Successfully connected to database.', 'db');
  })
  .catch((err) => {
    logger.err(`Error connecting to db: ${err}`, 'db');
  });

const PORT = 8000;
server.listen(PORT, () => {
  logger.log(`Started server at port ${PORT}`, 'server');
});
