// if (process.env.NODE_ENV === 'production') require('tingyun')
const server = require('./app')
const config = require('config')
const logger = require('./runtime/log').get('campaign')
const APP_ROOT = config.get('app.port') || 3000
server.listen(APP_ROOT, () => {
  logger.info(`server is listening on port ${APP_ROOT}`)
})
