function allowOnlyAdminMiddleware(request, response, next) {
  if (!request.user.isAdmin) return response.status(403).send('Access denied.')
  next()
}

module.exports = allowOnlyAdminMiddleware