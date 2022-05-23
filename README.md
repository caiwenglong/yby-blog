share-template指南
===

安装、开发与访问
---
安装: ```npm install```

启动开发模式: ```npm run dev```

访问地址: http://localhost:9528/#/login


生产打包
---
打包：```npm run build```

项目详细说明
---


share-template是一个基于开源项目[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)开发的一个WEB端开发框架。

share-template的技术栈基于 ES2015+、vue、vuex、vue-router 、axios 、echarts 和 element-ui，所有的请求数据都使用[easy-mock](https://www.easy-mock.com/login)模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

本框架使用 element-ui@2.3.0+ 版本，最低兼容 vue@2.5.0+，默认集成[polyfill](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)，如需兼容低版本ie，强烈建议进行完全测试。

本框架目前的功能：

- Element-UI组件库集成

- 登录/注销

- 路由配置

- 权限验证
    - 路由权限
    - 网页资源权限
- Svg图标

- 多环境发布
    - dev环境
    - prod环境

- 后端mock数据

- Eslint

- 状态管理

- 错误处理

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 自适应收缩侧边栏

项目结构
---

├── build                      // 构建相关<br>
├── config                     // 配置相关<br>
├── src                        // 源代码<br>
│   ├── api                    // 所有请求<br>
│   ├── assets                 // 主题 字体等静态资源<br>
│   ├── components             // 全局公用组件<br>
│   ├── icons                  // 项目所有 svg icons<br>
│   ├── router                 // 路由<br>
│   ├── store                  // 全局 store管理<br>
│   ├── styles                 // 全局样式<br>
│   ├── utils                  // 全局公用方法<br>
│   ├── views                  // views 所有页面<br>
│   ├── App.vue                // 入口页面<br>
│   ├── main.js                // 入口文件 加载组件 初始化等<br>
│   └── permission.js          // 权限管理<br>
├── static                     // 其他不打包资源<br>
├── .babelrc                   // babel-loader 配置<br>
├── .eslintrc.js               // eslint 配置项<br>
├── .gitignore                 // git 忽略项<br>
├── .travis.yml                // 自动化CI配置<br>
├── favicon.ico                // favicon图标<br>
├── index.html                 // html模板<br>
└── package.json               // package.json<br>

关于跨域
---
开发阶段的跨域问题，可以通过webpack-dev-server的proxyTable解决，配置文件为：config/index.js
13250990867
