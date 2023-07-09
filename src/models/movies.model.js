'use strict';


const Movies = (dbInstance, DataTypes) =>
    dbInstance.define('Movies', {
      title: {
        type: DataTypes.STRING,

        allowNull: false,
      },
      rating: {
        type: DataTypes.NUMBER,
      },
    });

module.exports = Movies;    