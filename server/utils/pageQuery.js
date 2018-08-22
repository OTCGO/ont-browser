/**
 * Filename: /Users/wei/Desktop/yedian/APAC_Yedian_Campaign/utils/pageQuery.js
 * Path: /Users/wei/Desktop/yedian/APAC_Yedian_Campaign
 * Created Date: Monday, November 27th 2017, 2:50:45 pm
 * Author: qknow
 *
 * Copyright (c) 2017 Your Company
 */

const async = require('async')

module.exports = function (skip = 0, limit = 20, Model, populate = {}, queryParams = {}, sortParams = {createdAt: 'desc'}) {
  return new Promise((resolve, reject) => {
    const $page = {
      rows: [],
      count: 0
    }
    async.parallel({
      count (done) {  // 查询数量
        Model.count(queryParams).exec(function (err, count) {
          done(err, count)
        })
      },
      records (done) {   // 查询一页的记录
        Model.find(queryParams).skip(skip).limit(limit).populate(populate).sort(sortParams).exec(function (err, doc) {
          done(err, doc)
        })
      }
    }, function (err, results) {
      if (err) return reject(err)
      $page.count = results.count
      $page.rows = results.records
      console.log('$page', $page)
      return resolve($page)
    })
  })
}
