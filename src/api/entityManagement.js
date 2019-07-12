import request from '@/utils/request'
import Vue from 'vue'

// 获取实体列表(下拉列表)
export function getEntityListAll() {
  return request({
    url: '/entity/query',
    method: 'POST',
    data: {
      pageSize: Vue.prototype.MaxSize,
      pageNum: 1
    }
  })
}

// 获取实体列表
export function getEntityList(form) {
  return request({
    url: '/entity/query',
    method: 'POST',
    data: {
      ...form
    }
  })
}

// 获取实体详情
export function getEntityInfo(entityId) {
  return request({
    url: '/entity/get',
    method: 'GET',
    params: {
      entityId
    }
  })
}

// 新增实体信息
export function addEntityInfo(entityForm) {
  return request({
    url: '/entity/add',
    method: 'POST',
    data: {
      ...entityForm
    }
  })
}

// 修改实体信息
export function modEntityInfo(entityForm) {
  return request({
    url: '/entity/mod',
    method: 'POST',
    data: {
      ...entityForm
    }
  })
}

// 删除实体信息
export function delEntityInfo(entityIds) {
  return request({
    url: '/entity/del?entityIds=' + entityIds,
    method: 'POST'
  })
}
