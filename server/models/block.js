const mongoose = require('mongoose')

const baseSchema = {
  Hash: String, // Hash
  Size: String,  // Size
  Header: {
    Version: Number,
    PrevBlockHash: String,
    TransactionsRoot: String,
    BlockRoot: String,
    Timestamp: Number,
    Height: Number,
    ConsensusData: String,
    ConsensusPayload: String,
    NextBookkeeper: String,
    Bookkeepers: [],
    SigData: [],
    Hash: String
  },  //  Header
  Transactions: [] // Transactions
}

const schema = new mongoose.Schema(baseSchema, {
  collection: 'block',
  strict: false,
  read: 'secondaryPreferred'
})

module.exports = schema
