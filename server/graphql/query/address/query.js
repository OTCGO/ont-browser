
const graphql = require('graphql')
const Address = require('../../models/address')
const queryBuilder = require('../../../utils/queryBuilder')
const argsBuilder = require('../../../utils/argsBuilder')
const pageQuery = require('../../../utils/pageQuery')
const log4js = require('../../../runtime/log')
const db = require('../../../runtime/db')

const logger = log4js.getLogger()

module.exports = {
  AddressQuery: {
    type: new graphql.GraphQLNonNull(new graphql.GraphQLObjectType({
      name: 'AddressQuery',
      fields: {
        count: {
          type: graphql.GraphQLInt
        },
        rows: {
          type: new graphql.GraphQLList(Address)
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
      logger.info('graphql search AddressQuery')
      return pageQuery(args.skip, args.limit, db.address, '', queryBuilder({}, args), {'Header.Height': 'desc'})
    }
  }
}
