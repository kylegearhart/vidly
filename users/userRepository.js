const { User } = require('./user')

function add(newUser) {
  const userToAdd = new User({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    isAdmin: newUser.isAdmin,
  })

  return userToAdd.save()
}

module.exports = { add }

