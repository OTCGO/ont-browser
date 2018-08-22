const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const cors = require('cors')
const methodOverride = require('method-override')
const APIOutputMiddleware = require('./middlewares/APIOutputMiddleware')
const app = express()

const graphqlHTTP = require('express-graphql')
const graphQLSchema = require('./graphql/schema')

var maskErrors = require('graphql-errors').maskErrors

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
// 中间件，记录所有请求
// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}))
// 此中间件可以模拟PUT、DELETE等http操作（express4.x中已经不再集成，如果将express升级到4.x需要安装并手动引入）
app.use(methodOverride())

// root /
app.get('/', function (req, res) {
  return res.send({
    'name': 'ont api',
    'started': new Date()
  })
})

app.use(APIOutputMiddleware)

maskErrors(graphQLSchema)

app.use('/public/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true,
  pretty: true,
  extensions ({ documet, variables, operationName, result }) {
    if (result.errors) {
      result.error_code = 500
      result.error_msg = result.errors[0].message
      delete result.errors
      result.status = 'Error'
    } else {
      result.code = 200
      result.status = 'OK'
      result.server_time = Date.parse(new Date())
    }
  }
}))

module.exports = app
