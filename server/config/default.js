module.exports = {
  app: {
    port: process.env.PORT
  },
  log: {
    level: 'TRACE'
  },
  db: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true
    },
    database: process.env.MONGO_DATABASE,
    debug: process.env.MONGO_DEBUG
  }
}
