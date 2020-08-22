const mongoose = require('mongoose')
const genre = require('./genre')

function add(newGenre) {
  const genreToAdd = new genre.Genre({
    name: newGenre.name,
  })

  return genreToAdd.save()
}

function getAll() {
  return genre.Genre.find({}).sort('name')
}

function genreForId(idAsString) {
  return genre.Genre.findById(mongoose.Types.ObjectId(idAsString))
}

function deleteGenreWithId(idAsString) {
  return genre.Genre.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

async function updateGenreWithId(idAsString, genreProperties) {
  const updatedGenre = await genre.Genre.findByIdAndUpdate(
    mongoose.Types.ObjectId(idAsString),
    genreProperties,
    { new: true },
  )

  if (!updatedGenre) return null

  return updatedGenre
}

module.exports = { add, getAll, genreForId, deleteGenreWithId, updateGenreWithId }

