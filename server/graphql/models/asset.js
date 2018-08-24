const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'asset',
  description: 'This is a asset',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    ContractAddress: {
      type: graphql.GraphQLString
    },
    Height: {
      type: graphql.GraphQLInt
    }
  }
})
