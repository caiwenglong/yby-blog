import request from '@/utils/request'
import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '666666')


// 获取验证码
export function getSMSCode(tel) {
  return new Promise((resolve, reject) => {
    Bmob.requestSmsCode({ 'mobilePhoneNumber': tel }).then(function(obj) {
      alert('smsId:' + obj.smsId) //
    }, function(err) {
      alert('发送失败:' + err)
    })
  })
}

// 验证用户输入的验证码是否正确
export function verifyUserSMSCode(userInfo) {
  return new Promise((resolve, reject) => {
    const phoneCode = userInfo.phoneCode.replace(/[^\w]/g, '')
    Bmob.verifySmsCode(userInfo.accountNo, phoneCode).then(function(obj) {
      resolve(obj)
    }, function(err) {
      reject(err)
    })
  })
}

// 登录
export function login(userInfo = {}) {
  return new Promise(function(resolve, reject) {
    Bmob.User.login(userInfo.accountNo, userInfo.password).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
    })
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
