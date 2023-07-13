'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const movies = require('./movies.model');
const games = require('./games.model.js');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URI;

let sequelize = new Sequelize(POSTGRES_URI, {
  dialect: 'postgres',
});

module.exports = {
  dbConnection: sequelize,
  Movies: movies(sequelize, DataTypes),
  Games: games(sequelize, DataTypes)
};

// you might have to have a different data model since we have to create an association between two of our models (one to one/one to many/etc.)