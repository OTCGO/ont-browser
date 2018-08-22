const graphql = require('graphql')

module.exports = new graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to handle stuff',
  fields: {
    test: {
      type: graphql.GraphQLString,
      resolve (root, args) {
        return 'hello world'
      }
    }
  }
})
