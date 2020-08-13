const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Movie model
class Movie extends Sequelize.Model { }
Movie.init({
  title: Sequelize.STRING
}, { sequelize }); // same as { sequelize: sequelize }

(async () => {
  // Sync 'Movies' table
  //await Movie.sync(); original code for individual table

  // Sync all tables
  await sequelize.sync({ force: true }); //allows force refresh of tables on app start

  try {
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
      title: 'Toy Story',
    });
    console.log(movie.toJSON());
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);

  }

})();