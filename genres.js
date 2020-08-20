const Genre = require('./genre')
const repository = require('./genreRepository')
const express = require('express')
const router = express.Router()

router.post('/', (request, response) => {
  let validationResult = Genre.validateGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const genreAdded = repository.add(request.body)

  return response.send(genreAdded)
})

router.get('/', (request, response) => {
  response.send(repository.getAll())
})

router.get('/:id', (request, response) => {
  const genreWithId = repository.genreForId(parseInt(request.params.id))

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  return response.send(genreWithId)
})

router.put('/:id', (request, response) => {
  let validationResult = Genre.validateGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const genreId = parseInt(request.params.id)
  const genreWithId = repository.genreForId(genreId)

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  const updatedGenre = repository.updateGenreWithId(genreId, request.body)

  return response.send(updatedGenre)
})

router.delete('/:id', (request, response) => {
  const genreId = parseInt(request.params.id)
  const genreWithId = repository.genreForId(genreId)

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  repository.deleteGenreWithId(genreId)

  return response.send(genreWithId)
})

module.exports = router