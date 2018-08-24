
const graphql = require('graphql')
const log4js = require('../../../runtime/log')

const logger = log4js.getLogger()

module.exports = {
  BalanceQuery: {
    type: new graphql.GraphQLObjectType({
      name: 'BalanceQuery',
      description: 'This is a BalanceQuery',
      fields: {
        ont: {
          type: graphql.GraphQLString
        },
        ong: {
          type: new graphql.GraphQLList(graphql.GraphQLString) // 余额 未提取
        }
      }
    }),
    async resolve (root, args) {
      logger.info('graphql search BalanceQuery')
      return {
        ont: '1',
        ong: ['1', '2']
      }
    }
  }
}
