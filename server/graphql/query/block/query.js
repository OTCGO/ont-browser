
const graphql = require('graphql')
const Block = require('../../models/block')
const queryBuilder = require('../../../utils/queryBuilder')
const argsBuilder = require('../../../utils/argsBuilder')
const pageQuery = require('../../../utils/pageQuery')
const log4js = require('../../../runtime/log')
const db = require('../../../runtime/db')

const logger = log4js.getLogger()

module.exports = {
  BlcokQuery: {
    type: new graphql.GraphQLNonNull(new graphql.GraphQLObjectType({
      name: 'BlcokQuery',
      fields: {
        count: {
          type: graphql.GraphQLInt
        },
        rows: {
          type: new graphql.GraphQLList(Block)
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
      logger.info('graphql search BlcokQuery')
      if (args.height) {
        args['Header.Height'] = args.height
        delete args.height
      }
      return pageQuery(args.skip, args.limit, db.block, '', queryBuilder({}, args), {'Header.Height': 'desc'})
    }
  }
}
