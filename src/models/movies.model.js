'use strict';


const Movies = (dbInstance, DataTypes) =>
    dbInstance.define('Movies', {
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

module.exports = Movies;    