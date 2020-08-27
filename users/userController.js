const errorLogger = require('debug')('app:error')
const { User, validateAsUser } = require('./user')
const repository = require('./userRepository')
const express = require('express')
const router = express.Router()

router.post('/', async (request, response) => {
  let validationResult = validateAsUser(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const duplicatedUser = await User.findOne({ email: request.body.email })
    if (duplicatedUser) return response.status(400).send('User with email already exists.')

    const savedOrUpdatedUser = await repository.add(request.body)
    if (!savedOrUpdatedUser) return response.status(500).send('User save was unsuccessful.')

    return response.send(savedOrUpdatedUser)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('User creation was unsuccessful.')
  }
})

module.exports = router