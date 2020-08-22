const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Customer = mongoose.model('Customer', {
  isGold: { type: Boolean, required: true },
  name: { type: String, minlength: 8, maxlength: 30, required: true },
  phone: { type: String, minlength: 7, maxlength: 15, required: true },
})

module.exports.validateAsCustomer = (customer) => {
  const validationSchema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(8).max(30).required(),
    phone: Joi.string().min(7).max(15).required(),
  })

  return validationSchema.validate(customer)
}