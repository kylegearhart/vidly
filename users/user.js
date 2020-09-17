const mongoose = require('mongoose')
const Joi = require('joi')

User = mongoose.model('User', {
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: { type: String, minlength: 5, maxlength: 255, required: true, unique: true },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
})

validateAsUser = (customer) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  })

  return validationSchema.validate(customer)
}

module.exports = { User, validateAsUser }