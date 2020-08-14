//const Sequelize = require('sequelize'); //imported from db
const db = require('./db');
const { Movie, Person } = db.models; //db.models.Movie from index.js
const { Op } = db.Sequelize; // allows for more complex filter data comparisons




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
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,

    });
    console.log(movie.toJSON());

    // New entry
    const movie2 = await Movie.create({ // const variable does not have to be declared (only here for logging)
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

    // New Person record
    const person = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks',
    });
    console.log(person.toJSON());

    // New instance
    const movie3 = await Movie.build({ //note the use of build here
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      //isAvailableOnVHS: false, shows build still gets default values
    });
    //call any changes prior to save eg
    // movie3.title = 'Updated Title';
    await movie3.save(); // save the record (without this we get console log id: null)
    console.log(movie3.toJSON());

    //SO WE CAN SEE THAT .CREATE INVOKES BOTH .BUILD AND .SAVE AT THE SAME TIME

    /* ----------- finder methods -------------*/
    // const movieById = await Movie.findByPk(1);
    // console.log(movieById.toJSON());

    // const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    // console.log(movieByRuntime.toJSON());

    // const movies = await Movie.findAll();
    // console.log(movies.map(movie => movie.toJSON()));

    // //find all also takes options eg

    // const mov = await Movie.findAll({
    //   where: {
    //     runtime: 81,
    //     isAvailableOnVHS: true
    //   }
    // });
    // // e.g SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
    // console.log(mov.map(movie => movie.toJSON()));


    /* ---- Attributes, Operators and Ordering ------ */

    const movies = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        isAvailableOnVHS: true,
      },
    });
    console.log(movies.map(movie => movie.toJSON()));

    const movies2 = await Movie.findAll({
      attributes: ['id', 'title'],
      where: {
        releaseDate: {
          [Op.gte]: '1995-11-22' // greater than or equal to the date
        },
        runtime: {
          [Op.gt]: 80, // greater than 95
          //[Op.between]: [75, 115] if range for example
        },
        title: {
          [Op.endsWith]: 'story'
        }
      },
      order: [['id', 'DESC']], // IDs in descending order
      //order: [['releaseDate', 'ASC']], // dates in ascending order
      //order: ["createdAt", "DESC"]], // articles in descending order etc etc
    });
    console.log(movies2.map(movie => movie.toJSON()));

    /*------ Update a record with save -----*/

    const toyStory3 = await Movie.findByPk(3);
    toyStory3.isAvailableOnVHS = true;
    await toyStory3.save();

    console.log(toyStory3.get({ plain: true }));

    // Note: When converting an instance or collection of instances to JSON, calling get({ plain: true}) returns the same as calling .toJSON() – a plain object with just the model attributes and values.

    /* ------ update a record with update ----- */

    const toyStory = await Movie.findByPk(3);
    await toyStory.update({
      isAvailableOnVHS: true,
    });
    console.log(toyStory.get({ plain: true }));

    /* -- Define which attributes to save --- */

    const incred = await Movie.findByPk(2);
    await incred.update({
      title: 'Trinket Tale 3', // this will be ignored
      isAvailableOnVHS: false,
    }, { fields: ['isAvailableOnVHS'] }); //defines what to save

    console.log(incred.get({ plain: true }));

    // So When you run the app, the console output and your 'Movies' table should not display an updated movie title -- only isAvailableOnVHS should be updated to true:

    // Being able to allow/disallow (or whitelist) columns to update is useful when you want to ensure that users cannot pass objects with columns that should not be updated via a form, for example).

    /* --- Delete a record ------ */

    // // Find a record
    // const toyStoryD = await Movie.findByPk(1);

    // // Delete a record
    // await toyStoryD.destroy();

    // // Find and log all movies
    // const moviesD = await Movie.findAll();
    // console.log(moviesD.map(movie => movie.toJSON()));



  } catch (error) {
    //console.error('Error connecting to the database: ', error);
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error; // for errors not like above eg general, missing records , unforseen etc
    }
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