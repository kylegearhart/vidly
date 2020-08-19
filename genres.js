const express = require('express')
const router = express.Router()
const Joi = require('joi')

const genres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
]

router.post('/', (request, response) => {
  let validationResult = validateGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const newGenre = { id: genres.length + 1, name: request.body.name }
  genres.push(newGenre)

  return response.send(newGenre)
})

router.get('/', (request, response) => {
  response.send(genres)
})

router.get('/:id', (request, response) => {
  const genreId = parseInt(request.params.id)
  const genreWithId = genres.find((genre) => genre.id === genreId)

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  return response.send(genreWithId)
})

router.put('/:id', (request, response) => {
  let validationResult = validateGenre(request.body)
  if (validationResult.error) return response.status(400).send(validationResult.error.message)

  const genreId = parseInt(request.params.id)
  const genreWithId = genres.find((genre) => genre.id === genreId)

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  genreWithId.name = request.body.name

  return response.send(genreWithId)
})

router.delete('/:id', (request, response) => {
  const genreId = parseInt(request.params.id)
  const genreWithId = genres.find((genre) => genre.id === genreId)

  if (!genreWithId) return response.status(404).send('A genre with the given Id does not exist.')

  const genreIndex = genres.findIndex((genre) => genre.id === genreId)
  genres.splice(genreIndex, 1)

  return response.send(genreWithId)
})

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(2).required()
  })

  return genreSchema.validate(genre)
}

module.exports = router