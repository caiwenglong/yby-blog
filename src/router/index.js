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
  {
    path: '/home',
    component: Layout,
    name: 'home',
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/articleWrite',
    component: Layout,
    level: 3,
    name: 'articleWrite',
    redirect: '/articleWrite/index',
    hidden: true,
    meta: { title: '文章写作', icon: 'article-write' },
    children: [
      {
        path: 'index',
        name: 'articleWriteIndex',
        component: () => import('@/views/articleWrite/index.vue'),
        meta: { title: '文章写作页', icon: '', fullScreen: true }
      }
    ]
  },
  { path: '*', component: () => import('@/views/404'), hidden: true },
];

export const dynamicRoute = [
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
];

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
      };
      generateRouters.push(route)
    }
  });
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

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

/*
*  在添加分类的时候，先清空现有的路由，然后在addRoutes新生成的路由，否则在生成路由时会报
*  Duplicate named routes definition的警告
* */
router.selfAddRoutes = function (params){
  router.matcher = new Router().matcher;
  router.addRoutes(params)
};

export default router

