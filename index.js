const logger = require('debug')('app:startup')
const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())
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

app.post('/api/genres', (request, response) => {
  const genreSchema = Joi.object({
    name: Joi.string().min(2).required()
  })
  const validationResult = genreSchema.validate(request.body)

  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const newGenre = { id: genres.length + 1, name: request.body.name }
  genres.push(newGenre)

  return response.send(newGenre)
})

app.get('/api/genres', (request, response) => {
  response.send(genres)
})

app.get('/api/genres/:id', (request, response) => {
  const genreId = parseInt(request.params.id)
  const genreWithId = genres.find((genre) => genre.id === genreId)

  if (!genreWithId) return response.status(404).send(genreWithId)

  return response.send(genreWithId)
})
