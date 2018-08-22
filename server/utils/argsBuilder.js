const graphql = require('graphql')

module.exports = (args) => {
  let defaultArgs = {
    _id: {
      type: graphql.GraphQLString
    },
    limit: {
      type: graphql.GraphQLInt,
      defaultValue: 10
    },
    skip: {
      type: graphql.GraphQLInt,
      defaultValue: 0
    },
    sort: {
      type: graphql.GraphQLString
    }
  }

  return Object.assign(defaultArgs, args)
}
