const mongoose = require('mongoose')
const genre = require('./genre')

function add(newGenre) {
  const genreToAdd = new genre.Genre({
    name: newGenre.name,
  })

  return genreToAdd.save()
}

function getAll() {
  return genre.Genre.find({})
}

function genreForId(idAsString) {
  return genre.Genre.findById(mongoose.Types.ObjectId(idAsString))
}

function deleteGenreWithId(idAsString) {
  return genre.Genre.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

async function updateGenreWithId(idAsString, updatedGenreProperties) {
  const genreWithId = await genreForId(idAsString)

  if (!genreWithId) return null

  genreWithId.name = updatedGenreProperties.name

  return genreWithId.save()
}

module.exports = { add, getAll, genreForId, deleteGenreWithId, updateGenreWithId }

