'use strict';

const { STRING } = require("sequelize");


const Games = (dbInstance, DataTypes) =>
    dbInstance.define('Games', {
      title: {
        type: DataTypes.STRING,

        allowNull: false,
      },
      mainCharacter: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    });

module.exports = Games;    