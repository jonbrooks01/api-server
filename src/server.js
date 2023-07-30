'use strict';

const express = require('express');
const server = express();
const logger = require('./middleware/logger.js');
const handle500 = require('./error-handlers/500.js');
const handle404 = require('./error-handlers/404.js');
const gameRoutes = require('./routes/game.route.js');
const movieRoutes = require('./routes/movie.route.js');

function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

server.use(logger);

server.use(express.json());

server.get('/', (req, res) => res.send('Hello World'));

server.use(movieRoutes);

server.use(gameRoutes);

server.use('*', handle404);
server.use(handle500);

module.exports = { server, start };
