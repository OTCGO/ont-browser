module.exports = {
  app: {
    port: 5000
  },
  log: {
    level: 'TRACE'
  },
  db: {
    options: {
      host: '127.0.0.1',
      port: 27017,
      user: '',
      pass: ''
    },
    database: 'testnet-ont',
    debug: true
  }
}
