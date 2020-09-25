const errorLogger = require('debug')('app:error')
const { validateAsGenre } = require('./genre')
const repository = require('./genreRepository')
const express = require('express')
const jwtValidationMiddleware = require('../auth/jwtValidationMiddleware')
const allowOnlyAdminMiddleware = require('../auth/allowOnlyAdminMiddleware')
const validateObjectIdMiddleware = require('../validateObjectIdMiddleware')
const router = express.Router()

router.post('/', [jwtValidationMiddleware, allowOnlyAdminMiddleware], async (request, response) => {
  let validationResult = validateAsGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const savedOrUpdatedGenre = await repository.add(request.body)

    if (!savedOrUpdatedGenre) return response.status(500).send('Genre save was unsuccessful.')

    return response.send(savedOrUpdatedGenre)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Genre creation was unsuccessful.')
  }
})

router.get('/', async (request, response) => {
  try {
    const result = await repository.getAll()

    return response.send(result)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Genre list retrieval was unsuccessful.')
  }
})

router.get('/:id', validateObjectIdMiddleware, async (request, response) => {
  try {
    const genreWithId = await repository.genreForId(request.params.id)

    if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

    return response.send(genreWithId)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Genre retrieval for Id was unsuccessful.')
  }
})

router.put('/:id', [jwtValidationMiddleware, allowOnlyAdminMiddleware], async (request, response) => {
  let validationResult = validateAsGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const updatedGenre = await repository.updateGenreWithId(request.params.id, request.body)

    if (!updatedGenre) return response.status(404).send('A genre with the given Id does not exist.')

    return response.send(updatedGenre)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Genre update was unsuccessful.')
  }
})

router.delete('/:id', [jwtValidationMiddleware, allowOnlyAdminMiddleware], async (request, response) => {
  try {
    const deletedGenre = await repository.deleteGenreWithId(request.params.id)

    if (!deletedGenre) return response.status(404).send('A genre with the given Id does not exist.')

    return response.send(deletedGenre)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Genre deletion for Id was unsuccessful.')
  }
})

module.exports = router