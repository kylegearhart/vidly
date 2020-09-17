const errorLogger = require('debug')('app:error')
const { validateAsRental } = require('./rental')
const rentalRepository = require('./rentalRepository')
const customerRepository = require('../customers/customerRepository')
const movieRepository = require('../movies/movieRepository')
const express = require('express')
const jwtValidationMiddleware = require('../auth/jwtValidationMiddleware')
const router = express.Router()

router.post('/', jwtValidationMiddleware, async (request, response) => {
  let validationResult = validateAsRental(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const customerWithId = await customerRepository.customerForId(request.body.customerId)
  if (!customerWithId) return response.status(404).send('A customer with the given Id does not exist.')

  const movieWithId = await movieRepository.movieForId(request.body.movieId)
  if (!movieWithId) return response.status(404).send('A movie with the given Id does not exist.')

  if (movieWithId.numberInStock === 0) return response.status(400).send('No copies of that movie are available.')

  try {
    const savedOrUpdatedRental = await rentalRepository.add(request.body, customerWithId, movieWithId)

    if (!savedOrUpdatedRental) return response.status(500).send('Rental save was unsuccessful.')

    movieWithId.numberInStock -= 1
    await movieRepository.updateMovieWithId(movieWithId.id, movieWithId)

    return response.send(savedOrUpdatedRental)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Rental creation was unsuccessful.')
  }
})

router.get('/', async(request, response) => {
  try {
    const rentals = await rentalRepository.getAll()

    return response.send(rentals)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Rental list retrieval was unsuccessful')
  }
})

module.exports = router