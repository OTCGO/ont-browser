const mongoose = require('mongoose')

const baseSchema = {
  Address: String, // Address
  Height: Number // Height
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'address',
  strict: false,
  read: 'secondaryPreferred'
})

module.exports = schema
