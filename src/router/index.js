import Vue from 'vue'
import Router from 'vue-router'
import * as _ from 'lodash'
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
    name: 'login',
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
    name: 'dashboard',
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

export const route001 = [
  {
    path: '/entityManagement',
    component: Layout,
    name: 'entityManagement',
    redirect: '/entityManagement/index',
    meta: { title: '实体管理', icon: 'entity', roles: ['admin'] },
    level: 1,
    children: [
      {
        path: 'index',
        name: 'entityManagementIndex',
        component: () => import('@/views/entityManagement/index.vue'),
        hidden: false,
        meta: { title: '实体管理', icon: '' }
      }
    ]
  },
  {
    path: '/articleWrite',
    component: Layout,
    level: 3,
    name: 'articleWrite',
    redirect: '/articleWrite/index',
    meta: { title: '文章写作', icon: 'article-write' },
    children: [
      {
        path: 'index',
        name: 'articleWriteIndex',
        component: () => import('@/views/articleWrite/index.vue'),
        hidden: false,
        meta: { title: '文章写作页', icon: '', fullScreen: true }
      }
    ]
  },
  {
    path: '/articleDetails',
    component: Layout,
    name: 'articleDetails',
    redirect: '/articleDetails/index',
    hidden: true,
    level: 4,
    meta: { title: '文章详情', icon: '' },
    children: [
      {
        path: 'index/:artId',
        name: 'articleDetailsIndex',
        component: () => import('@/views/articleDetails/index.vue'),
        hidden: true,
        meta: { title: '文章详细页', icon: '' }
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true, level: 100 }
]

export function generateAsyncRouters(menus) {
  const generateRouters = [];
  _.forEach(menus, menu => {
    if (menu.parentId === '0') {
      const route = {
        path: '/' + menu.url,
        component: Layout,
        category: menu.category,
        name: menu.name,
        url: menu.url,
        meta: { title: menu.name, icon: 'article-list', objectId: menu.objectId },
        hidden: false,
        level: 2,
        children: getChildrenRouters(menus, menu.url, menu.objectId)
      }
      generateRouters.push(route)
    }
  })
  return generateRouters
}

function getChildrenRouters(menus, parentUrl, parentObjectId) {
  const childrenRoutes = [];
  const childrens = _.filter(menus, function(item) {
    if (item.parentId === parentObjectId) {
      const route = {
        path: `/${parentUrl}/:category`,
        name: item.name,
        url: item.url,
        category: item.category,
        component: () => import('@/views/articleList/index.vue'),
        hidden: false,
        meta: { title: item.name, icon: '', objectId: item.objectId },
        children: getChildrenRouters(menus, item.url, item.objectId)
      };
      childrenRoutes.push(route)
    }
    return item.parentId === parentObjectId
  });
  if (childrens.length) {
    _.forEach(childrens, item => {
      getChildrenRouters(menus, item.url, item.categoryId)
    })
  }
  return childrenRoutes
}

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

