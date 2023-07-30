'use strict';

const { STRING } = require("sequelize");


const Games = (dbInstance, DataTypes) =>
    dbInstance.define('Games', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mainCharacterMovie: {
        type: DataTypes.STRING,
  
      },    
       mainCharacter: {
        type: DataTypes.STRING,
  
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      movieId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
    });

module.exports = Games;    