function APIOutputMiddleware (req, res, next) {
  // 相应api成功结果
  res.apiSuccess = (data, exData = {}) => {
    res.jsonp(Object.assign({
      status: 'OK',
      code: 200,
      data: data,
      server_time: Date.parse(new Date())
    }, exData))
  }
  // 相应api出错结果，err是一个Error对象
  res.apiError = (err) => {
    res.jsonp({
      status: 'Error',
      error_code: parseInt(err.code) || parseInt(err.error_code) || 500,
      error_msg: err.message || err.error_msg || err.toString() || 'Unknown Error',
      server_time: Date.parse(new Date())
    })
  }
  next()
}

module.exports = APIOutputMiddleware
