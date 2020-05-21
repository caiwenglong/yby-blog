import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from sessionStorage
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // whitelist page

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  // 框架默认尝试从sessionStorage取出token作为用户登录状态判断，应用需要结合实际情况重构登录判断逻辑
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      // 框架默认登录后首页为：dashboard，应用需要结合实际情况重构登录判断逻辑
      next({ path: '/home' });
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else if (!store.getters.dynamicRouters) { // 判断用户是否已完成动态菜单处理
      store.dispatch('GetInfo').then(res => { // 拉取user_info
        store.dispatch('GenerateRoutes', {roles:store.getters.roles, userId: store.getters.userObjectId}).then(() => {
          // router.addRoutes(store.getters.dynamicRouters) // 动态添加可访问路由表
          next({ ...to, replace: true });
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          NProgress.done()
        })
      }).catch((err) => {
        console.log(err);
        store.dispatch('LogOut').then(() => {
          next({ path: '/' })
        })
      })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login');// 否则全部重定向到首页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
});
