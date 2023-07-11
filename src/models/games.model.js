'use strict';


const Games = (dbInstance, DataTypes) =>
    dbInstance.define('Games', {
      title: {
        type: DataTypes.STRING,

        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    });

module.exports = Games;    