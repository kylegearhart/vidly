const mongoose = require('mongoose')
const Joi = require('joi')

const genre = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
})

function validateGenre(genre) {
  const validationSchema = Joi.object({
    name: Joi.string().min(2).required()
  })

  return validationSchema.validate(genre)
}

module.exports.Genre = mongoose.model('Genre', genre)
module.exports.validateGenre = validateGenre