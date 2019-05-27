const joi = require('joi')
const Exception = require('../libs/exception')

module.exports = function GetMiddleware (schema) {
  return (req, res, next) => {
    let result = {}
    if (schema.body) {
      result = joi.validate(req.body, schema.body)
      if (result.error) {
        return res.apiError(new Exception(2001, result.error.message))
      }
    }
    if (schema.params) {
      result = joi.validate(req.params, schema.params)
      if (result.error) {
        return res.apiError(new Exception(2001, result.error.message))
      }
    }
    if (schema.query) {
      result = joi.validate(req.query, schema.query)
      if (result.error) {
        return res.apiError(new Exception(2001, result.error.message))
      }
    }
    if (schema.header) {
      result = joi.validate(req.headers, schema.header, { allowUnknown: true })
      if (result.error) {
        return res.apiError(new Exception(2001, result.error.message))
      }
    }
    next()
  }
}
