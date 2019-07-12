import request from '@/utils/request'

export function login(loginForm) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      ...loginForm
    }
  })
}

export function getInfo(userId) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: {
      userId
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
