const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Customer = mongoose.model('Customer', {
  isGold: { type: Boolean, required: true },
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  phone: { type: String, minlength: 5, maxlength: 50, required: true },
})

module.exports.validateAsCustomer = (customer) => {
  const validationSchema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  })

  return validationSchema.validate(customer)
}