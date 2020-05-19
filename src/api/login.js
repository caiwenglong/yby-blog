import { getToken} from "../utils/auth";
import request from '@/utils/request'
import { getObjectId } from "../utils/auth";
import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '666666');
// 重设密码
export function resetPed(resetForm) {
  return new Promise((resolve, reject) => {
    let data = {
      email: '836472117@qq.com'
    };
    Bmob.requestPasswordReset(data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改密码
export function UpdatePwd(resetForm) {
  return new Promise((resolve, reject) => {
    let objectId = getObjectId();
    let data = {
      oldPassword: resetForm.oldPassword,
      newPassword: resetForm.newPassword
    };
    Bmob.updateUserPassword(objectId,data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 注册
export function apiRegister(registerForm) {
  return new Promise((resolve, reject) => {
    const params = {
      username: registerForm.accountNo,
      password: registerForm.password,
      email: registerForm.email,
      roles: ['user']
    };
    Bmob.User.register(params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err);
    });
  })
}

// 获取验证码
export function getSMSCode(tel) {
  return new Promise((resolve, reject) => {
    const params = {
      mobilePhoneNumber: tel, // string
      template: 'sms-code'
    };
    Bmob.requestSmsCode(params).then(function(response) {
      alert('smsId:' + response.smsId);
      resolve(response)
    }).catch(function(error) {
      console.log(error);
      reject(error)
    })
  })
}

// 验证用户输入的验证码是否正确
export function verifyUserSMSCode(userInfo) {
  return new Promise((resolve, reject) => {
    const smsCode = userInfo.phoneCode;
    const data = {
      mobilePhoneNumber: userInfo.accountNo
    };
    Bmob.verifySmsCode(smsCode, data).then(function(response) {
      resolve(response)
    }).catch(function(error) {
      reject(error)
    });
    Bmob.User.signOrLoginByMobilePhone(userInfo.accountNo, userInfo.phoneCode).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
}

/*
*  通过手机验证码登录
* */
export function loginBySMSCode(userInfo) {
  return new Promise((resolve, reject) => {
    const phoneNo = Number(userInfo.accountNo);
    const SMSCode = Number(userInfo.phoneCode);
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
  Bmob.User.logout()
}
