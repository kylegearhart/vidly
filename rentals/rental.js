const mongoose = require('mongoose')
const Joi = require('joi')

Rental = mongoose.model('Rental', {
  movieId: { type: String, min: 5, max: 50, required: true },
  numberOfDays: { type: Number, min: 1, max: 50, required: true },
})

validateAsRental = (movie) => {
  const validationSchema = Joi.object({
    movieId: Joi.string().min(5).max(50).required(),
    numberOfDays: Joi.number().min(1).max(50).required(),
  })

  return validationSchema.validate(movie)
}

module.exports = { Rental, validateAsRental }