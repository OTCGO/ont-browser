const mongoose = require('mongoose')

const baseSchema = {
  TxHash: String, // TxHash
  State: Number,  // State
  GasConsumed: Number,  // GasConsumed
  Notify: [{
    ContractAddress: String, // ContractAddress
    States: [] // States
  }],  //  Header
  Height: Number, // Height
  Timestamp: Number
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'transaction',
  strict: false,
  read: 'secondaryPreferred'
})

module.exports = schema
