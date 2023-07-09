'use strict';


const Games = (dbInstance, DataTypes) =>
    dbInstance.define('Games', {
      title: {
        type: DataTypes.STRING,

        allowNull: false,
      },
    });

module.exports = Games;    