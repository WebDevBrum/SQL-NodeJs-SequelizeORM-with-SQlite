const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model { }
  Movie.init({
    // Set custom primary key column , sequelize default generates a column but we can also do this here, then the name does not have to be id , could be say 'identifier'
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING, //default lengh 255 can add (500) etc
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: { //error msg instead of just notEmpty: true
          // custom error message
          msg: 'Please provide a value for "title"',
        },
      },

    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        min: {
          args: 1, //so if less than 1
          msg: 'Please provide a value greater than "0" for "runtime"',
        },
      },

    },
    releaseDate: {
      type: Sequelize.DATEONLY, //date without 
      allowNull: false, // disallow null time
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
        },
      },
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false, // disallow null
      defaultValue: false, // set default value
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
      },
    },
  },

    {
      //we can also set global options, see db/index.js
      //tableName: 'my_movies_table', // custom table name change
      //modelName: 'movie', // set model name to 'movie' (normally capitalised so this overides default); table name will be 'movies'
      //freezeTableName: true, // disable plural table names
      //timestamps: false, // disable timestamps
      paranoid: true, // enable "soft" deletes
      // Setting the paranoid option to true means that a destroyed record will not be physically deleted from the database, but it will also not be returned in future queries.
      // Run your app with npm start. When you refresh the 'Movies' table in DB Browser for SQLite, the destroyed record should reappear. Notice how Sequelize added a deletedAt column to the table indicating the time at which the record's 'soft deletion' happened. The other record's deletedAt value is NULL.
      //Not permanently deleting a record with destroy() could have its advantages. It allows you to keep a history for database auditing. It also makes it easier to restore "deleted" data, and there is less risk of data loss if something goes wrong.
      //However, soft-deleted records also take up space in your database. They could add complexity to your queries and you may have to consider the performance implications of keeping all the data down the road

      sequelize // same as { sequelize: sequelize }
      //Note: Sequelize will throw an error if you don't provide a sequelize property.
    });

  return Movie;
};