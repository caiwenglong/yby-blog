const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
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

  // 資源管理 webResMngr
  ResMngrResQuery: state => state.webResMngr.ResMngrResQuery,
  ResMngrResAll: state => state.webResMngr.ResMngrResAll,
  ResMngrResInfo: state => state.webResMngr.ResMngrResInfo,
  // 菜单管理
  ResMngrMenuQuery: state => state.webResMngr.ResMngrMenuQuery,
  ResMngrMenuAll: state => state.webResMngr.ResMngrMenuAll,
  ResMngrMenuInfo: state => state.webResMngr.ResMngrMenuInfo,

  // 角色维护, smart office
  roleAll: state => state.roleManagement.roleAll,
  roleInfo: state => state.roleManagement.roleInfo,
  roleList: state => state.roleManagement.roleList,

  // 权限维护, smart office
  permissionQueryList: state => state.permissionMngr.permissionQueryList,
  permissionQueryAll: state => state.permissionMngr.permissionQueryAll,

  // 授权管理, smart office
  postMngrRoleAllList: state => state.authManagement.postMngrRoleAllList,
  roleMngrPermission: state => state.authManagement.roleMngrPermission,
  webResAuthMenu: state => state.authManagement.webResAuthMenu,
  webResAuthRes: state => state.authManagement.webResAuthRes,
  userMngrPost: state => state.authManagement.userMngrPost,
  permissionMngrApi: state => state.authManagement.permissionMngrApi,

  // 岗位维护, smart office
  postInfo: state => state.postManagement.postInfo,
  postTable: state => state.postManagement.postTable,
  postTableAll: state => state.postManagement.postTableAll,
  postMngrEntityAllList: state => state.postManagement.postMngrEntityAllList,

  // 机构维护, smart office
  orgInfo: state => state.orgManagement.orgInfo,
  orgTable: state => state.orgManagement.orgTable,
  orgListAll: state => state.orgManagement.orgListAll,
  // 组织机构管理者
  orgLeaderTable: state => state.orgManagement.orgLeaderTable,

  // 外借人员机构维护, smart office
  loanedOrgInfo: state => state.loanedOrgManagement.loanedOrgInfo,
  loanedOrgTable: state => state.loanedOrgManagement.loanedOrgTable,
  loanedOrgListAll: state => state.loanedOrgManagement.loanedOrgListAll,

  // 用户维护, smart office
  userInfo: state => state.userManagement.userInfo,
  userTable: state => state.userManagement.userTable,
  userPcQuery: state => state.userManagement.userPcQuery,
  // 非金科用户
  corpUserList: state => state.userManagement.corpUserList,
  corpUserInfo: state => state.userManagement.corpUserInfo,
  // 根据岗位查询用户列表
  postUserList: state => state.userManagement.postUserList,

  // 服务维护, smart office
  serviceInfo: state => state.serviceManagement.serviceInfo,
  serviceTable: state => state.serviceManagement.serviceTable,
  serviceApiAll: state => state.serviceManagement.serviceApiAll,

  // 实体维护
  entityListAll: state => state.entityManagement.entityListAll,
  entityList: state => state.entityManagement.entityList,
  entityInfo: state => state.entityManagement.entityInfo,

  // 合作研发公司信息管理
  outSourceList: state => state.corpMngr.outSourceList,
  outSourceListAll: state => state.corpMngr.outSourceListAll,
  outSourceInfo: state => state.corpMngr.outSourceInfo,

  // 物业公司信息管理
  propertyList: state => state.corpMngr.propertyList,
  propertyListAll: state => state.corpMngr.propertyListAll,
  propertyInfo: state => state.corpMngr.propertyInfo,

  // 合作商户信息管理
  merchantList: state => state.corpMngr.merchantList,
  merchantListAll: state => state.corpMngr.merchantListAll,
  merchantInfo: state => state.corpMngr.merchantInfo,

  // 公共服务管理
  serviceMngrList: state => state.publicServiceManagement.serviceMngrList,
  serviceMngrAll: state => state.publicServiceManagement.serviceMngrAll,
  serviceMngrInfo: state => state.publicServiceManagement.serviceMngrInfo
}
export default getters
