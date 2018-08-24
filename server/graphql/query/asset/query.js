
const graphql = require('graphql')
const Asset = require('../../models/asset')
const queryBuilder = require('../../../utils/queryBuilder')
const argsBuilder = require('../../../utils/argsBuilder')
const pageQuery = require('../../../utils/pageQuery')
const log4js = require('../../../runtime/log')
const db = require('../../../runtime/db')

const logger = log4js.getLogger()

module.exports = {
  AssetQuery: {
    type: new graphql.GraphQLNonNull(new graphql.GraphQLObjectType({
      name: 'AssetQuery',
      fields: {
        count: {
          type: graphql.GraphQLInt
        },
        rows: {
          type: new graphql.GraphQLList(Asset)
        }
      }
    })),
    args: argsBuilder({
      _id: {
        type: graphql.GraphQLString
      },
      height: {
        type: graphql.GraphQLInt
      }
    }),
    async resolve (root, args) {
      logger.info('graphql search AssetQuery')
      return pageQuery(args.skip, args.limit, db.asset, '', queryBuilder({}, args), {'Header.Height': 'desc'})
    }
  }
}
