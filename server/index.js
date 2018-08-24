require('dotenv').config()

const server = require('./app')
const log4js = require('./runtime/log')
const config = require('config')
const APP_ROOT = config.get('app.port') || 3000

const logger = log4js.getLogger()
server.listen(APP_ROOT, () => {
  logger.info(`server is listening on port ${APP_ROOT}`)
})
