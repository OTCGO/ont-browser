const log4js = require('log4js')
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'dateFile',
      filename: './logs/ont-serve-api.log',
      pattern: 'yyyy-MM-dd-hh',
      compress: true }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'trace' }
  }
})

module.exports = log4js
