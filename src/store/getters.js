const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  userObjectId: state => state.user.objectId,
  userData: state => state.user.userData,
  accountNo: state => state.user.accountNo,
  entityId: state => state.user.entityId,
  userType: state => state.user.userType,
  admin: state => state.user.admin,
  // 所有菜单
  permission_routers: state => state.permission.routers,
  // 动态菜单
  dynamicRouters: state => state.permission.dynamicRouters,
  // 网页资源清单
  webResMap: state => state.permission.webResMap,

  // 实体维护
  entityListAll: state => state.entityManagement.entityListAll,
  entityList: state => state.entityManagement.entityList,
  entityInfo: state => state.entityManagement.entityInfo,

  // 文章内容
  entityArticleList: state => state.entityArticle.entityArticleList,
  entityArticleDetails: state => state.entityArticle.entityArticleDetails,

  // 所有的文章分类
  articleCategoryList: state => state.articleCategory.articleCategoryList,
  // 所有的文章分类
  collectionCategoryList: state => state.articleCategory.collectionCategoryList
};

export default getters
