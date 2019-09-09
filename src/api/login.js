import request from '@/utils/request'
import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '666666')
// 登录
export function login(userInfo = {}) {
  return new Promise(function(resolve, reject) {
    Bmob.User.login(userInfo.accountNo, userInfo.password).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
    })
    // Bmob.User.logIn(userInfo.username, userInfo.password, {
    //   success: function(user) {
    //     if (!user.get('emailVerified')) {
    //       resolve({ 'code': '001', 'email': user.get('email') })
    //       return
    //     }
    //     resolve({ 'code': '000', 'avatar': user.get('avatar'), 'userId': user.id })
    //   },
    //   error: function(user, error) {
    //     reject(error)
    //   }
    // })
  })
}

// export function login(loginForm) {
//   return request({
//     url: '/login',
//     method: 'POST',
//     data: {
//       ...loginForm
//     }
//   })
// }

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
