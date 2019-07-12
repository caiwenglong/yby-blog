import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import LayoutSimple from '@/views/layoutSimple/LayoutSimple'
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: 'login',
    component: LayoutSimple,
    hidden: true,
    meta: { title: '登录' },
    name: 'homepage'
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    name: '0',
    redirect: '/dashboard/page',
    children: [
      {
        path: 'page',
        name: 'page',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/entityManagement',
    component: Layout,
    name: 'entityManagement',
    redirect: '/entityManagement/index',
    meta: { title: '实体管理', icon: 'entity', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'entityManagementIndex',
        component: () => import('@/views/entityManagement/index.vue'),
        hidden: false,
        meta: { title: '实体管理', icon: '' }
      },
      {
        path: 'test001',
        name: 'test001',
        component: () => import('@/views/entityManagement/index.vue'),
        hidden: false,
        meta: { title: 'test001', icon: '' },
        children: [
          {
            path: 'test002',
            name: 'test002',
            component: () => import('@/views/entityManagement/index.vue'),
            hidden: false,
            meta: { title: 'test002', icon: '' },
            children: [
              {
                path: 'test003',
                name: 'test003',
                component: () => import('@/views/entityManagement/index.vue'),
                hidden: false,
                meta: { title: 'test003', icon: '' },
                children: [
                  {
                    path: 'test004',
                    name: 'test004',
                    component: () => import('@/views/entityManagement/index.vue'),
                    hidden: false,
                    meta: { title: 'test004', icon: '' },
                    children: [
                      {
                        path: 'test005',
                        name: 'test005',
                        component: () => import('@/views/entityManagement/index.vue'),
                        hidden: false,
                        meta: { title: 'test005', icon: '' }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
