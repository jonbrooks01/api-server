require('dotenv').config();
const { start } = require('./server.js');
const { dbConnection } = require('./src/models/index.js');
const PORT = process.env.PORT || 3000;


dbConnection
.sync()
.then(() => {
  start(PORT);
})
.catch(console.error);



// good stuff Jonathan!  Code is very easy to step through and understand.