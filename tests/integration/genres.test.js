const request = require('supertest')
const { Genre } = require('../../genres/genre')
const { User } = require('../../users/user')

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

  describe('POST /', () => {
    let genreName;
    let authToken;

    beforeEach(() => {
      genreName = 'validGenreName'
      authToken = new User({ isAdmin: true }).generateAuthToken()
    })

    async function makePost() {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', authToken)
        .send({ name: genreName })
    }

    it('saves the genre if it is valid', async () => {
      const response = await makePost()

      expect(response.status).toEqual(200)
      const savedGenre = Genre.find({ name: 'validGenreName' })
      expect(savedGenre).not.toBeNull()
    })

    it('returns the saved genre if it is valid', async () => {
      const response = await makePost()

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'validGenreName')
    })

    it('should return a 401 if client is not logged in', async () => {
      authToken = ''

      const response = await makePost()

      expect(response.status).toEqual(401)
    })

    it('should return a 400 if genre is less than 5 characters', async () => {
      genreName = new Array(5).join('a')

      const response = await makePost()

      expect(response.status).toEqual(400)
    })

    it('should return a 400 if genre is more than 50 characters', async () => {
      genreName = new Array(52).join('a')

      const response = await makePost()

      expect(response.status).toEqual(400)
    })
  })
})