const config = require('config')
const Redis = require('ioredis')
const log4js = require('log4js')
const logger = log4js.getLogger('redis')

let client = new Redis(config.redis)

client.on('error', function (err) {
  if (err) {
    logger.error('redis - connect to redis error, check your redis config', err)
    process.exit(1)
  }
})

client.on('connect', function () {
  logger.info('redis - connect to redis')
})

client.on('reconnecting', function () {
  logger.info('redis - reconnecting to redis')
})

client.on('close', function () {
  logger.info('redis - redis close')
})
exports = module.exports = client
