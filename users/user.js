const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: { type: String, minlength: 5, maxlength: 255, required: true, unique: true },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
  isAdmin: { type: Boolean, required: true }
})

userSchema.methods.generateAuthToken = function() {
  const jwtPayload = { _id: this._id, isAdmin: this.isAdmin }
  return jwt.sign(jwtPayload, config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema)

validateAsUser = (customer) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required()
  })

  return validationSchema.validate(customer)
}

module.exports = { User, validateAsUser }