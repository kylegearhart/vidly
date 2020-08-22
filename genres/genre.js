const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
})

Genre = mongoose.model(
  'Genre',
  genreSchema,
)

validateAsGenre = (genre) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  })

  return validationSchema.validate(genre)
}

module.exports = { Genre, validateAsGenre, genreSchema }