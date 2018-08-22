const graphql = require('graphql')

let fs = require('fs')
let path = require('path')

let root = path.join(__dirname)
let fields = {}

readDirSync(root, fields)

function readDirSync (filePath, fields) {
  let pa = fs.readdirSync(filePath)
  for (let ele of pa) {
    let info = fs.statSync(filePath + '/' + ele)
    if (info.isDirectory()) {
      readDirSync(filePath + '/' + ele, fields)
    } else {
      if (ele === 'query.js') {
        let routerPath = path.join(filePath, ele)
        Object.assign(fields, require(routerPath))
      }
    }
  }
}

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: fields
})
