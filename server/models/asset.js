const mongoose = require('mongoose')

const baseSchema = {
  ContractAddress: String, // ContractAddress
  Height: Number // Height
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'asset',
  strict: false,
  read: 'secondaryPreferred'
})

module.exports = schema
