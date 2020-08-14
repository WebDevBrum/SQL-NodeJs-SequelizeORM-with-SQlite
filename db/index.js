const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  // global options
  // define: {
  //   freezeTableName: true,
  //   timestamps: false,
  // },
  logging: false
});

const db = {
  sequelize,  // exports the sequelize initialisstion above 
  Sequelize, // exports the require at top 
  models: {}, // utilizes then below
};

db.models.Movie = require('./models/movie.js')(sequelize);
// so selects the sequelize export

// import new model
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db; // so just exports db 