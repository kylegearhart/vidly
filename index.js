const logger = require('debug')('app:startup')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.listen(
  port,
  () => {
    logger(`Vidly launched and listening on port ${port}.`)
  },
)

const genres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
]

app.get('/api/genres', (request, response) => {
  response.send(genres)
})
