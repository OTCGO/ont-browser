const mongoose = require('mongoose')
const fs = require('fs')
const config = require('config')
const log4js = require('./log')
const path = require('path')
// const bluebird = require('bluebird')

// mongoose.Promise = bluebird

mongoose.set('debug', config.db.debug)

const logger = log4js.getLogger()

const connectionStr = `mongodb://${config.db.options.host}/${config.db.database}`
let option = {
  user: config.db.options.user,
  pass: config.db.options.pass,
  // server: {
  //   readPreference: 'nearest',
  //   strategy: 'ping'
  // },
  // replset: config.db.options.replset,
  useNewUrlParser: true
}

const dbConnection = mongoose.createConnection(connectionStr, option)
mongoose.connection.on('error', (err) => {
  logger.error('mongodb connect error:' + err)
})

logger.info('mongodb connection: ' + connectionStr)

let modelsPath = path.join(process.cwd(), '/models')

let models = fs.readdirSync(modelsPath)

let db = {}

for (let model of models) {
  if (model.startsWith('.')) {
    continue
  }
  let modelName = model.match(/^[^.]+/)[0]
  let modelSchema = require(path.join(modelsPath, model))
  db[ modelName ] = dbConnection.model(modelName, modelSchema)
}

module.exports = db
