const mongoose = require('mongoose')
const customer = require('./customer')

function add(newCustomer) {
  const customerToAdd = new customer.Customer({
    isGold: newCustomer.isGold,
    name: newCustomer.name,
    phone: newCustomer.phone,
  })

  return customerToAdd.save()
}

function getAll() {
  return customer.Customer.find({}).sort('name').select({ name: 1, isGold: 1, phone: 1 })
}

function customerForId(idAsString) {
  return customer.Customer.findById(mongoose.Types.ObjectId(idAsString))
}

function deleteCustomerWithId(idAsString) {
  return customer.Customer.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

function updateCustomerWithId(idAsString, customerProperties) {
  return customer.Customer.findByIdAndUpdate(
    mongoose.Types.ObjectId(idAsString),
    customerProperties,
    { new: true },
  )
}

module.exports = { add, getAll, customerForId, deleteCustomerWithId, updateCustomerWithId }

