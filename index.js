const httpLogger = require('debug')('app:http')
const dbLogger = require('debug')('app:db')
const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./genres/genreController')
const customers = require('./customers/customerController')
const movies = require('./movies/movieController')
const rentals = require('./rentals/rentalController')
const users = require('./users/userController')
const auth = require('./auth/authController')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

const mongoDBOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/vidly', mongoDBOptions)
  .then(() => dbLogger('Successfully connected to MongoDB database called vidly on localhost'))
  .catch((error) => dbLogger('Failed to connect to vidly MongoDB database on localhost', error))

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1)
}

app.listen(
  port,
  () => {
    httpLogger(`Vidly launched and listening on port ${port}.`)
  },
)
