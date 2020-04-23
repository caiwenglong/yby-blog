import request from '@/utils/request'
import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '666666')

// 获取验证码
export function getSMSCode(tel) {
  return new Promise((resolve, reject) => {
    const params = {
      mobilePhoneNumber: tel, // string
      template: 'sms-code'
    }
    Bmob.requestSmsCode(params).then(function(response) {
      alert('smsId:' + response.smsId)
      resolve(response)
    }).catch(function(error) {
      console.log(error)
      reject(error)
    })
  })
}

// 验证用户输入的验证码是否正确
export function verifyUserSMSCode(userInfo) {
  return new Promise((resolve, reject) => {
    const smsCode = userInfo.phoneCode
    const data = {
      mobilePhoneNumber: userInfo.accountNo
    }
    Bmob.verifySmsCode(smsCode, data).then(function(response) {
      resolve(response)
    }).catch(function(error) {
      reject(error)
    })
    Bmob.User.signOrLoginByMobilePhone(userInfo.accountNo, userInfo.phoneCode).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
}

export function loginBySMSCode(userInfo) {
  return new Promise((resolve, reject) => {
    const phoneNo = Number(userInfo.accountNo)
    const SMSCode = Number(userInfo.phoneCode)
    Bmob.User.signOrLoginByMobilePhone(phoneNo, SMSCode).then(res => {
      resolve(res)
    }).catch(err => {
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
      reject(err)
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
