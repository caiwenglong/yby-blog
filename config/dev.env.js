'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://120.79.86.209:7300/mock/5cc5151559a6000a183033db/share-template"', // 开发, 示例：mock后端
})
