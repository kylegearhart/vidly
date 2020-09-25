const mongoose = require('mongoose')

function validateObjectIdMiddleware(request, response, next) {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(404).send('Invalid genre ID.')
  }
  next()
}

module.exports = validateObjectIdMiddleware