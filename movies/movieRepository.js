const mongoose = require('mongoose')
const { Movie } = require('./movie')

function add(newMovie, associatedGenre) {
  const movieToAdd = new Movie({
    title: newMovie.title,
    genre: {
      _id: associatedGenre._id,
      name: associatedGenre.name
    },
    numberInStock: newMovie.numberInStock,
    dailyRentalRate: newMovie.dailyRentalRate,
  })

  return movieToAdd.save()
}

function getAll() {
  return Movie.find({}).sort('title')
    .select({
      _id: 0,
      genre: 1, title: 1, numberInStock: 1, dailyRentalRate: 1,
    })
}

function movieForId(idAsString) {
  return Movie.findById(mongoose.Types.ObjectId(idAsString))
    .select({
      genre: 1, title: 1, numberInStock: 1, dailyRentalRate: 1,
    })
}

function deleteMovieWithId(idAsString) {
  return Movie.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

function updateMovieWithId(idAsString, movieProperties) {
  return Movie.findByIdAndUpdate(
    mongoose.Types.ObjectId(idAsString),
    movieProperties,
    { new: true },
  )
}

module.exports = { add, getAll, movieForId, deleteMovieWithId, updateMovieWithId }

