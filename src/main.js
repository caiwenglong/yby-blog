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
import * as _ from 'lodash'
import { tools } from './utils/tools/index'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Bmob from 'hydrogen-js-sdk'
import GeminiScrollbar from 'vue-gemini-scrollbar'

import i18n from './i18n/i18n'

Vue.prototype.Bmob = Bmob
Vue.prototype._lodash = _
Bmob.initialize('e4d31451776823a5', '666666')
Vue.prototype._tools = tools

Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(GeminiScrollbar)
Vue.use(contentmenu)

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
window.app = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
