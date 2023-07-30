'use strict';

const supertest = require('supertest');
const { server } = require('../src/server.js');
const mockRequest = supertest(server);
const { dbConnection } = require('../src/models/index.js');
const { get } = require('../src/routes/game.route.js');

describe(' web server', () => {
  beforeAll(async () => {
    await dbConnection.sync();
  });
  afterAll(async () => {
    await dbConnection.drop();
  });
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/mordor').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/mordor');
    expect(response.status).toBe(404);
  });

  it('can create a game record', async () => {
    const game = {
      title: 'Call of Duty',
      rating: '5',
    };

    const response = await mockRequest.post('/games').send(game);
    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
    expect(response.body['title']).toEqual('Call of Duty');
    Object.keys(game).forEach((key) => {
      expect(game[key]).toEqual(response.body[key]);
    });
  });

  it('can get a list of games records', async () => {
    const response = await mockRequest.get('/games');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('can get a game record', async () => {
    const response = await mockRequest.get('/games/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
  });

  it('can update a game record', async () => {
    const data = { rating: '8' };
    const response = await mockRequest.put('/games/1').send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
    expect(response.body.rating).toEqual('8');
  });

  it('can delete a game record', async () => {
    const response = await mockRequest.delete('/games/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get('/games');
    expect(getResponse.body.length).toEqual(0);
  });

  it('can create a movie record', async () => {
    const movie = {
      title: 'Inception',
      rating: 9.3,
    };

    const response = await mockRequest.post('/movies').send(movie);
    expect(response.status).toBe(200);

    expect(response.body.id).toBeDefined();
    expect(response.body['title']).toEqual('Inception');
    Object.keys(movie).forEach((key) => {
      expect(movie[key]).toEqual(response.body[key]);
    });
  });

  it('can get a list of movie records', async () => {
    const response = await mockRequest.get('/movies');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('can get a movie record', async () => {
    const response = await mockRequest.get('/movies/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
  });

  it('can update a movie record', async () => {
    const data = { rating: 8.5 };
    const response = await mockRequest.put('/movies/1').send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
    expect(response.body.rating).toEqual(8.5);
  });

  it('can delete a movie record', async () => {
    const response = await mockRequest.delete('/movies/1');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const getResponse = await mockRequest.get('/movies');
    expect(getResponse.body.length).toEqual(0);
  });
});
