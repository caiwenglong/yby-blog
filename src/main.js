import 'babel-polyfill' // IE9兼容
import 'es6-promise/auto' // IE9兼容
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Bmob from 'hydrogen-js-sdk'
Vue.prototype.Bmob = Bmob
Bmob.initialize('e4d31451776823a5', '566210')

Vue.use(mavonEditor)
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)

Vue.prototype.MaxSize = 500
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.directive('grant', {
  bind: function(el, binding) {
    if (!store.getters.webResMap[binding.value]) {
      el.style.display = 'none'
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
