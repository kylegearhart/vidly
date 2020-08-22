const mongoose = require('mongoose')
const { Customer } = require('./customer')

function add(newCustomer) {
  const customerToAdd = new Customer({
    isGold: newCustomer.isGold,
    name: newCustomer.name,
    phone: newCustomer.phone,
  })

  return customerToAdd.save()
}

function getAll() {
  return Customer.find({}).sort('name').select({ name: 1, isGold: 1, phone: 1 })
}

function customerForId(idAsString) {
  return Customer.findById(mongoose.Types.ObjectId(idAsString))
}

function deleteCustomerWithId(idAsString) {
  return Customer.findByIdAndRemove(mongoose.Types.ObjectId(idAsString))
}

function updateCustomerWithId(idAsString, customerProperties) {
  return Customer.findByIdAndUpdate(
    mongoose.Types.ObjectId(idAsString),
    customerProperties,
    { new: true },
  )
}

module.exports = { add, getAll, customerForId, deleteCustomerWithId, updateCustomerWithId }

