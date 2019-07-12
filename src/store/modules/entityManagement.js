import {
  getEntityListAll,
  getEntityList,
  addEntityInfo,
  modEntityInfo,
  delEntityInfo,
  getEntityInfo
} from '@/api/entityManagement'

const entityManagement = {
  state: {
    entityListAll: null,
    entityList: null,
    entityInfo: null
  },
  mutations: {
    SET_ENTITY_LIST_ALL: (state, entityListAll) => {
      state.entityListAll = entityListAll
    },
    SET_ENTITY_LIST: (state, entityList) => {
      state.entityList = entityList
    },
    SET_ENTITY_INFO: (state, entityInfo) => {
      state.entityInfo = entityInfo
    }
  },
  actions: {
    // 获取实体列表（下拉用）
    async GetEntityListAll({ commit }) {
      const result = await getEntityListAll()
      commit('SET_ENTITY_LIST_ALL', result)
    },
    // 获取实体列表
    async GetEntityList({ commit }, form) {
      const result = await getEntityList(form)
      commit('SET_ENTITY_LIST', result)
    },
    // 获取实体详情
    async GetEntityInfo({ commit }, form) {
      const result = await getEntityInfo(form)
      commit('SET_ENTITY_INFO', result)
    },
    // 新增实体信息
    async AddEntityInfo({ commit }, form) {
      await addEntityInfo(form)
    },
    // 修改实体信息
    async ModEntityInfo({ commit }, form) {
      await modEntityInfo(form)
    },
    // 删除实体信息
    async DelEntityInfo({ commit }, ids) {
      await delEntityInfo(ids)
    }
  }
}

export default entityManagement
