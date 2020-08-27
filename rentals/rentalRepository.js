const { Rental } = require('./rental')

function add(newRental, associatedCustomer, associatedMovie) {
  const rentalToAdd = new Rental({
    customer: {
      _id: associatedCustomer.id,
      isGold: associatedCustomer.isGold,
      name: associatedCustomer.name,
      phone: associatedCustomer.phone,
    },
    movie: {
      _id: associatedMovie.id,
      title: associatedMovie.title,
      dailyRentalRate: associatedMovie.dailyRentalRate,
    },
  })

  return rentalToAdd.save()
}

function getAll() {
  return Rental
    .find({})
    .select({
      _id: 0,
      "customer.isGold": 1, "customer.name": 1, "customer.phone": 1,
      "movie.title": 1, "movie.dailyRentalRate": 1,
      dateRented: 1
    })
    .sort('-dateRented')
}

module.exports = { add, getAll }

