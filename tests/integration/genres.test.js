const request = require('supertest')
const { Genre } = require('../../genres/genre')

describe('api/genres', () => {
  let server

  beforeEach(() => {
    server = require('../../index')
  })

  afterEach(async () => {
    server.close()

    await Genre.remove({})
  })

  describe('GET /', () => {
    it('should return all genres', async () => {
      Genre.collection.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ])

      const response = await request(server).get('/api/genres')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(2)
      expect(response.body.some(g => g.name === 'genre1')).toBeTruthy()
      expect(response.body.some(g => g.name === 'genre2')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('returns the genre with the given ID if present in DB', async () => {
      const genre = new Genre({ name: 'genreName'})
      await genre.save();

      const response = await request(server).get(`/api/genres/${genre._id}`)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('name', genre.name)
    })

    it('returns a 404 if an invalid ID is given', async () => {
      const response = await request(server).get('/api/genres/1')

      expect(response.status).toEqual(404)
    })

    it('returns a 404 if a genre with given ID is not present', async () => {
      const genre = new Genre({ name: 'genreName'})

      const response = await request(server).get(`/api/genres/${genre._id}`)

      expect(response.status).toEqual(404)
    })
  })
})