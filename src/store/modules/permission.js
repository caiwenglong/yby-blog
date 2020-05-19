import { dynamicRoute, constantRouterMap, selfAddRoutes } from '@/router'
import router from '@/router'
import { apiGetArticleCategory } from '../../api/articleCategory'
import { generateAsyncRouters } from '../../router'
import * as _ from 'lodash'
/**
 * 示例：通过meta.role判断是否与当前用户权限匹配
 * 提示：可以通过重写该方法完成业务自定义的权限控制逻辑
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  let accessedRouters = []
  accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    dynamicRouters: null,
    webResMap: {}
  },
  mutations: {
    // 菜单权限控制-动态菜单
    SET_ROUTERS: (state, routers) => {
      state.dynamicRouters = routers;
      state.routers = constantRouterMap.concat(routers); // permission_routers
      router.selfAddRoutes(state.routers);
    },
    // 网页资源权限控制使用
    SET_WEB_RES_MAP: (state, webResMap) => {
      state.webResMap = webResMap
    }
  },
  actions: {
    async GenerateRoutes({ commit }, params) {
      return new Promise(resolve => {
        let routes = [];
        apiGetArticleCategory(params.userId).then(categoryList => {
          const menus = categoryList;
          if (menus.length) {
            routes = generateAsyncRouters(menus);
            routes = _.concat(routes, dynamicRoute);
            routes = _.sortBy(routes, function(o) {
              return -o.createdAt
            })
          }
          let accessedRoutes;
          if (params.roles.includes('admin')) {
            accessedRoutes = routes || []
          } else {
            accessedRoutes = filterAsyncRouter(routes, params.roles)
          }
          commit('SET_ROUTERS', accessedRoutes);
          resolve(accessedRoutes)
        })
      })
    }
  }
};

export default permission
