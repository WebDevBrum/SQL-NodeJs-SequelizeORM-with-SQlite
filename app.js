//const Sequelize = require('sequelize'); //imported from db
const db = require('./db');
const { Movie } = db.models; //db.models.Movie from index.js




// NOW IMPORTED FROM ./db index.js

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'movies.db'
//   //logging: false // disable logging
// });

// IMPORTED from ./db/models/movie.js , via db/index.js
// // Movie model
// class Movie extends Sequelize.Model { }
// Movie.init({
//   title: Sequelize.STRING
// }, { sequelize }); // same as { sequelize: sequelize }

(async () => {
  // Sync 'Movies' table
  //await Movie.sync(); original code for individual table

  // Sync all tables
  await db.sequelize.sync({ force: true }); //allows force refresh of tables on app start
  //db. added as now modular
  try {
    //alternate is const movieInstances = await Promise.all([Movie.create({...})]} //retuens 1 promise when all creates are returned so can take multiple records 
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({ // const variable does not have to be declared (only here for logging)
      title: 'Toy Story',
    });
    console.log(movie.toJSON());

    // New entry
    const movie2 = await Movie.create({ // const variable does not have to be declared (only here for logging)
      title: 'The Incredibles'
    });
    console.log(movie2.toJSON());
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// async IIFE
(async () => {
  try {
    await db.sequelize.authenticate(); //db. added as now modular
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);

  }

})();