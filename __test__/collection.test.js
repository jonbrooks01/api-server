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

describe('Movies and Games Collections', () => {
    let testMovie = {
      title: 'test movie',
      mainCharacter: 'test character'
    };
    let testGame = {
      title: 'test game',
      mainCharacter: 'test character',
    };

    let movie = null;
    let game = null;
    console.log('Movie:', movie);
    console.log('Game:', game);
    
    beforeEach(async () => {
      try {
        movie = await movieCollection.create(testMovie);
        testGame['movieId'] = movie.id;
        game = await gameCollection.create(testGame);
      } catch (error) {
        console.error(`Error when creating data for the "Games" model: ${error.message}`);
        console.error(error.stack);
      }
    });

    it('it should be able to create a movie and a game', async () => {
      expect(movie.title).toEqual(testMovie.title);
      expect(game.title).toEqual(testGame.title);
      expect(game.mainCharacter).toEqual(testGame.mainCharacter);
      expect(game.movieId).toEqual(movie.id);
    });

    it('should be able to fetch movies', async () => {
      let retrievedMovie = await movieCollection.read(1);

      expect(retrievedMovie.title).toBe('test movie');
    });
});