const request = require('supertest')
const { User } = require('../../users/user')
const { Genre } = require('../../genres/genre')

describe('jwtValidationMiddleware', () => {
  let server

  beforeEach(() => { server = require('../../index') })

  afterEach(async () => {
    await Genre.remove({})
    await server.close()
  })

  let authToken;
  let genreName;

  function postToGenres() {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', authToken)
      .send({ name: genreName })
  }

  beforeEach(() => {
    authToken = new User({ isAdmin: true }).generateAuthToken()
    genreName = 'validGenreName'
  })

  it('returns 200 if token is valid', async () => {
    const response = await postToGenres()

    expect(response.status).toEqual(200)
  })

  it('returns 401 if no token is provided', async () => {
    authToken = ''

    const response = await postToGenres()

    expect(response.status).toEqual(401)
  })

  it('returns 401 if token is invalid', async () => {
    authToken = 'a'

    const response = await postToGenres()

    expect(response.status).toEqual(401)
  })
})