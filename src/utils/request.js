import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import route from '@/router'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=urf-8'
    config.headers['If-Modified-Since'] = 0; // 解决IE GET请求缓存的问题
    config.headers['X-Channel'] = 'WEB';// 用于上报访问渠道
    config.headers['X-Agent'] = window.navigator && window.navigator.userAgent // 用于上报客户端设备信息
    return config
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error)
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const code = response.status;
    // 拦截每个响应，取出token并更新本地
    if (code === 200) {
      if (response.headers && response.headers.authorization) {
        store
          .dispatch('SetToken', response.headers.authorization)
          .then(res => {})
      }
      // 后端框架保证：任何异常情况（包括业务异常）时，返回状态码均不为200
      // 业务操作正常
      return Promise.resolve(response.data)
    } else {
      // header字段被转换为纯小写
      if (response.headers && response.headers['x-error-code']) {
        // 出现业务错误
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error); // for debug
    const code = error.response.status;
    const errorMsg = error.response.data.msg || '服务器后台错误' // 错误信息
    // const errorCode = error.response.data.code  // 错误码
    // const errorDetail = error.response.data.detail // 错误详细信息
    if (code === 401) {
      // 未登录或登录过期，需要重新验证
      // 清理vuex的token状态和Cookies
      MessageBox.confirm(
        '您的登录已过期，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
          // 重定向到登录页面
          route.push({ path: '/login' })
        })
      })
    } else {
      Message({
        message: errorMsg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(error.response)
    }
  }
);

export default service
