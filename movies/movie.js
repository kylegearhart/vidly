const { genreSchema } = require('../genres/genre')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

Movie = mongoose.model('Movie', {
  title: { type: String, minlength: 5, maxlength: 50, required: true },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, min: 0, max: 50, required: true },
  dailyRentalRate: { type: Number, min: 1, max: 50, required: true },
})

validateAsMovie = (movie) => {
  const validationSchema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(1).max(50).required(),
  })

  return validationSchema.validate(movie)
}

module.exports = { Movie, validateAsMovie }