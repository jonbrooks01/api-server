require('dotenv').config();
const { start } = require('./src/server');
const { dbConnection } = require('./src/models');
const PORT = process.env.PORT;

dbConnection
  .sync()
  .then(() => {
    start(PORT, () => console.log('server up'));
  })
  .catch((e) => {
    console.error('Could not start server', e.message);
  });

// good stuff Jonathan!  Code is very easy to step through and understand.
