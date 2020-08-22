const errorLogger = require('debug')('app:error')
const { validateAsMovie } = require('./movie')
const genreRepository = require('../genres/genreRepository')
const movieRepository = require('./movieRepository')
const express = require('express')
const router = express.Router()

router.post('/', async (request, response) => {
  let validationResult = validateAsMovie(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const genreWithId = await genreRepository.genreForId(request.body.genreId)

    if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

    const savedOrUpdatedMovie = await movieRepository.add(request.body, genreWithId)

    if (!savedOrUpdatedMovie) return response.status(500).send('Movie save was unsuccessful.')

    return response.send(savedOrUpdatedMovie)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Movie creation was unsuccessful.')
  }
})

router.get('/', async (request, response) => {
  try {
    const result = await movieRepository.getAll()

    return response.send(result)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Movie list retrieval was unsuccessful.')
  }
})

router.get('/:id', async (request, response) => {
  try {
    const movieWithId = await movieRepository.movieForId(request.params.id)

    if (!movieWithId) return response.status(404).send('A movie with the given Id does not exist.')

    return response.send(movieWithId)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Movie retrieval for Id was unsuccessful.')
  }
})

router.put('/:id', async (request, response) => {
  let validationResult = validateAsMovie(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const updatedMovie = await movieRepository.updateMovieWithId(request.params.id, request.body)

    if (!updatedMovie) return response.status(404).send('A movie with the given Id does not exist.')

    return response.send(updatedMovie)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Movie update was unsuccessful.')
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const deletedMovie = await movieRepository.deleteMovieWithId(request.params.id)

    if (!deletedMovie) return response.status(404).send('A movie with the given Id does not exist.')

    return response.send(deletedMovie)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Movie deletion for Id was unsuccessful.')
  }
})

module.exports = router