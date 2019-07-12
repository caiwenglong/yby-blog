'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  DEBUG_ENABLE: true,   // 调试模式
  BASE_API: '"http://120.79.86.209:7300/mock/5cc5151559a6000a183033db/share-template"', // sit环境配置
})
