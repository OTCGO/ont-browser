const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'block',
  description: 'This is a block',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    Hash: {
      type: graphql.GraphQLString
    },
    Size: {
      type: graphql.GraphQLString
    },
    Header: {
      type: new graphql.GraphQLObjectType({
        name: 'Header',
        description: 'This is a Header',
        fields: {
          Version: {
            type: graphql.GraphQLInt
          },
          PrevBlockHash: {
            type: graphql.GraphQLString
          },
          TransactionsRoot: {
            type: graphql.GraphQLString
          },
          BlockRoot: {
            type: graphql.GraphQLString
          },
          Timestamp: {
            type: graphql.GraphQLInt
          },
          Height: {
            type: graphql.GraphQLString
          },
          ConsensusData: {
            type: graphql.GraphQLString
          },
          ConsensusPayload: {
            type: graphql.GraphQLString
          },
          NextBookkeeper: {
            type: graphql.GraphQLString
          },
          Bookkeepers: {
            type: new graphql.GraphQLList(graphql.GraphQLString)
          },
          SigData: {
            type: new graphql.GraphQLList(graphql.GraphQLString)
          },
          Hash: {
            type: graphql.GraphQLString
          }
        }
      })
    },
    TransactionCount: {
      type: graphql.GraphQLInt,
      async resolve (block) {
        console.log(block.Transactions)
        return block.Transactions.length
      }
    }
  }
})
