const jwt = require('jsonwebtoken')
const config = require('config')

function jwtValidationMiddleware(request, response, next) {
  const token = request.header('x-auth-token')
  if (!token) return response.status(401).send('Access denied. No token provided.')

  try {
    request.user = jwt.verify(token, config.get('jwtPrivateKey'))
    next()
  } catch (exception) {
    response.status(401).send('Invalid token.')
  }

}

module.exports = jwtValidationMiddleware