const errorLogger = require('debug')('app:error')
const { validateAsLoginAttempt } = require('./loginAttempt')
const { User } = require('../users/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (request, response) => {
  let validationResult = validateAsLoginAttempt(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  try {
    const existingUser = await User.findOne({ email: request.body.email })
    if (!existingUser) return response.status(400).send('Invalid email or password.')

    const isCorrectPassword = await bcrypt.compare(request.body.password, existingUser.password)
    if (!isCorrectPassword) return response.status(400).send('Invalid email or password.')

    const token = jwt.sign({ _id: existingUser._id }, 'jwtPrivateKey')
    response.send(token)
  } catch (error) {
    errorLogger(error.message)
    return response.status(500).send('User creation was unsuccessful.')
  }
})

module.exports = router