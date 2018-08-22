const graphql = require('graphql')

const Query = require('./query')
const Mutation = require('./mutation')

module.exports = new graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
})
