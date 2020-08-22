const mongoose = require('mongoose')
const Joi = require('joi')

Movie = mongoose.model('Movie', {
  title: { type: String, minlength: 5, maxlength: 50, required: true },
  genre: {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, minlength: 5, maxlength: 50, required: true },
    required: true,
  },
  numberInStock: { type: Number, min: 0, max: 50, required: true },
  dailyRentalRate: { type: Number, min: 1, max: 50, required: true },
})

validateAsMovie = (movie) => {
  const genreSubdocumentSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(5).max(5).required(),
  })
  const validationSchema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.isSchema(genreSubdocumentSchema).required(),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(1).max(50).required(),
  })

  return validationSchema.validate(movie)
}

module.exports = { Movie, validateAsMovie }