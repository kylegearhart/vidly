const errorLogger = require('debug')('app:error')
const { User, validateAsUser } = require('./user')
const repository = require('./userRepository')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwtValidationMiddleware = require('../auth/jwtValidationMiddleware')

router.get('/me', jwtValidationMiddleware, async (request, response) => {
  const user = await User.findById(request.user._id).select('-password')
  response.send(user)
})

router.post('/', async (request, response) => {
  let validationResult = validateAsUser(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const duplicatedUser = await User.findOne({ email: request.body.email })
    if (duplicatedUser) return response.status(400).send('User with email already exists.')

    const newUser = _.pick(request.body, ['name', 'email', 'password', 'isAdmin'])
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    const savedOrUpdatedUser = await repository.add(newUser)
    if (!savedOrUpdatedUser) return response.status(500).send('User save was unsuccessful.')

    const token = savedOrUpdatedUser.generateAuthToken()
    return response.header('x-auth-token', token).send(_.pick(savedOrUpdatedUser, ['name', 'email']))
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('User creation was unsuccessful.')
  }
})

module.exports = router