'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const movies = require('./movies.model');
const games = require('./games.model.js');
const Collection = require('./collection.js');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URI;

let sequelize = new Sequelize(POSTGRES_URI);

const movieModel = movies(sequelize, DataTypes);
const gameModel = games(sequelize, DataTypes);

movieModel.hasMany(gameModel, {
  foreignKey: 'movieId',
  sourceKey: 'id',
});
gameModel.belongsTo(movieModel, {
  foreignKey: 'movieId',
  targetKey: 'id',
});

const movieCollection = new Collection(movieModel);
const gameCollection = new Collection(gameModel);

module.exports = {
  dbConnection: sequelize,
  Movies: movies(sequelize, DataTypes),
  Games: games(sequelize, DataTypes),
  movieCollection,
  gameCollection,
};

// you might have to have a different data model since we have to create an association between two of our models (one to one/one to many/etc.)