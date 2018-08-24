const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'address',
  description: 'This is a address',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    Address: {
      type: graphql.GraphQLString
    },
    Height: {
      type: graphql.GraphQLInt
    }
  }
})
