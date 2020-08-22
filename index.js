const httpLogger = require('debug')('app:http')
const dbLogger = require('debug')('app:db')
const express = require('express')
const mongoose = require('mongoose')
const genres = require('./genres/genreController')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/api/genres', genres)

const mongoDBOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost/vidly', mongoDBOptions)
  .then(() => dbLogger('Successfully connected to MongoDB database called vidly on localhost'))
  .catch((error) => dbLogger('Failed to connect to vidly MongoDB database on localhost', error))

app.listen(
  port,
  () => {
    httpLogger(`Vidly launched and listening on port ${port}.`)
  },
)
