const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Genre = mongoose.model(
  'Genre',
  mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 30, required: true },
  }),
)

module.exports.validateAsGenre = (genre) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(2).required(),
  })

  return validationSchema.validate(genre)
}