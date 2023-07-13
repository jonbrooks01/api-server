'use strict';

const {
  dbConnection,
  movieCollection,
  gameCollection,
} = require('../src/models/');

beforeAll(async () => {
  await dbConnection.sync();
});
afterAll(async () => {
  await dbConnection.drop();
});

describe()