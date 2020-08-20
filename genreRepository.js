const genres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
]

function add(newGenre) {
  const genre = { id: genres.length + 1, name: newGenre.name }

  genres.push(genre)

  return genre
}

function getAll() {
  return genres
}

function genreForId(id) {
  return genres.find((genre) => genre.id === id)
}

function deleteGenreWithId(id) {
  const indexOfGenre = genres.findIndex((genre) => genre.id === id)
  genres.splice(indexOfGenre, 1)
}

function updateGenreWithId(genreId, updatedGenreProperties) {
  const genreToUpdate = genreForId(genreId)

  genreToUpdate.name = updatedGenreProperties.name

  return genreToUpdate
}

module.exports = { add, getAll, genreForId, deleteGenreWithId, updateGenreWithId }

