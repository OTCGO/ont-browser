const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'transaction',
  description: 'This is a transaction',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    TxHash: {
      type: graphql.GraphQLString
    },
    State: {
      type: graphql.GraphQLInt
    },
    GasConsumed: {
      type: graphql.GraphQLInt
    },
    Notify: {
      type: new graphql.GraphQLList(new graphql.GraphQLObjectType({
        name: 'Notify',
        description: 'This is a Notify',
        fields: {
          ContractAddress: {
            type: graphql.GraphQLString
          },
          States: {
            type: new graphql.GraphQLList(graphql.GraphQLString)
          }
        }
      }))
    },
    Height: {
      type: graphql.GraphQLInt
    },
    Timestamp: {
      type: graphql.GraphQLInt
    }
  }
})
