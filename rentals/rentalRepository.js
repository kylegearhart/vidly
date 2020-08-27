const { Rental } = require('./rental')

function add(newRental) {
  const rentalToAdd = new Rental({
    movieId: newRental.movieId,
    numberOfDays: newRental.numberOfDays,
  })

  return rentalToAdd.save()
}

function getAll() {
  return Rental
    .find({})
    .select({
      _id: 0,
      movieId: 1, numberOfDays: 1,
    })
}

module.exports = { add, getAll }

