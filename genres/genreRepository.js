const mongoose = require('mongoose')
const { Genre } = require('./genre')

function add(newGenre) {
  const genreToAdd = new Genre({
    name: newGenre.name,
  })

  return genreToAdd.save()
}

function getAll() {
  return Genre.find({}).select({ name: 1 }).sort('name')
}

function genreForId(idAsString) {
  return Genre.findById(mongoose.Types.ObjectId(idAsString))
}

function deleteGenreWithId(idAsString) {
  return Genre.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

function updateGenreWithId(idAsString, genreProperties) {
  return Genre.findByIdAndUpdate(
    mongoose.Types.ObjectId(idAsString),
    genreProperties,
    { new: true },
  )
}

module.exports = { add, getAll, genreForId, deleteGenreWithId, updateGenreWithId }

