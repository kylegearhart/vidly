const errorLogger = require('debug')('app:error')
const { validateAsCustomer } = require('./customer')
const repository = require('./customerRepository')
const express = require('express')
const jwtValidationMiddleware = require('../auth/jwtValidationMiddleware')
const router = express.Router()

router.post('/', jwtValidationMiddleware, async (request, response) => {
  let validationResult = validateAsCustomer(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const savedOrUpdatedCustomer = await repository.add(request.body)

    if (!savedOrUpdatedCustomer) return response.status(500).send('Customer save was unsuccessful.')

    return response.send(savedOrUpdatedCustomer)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Customer creation was unsuccessful.')
  }
})

router.get('/', async (request, response) => {
  try {
    const result = await repository.getAll()

    return response.send(result)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Customer list retrieval was unsuccessful.')
  }
})

router.get('/:id', async (request, response) => {
  try {
    const customerWithId = await repository.customerForId(request.params.id)

    if (!customerWithId) return response.status(404).send('A customer with the given Id does not exist.')

    return response.send(customerWithId)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Customer retrieval for Id was unsuccessful.')
  }
})

router.put('/:id', jwtValidationMiddleware, async (request, response) => {
  let validationResult = validateAsCustomer(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const updatedCustomer = await repository.updateCustomerWithId(request.params.id, request.body)

    if (!updatedCustomer) return response.status(404).send('A customer with the given Id does not exist.')

    return response.send(updatedCustomer)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Customer update was unsuccessful.')
  }
})

router.delete('/:id', jwtValidationMiddleware, async (request, response) => {
  try {
    const deletedCustomer = await repository.deleteCustomerWithId(request.params.id)

    if (!deletedCustomer) return response.status(404).send('A customer with the given Id does not exist.')

    return response.send(deletedCustomer)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('Customer deletion for Id was unsuccessful.')
  }
})

module.exports = router