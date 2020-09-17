const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: { type: String, minlength: 5, maxlength: 255, required: true, unique: true },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
})

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema)

validateAsUser = (customer) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  })

  return validationSchema.validate(customer)
}

module.exports = { User, validateAsUser }