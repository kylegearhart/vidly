const errorLogger = require('debug')('app:error')
const { validateAsRental } = require('./rental')
const repository = require('./rentalRepository')
const express = require('express')
const router = express.Router()

router.post('/', async (request, response) => {
  let validationResult = validateAsRental(request.body)

  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const savedOrUpdatedRental = await repository.add(request.body)

    if (!savedOrUpdatedRental) return response.status(500).send('Rental save was unsuccessful.')

    return response.send(savedOrUpdatedRental)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Rental creation was unsuccessful.')
  }
})

router.get('/', async(request, response) => {
  try {
    const rentals = await repository.getAll()

    return response.send(rentals)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Rental list retrieval was unsuccessful')
  }
})

module.exports = router