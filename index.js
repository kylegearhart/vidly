const logger = require('debug')('app:startup')
const express = require('express')
const genres = require('./genres')

const app = express()
app.use(express.json())
app.use('/api/genres', genres)
const port = process.env.PORT || 3000

app.listen(
  port,
  () => {
    logger(`Vidly launched and listening on port ${port}.`)
  },
)
