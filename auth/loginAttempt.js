const mongoose = require('mongoose')
const Joi = require('joi')

LoginAttempt = mongoose.model('LoginAttempt', {
  email: { type: String, minlength: 5, maxlength: 255, required: true, unique: true },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
})

validateAsLoginAttempt = (loginAttempt) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  })

  return validationSchema.validate(loginAttempt)
}

module.exports = { LoginAttempt, validateAsLoginAttempt }