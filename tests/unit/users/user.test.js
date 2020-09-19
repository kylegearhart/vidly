const { it, describe } = require('@jest/globals')
const { User } = require('../../../users/user')
const config = require('config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

describe('User model object', () => {
  it('generates its own jwt auth token containing its id', () => {
    config.get = jest.fn().mockReturnValue('jwt-private-key')
    const userId = new mongoose.Types.ObjectId().toHexString()
    const user = new User({ _id: userId, isAdmin: true })

    const token = user.generateAuthToken()
    const tokenPayload = jwt.verify(token, 'jwt-private-key')

    expect(tokenPayload).toHaveProperty('_id', userId)
    expect(tokenPayload).toHaveProperty('isAdmin', true)
  })
})