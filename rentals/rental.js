const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

Rental = mongoose.model('Rental', {
  customer: {
    type: mongoose.Schema({
      isGold: { type: Boolean, required: true },
      name: { type: String, minlength: 5, maxlength: 50, required: true },
      phone: { type: String, minlength: 5, maxlength: 50, required: true },
    }),
    required: true,
  },
  movie: {
    type: mongoose.Schema({
      title: { type: String, minlength: 5, maxlength: 50, required: true },
      dailyRentalRate: { type: Number, min: 1, max: 50, required: true },
    }),
    required: true,
  },
  dateRented: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
})

validateAsRental = (movie) => {
  const validationSchema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  })

  return validationSchema.validate(movie)
}

module.exports = { Rental, validateAsRental }