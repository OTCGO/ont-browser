
const graphql = require('graphql')
const Transaction = require('../../models/transaction')
const queryBuilder = require('../../../utils/queryBuilder')
const argsBuilder = require('../../../utils/argsBuilder')
const pageQuery = require('../../../utils/pageQuery')
const log4js = require('../../../runtime/log')
const db = require('../../../runtime/db')

const logger = log4js.getLogger()

module.exports = {
  TransactionQuery: {
    type: new graphql.GraphQLNonNull(new graphql.GraphQLObjectType({
      name: 'TransactionQuery',
      fields: {
        count: {
          type: graphql.GraphQLInt
        },
        rows: {
          type: new graphql.GraphQLList(Transaction)
        }
      }
    })),
    args: argsBuilder({
      _id: {
        type: graphql.GraphQLString
      },
      address: {
        type: graphql.GraphQLString
      },
      type: {
        type: graphql.GraphQLString
      },
      height: {
        type: graphql.GraphQLInt
      }
    }),
    async resolve (root, args) {
      logger.info('graphql search TransactionQuery')
      if (args.type) {
        args['Notify.States'] = args.type
        delete args.type
      }

      if (args.address) {
        args['Notify.States'] = args.address
        delete args.address
      }
      return pageQuery(args.skip, args.limit, db.transaction, '', queryBuilder({}, args), {'Header.Height': 'desc'})
    }
  }
}
