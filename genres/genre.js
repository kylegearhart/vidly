const mongoose = require('mongoose')
const Joi = require('joi')

module.exports.Genre = mongoose.model(
  'Genre',
  mongoose.Schema({
    name: { type: String, minlength: 5, maxlength: 50, required: true },
  }),
)

module.exports.validateAsGenre = (genre) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  })

  return validationSchema.validate(genre)
}