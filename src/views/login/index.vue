<template>
  <div class="login-container">
    <div class="lo-container">
      <!-- 主体 -->
      <el-main>
        <div class="loginContainer">
          <div class="login-car-wrap">
            <div v-if="isReset">
              <el-card class="loginContext" shadow="naver">
                <el-form class="login-form" autoComplete="on" :model="reset" :rules="resetRules" ref="reset" label-position="right">
                  <h3 class="title">忘记密码</h3>
                  <el-form-item prop="accountNo">
                    <el-input clearable name="username" type="text" v-model="reset.accountNo" autoComplete="on" placeholder="请输入账号或手机号">
                      <svg-icon class="icon" slot="prefix" icon-class="account"></svg-icon>
                    </el-input>
                    <!-- <img src="../../../static/img/login_user.png" class="login-icon" /> -->

                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input clearable v-model="reset.code" class="verificationCode" placeholder="请输入验证码">
                      <svg-icon class="icon" slot="prefix" icon-class="code"></svg-icon>
                    </el-input>
                    <!-- <img src="../../../static/img/validateCode.png" class="login-icon" /> -->
                    <el-button class="codebtn" type="text" @click="getCode('reset')">{{ResetcodeText}}</el-button>
                  </el-form-item>
                  <el-form-item prop="newPassword">
                    <el-input clearable name="newPassword" type="password" v-model="reset.newPassword" autoComplete="on" placeholder="请输新入密码">
                      <svg-icon class="icon" slot="prefix" icon-class="password"></svg-icon>
                    </el-input>
                    <!-- <img src="../../../static/img/lock.png" class="login-icon" /> -->
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input clearable name="password" type="password" v-model="reset.password" autoComplete="on" placeholder="请确新认密码">
                      <svg-icon class="icon" slot="prefix" icon-class="password"></svg-icon>
                    </el-input>
                    <!-- <img src="../../../static/img/lock.png" class="login-icon" /> -->
                  </el-form-item>
                  <el-form-item>
                    <el-button class="login-btn" size="small" type="primary" style="width:85%;" :loading="loading" @click.native.prevent="handleLogin('reset')">
                      立即找回
                    </el-button>
                  </el-form-item>
                  <el-form-item class="loginButton" style="text-align:right;margin-bottom:0">
                    <span @click="retrieve" style="color:#FFFFFF;margin-right:10%">返回登录>></span>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
            <el-card class="loginContext" shadow="naver" v-else>
              <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="right">
                <h3 class="title">欢迎登陆</h3>
                <el-form-item prop="accountNo">
                  <el-input name="username" type="text" v-model="loginForm.accountNo" autoComplete="on" placeholder="用户名/手机号">
                    <svg-icon class="icon" slot="prefix" icon-class="account"></svg-icon>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" v-if="!isCode">
                  <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin('login')" v-model="loginForm.password" autoComplete="on" placeholder="密码">
                    <svg-icon class="icon" slot="prefix" icon-class="password"></svg-icon>
                  </el-input>
                  <!-- <img src="../../../static/img/lock.png" class="login-icon" /> -->
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" class="login-eye" />
                  </span>
                </el-form-item>
                <el-form-item prop="phoneCode" v-else>
                  <el-input clearable v-model.number="loginForm.phoneCode" class="verificationCode" placeholder="请输入验证码">
                    <svg-icon class="icon" slot="prefix" icon-class="code"></svg-icon>
                  </el-input>
                  <!-- <img src="../../../static/img/validateCode.png" class="login-icon" /> -->
                  <el-button class="codebtn" type="text" @click="getCode('login')">{{codeText}}</el-button>
                </el-form-item>
                <el-form-item>
                  <!-- <span class="forgetTips" @click="retrieve"></span> -->
                  <el-button class="login-btn" size="small" type="primary" style="width:85%;" :loading="loading" @click.native.prevent="handleLogin('login')">
                    登录
                  </el-button>
                </el-form-item>
                <el-form-item class="loginButton" style="text-align:right;margin-bottom:0" v-if="!isCode">
                  <span @click="switchLogin" style="color:#FFFFFF;">短信快速登陆 /</span>
                  <span @click="retrieve" style="color:#DD0101;margin-right:5%">找回密码？</span>
                </el-form-item>
                <el-form-item class="loginButton" style="text-align:right;margin-bottom:0" v-else>
                  <span @click="switchLogin" style="color:#FFFFFF;margin-right:10%">普通密码登录>></span>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '' || !value) {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '' || !value) {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.reset.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      Steps: 1,
      isCode: false, // 是否用验证码登录
      isReset: false,
      loginForm: {
        accountNo: '',
        password: '',
        phoneCode: 0
      },
      reset: {
        accountNo: '',
        code: '',
        newPassword: '',
        password: ''
      },
      resetRules: {
        accountNo: [
          { required: true, message: '请输入账号或手机号', trigger: 'blur' },
          { max: 32, message: '长度在32个字符之内', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        newPassword: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }]
      },
      loginRules: {
        accountNo: [
          { required: true, message: '请输入账号或手机号', trigger: 'blur' },
          { max: 32, message: '长度在32个字符之内', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 32, message: '长度在32个字符之内', trigger: 'blur' },
          { min: 6, message: '长度在6个字符以上', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password',
      isGetCode: true,
      codeText: '获取验证码',
      codeTime: 60,
      isResetCode: true,
      ResetcodeText: '获取验证码',
      ResetcodeTime: 60
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin(type) {
      if (!this.isCode) {
        if (type === 'login') {
          this.loginForm.phoneCode = 0
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('Login', this.loginForm).then((res) => {
                this.loading = false
                this.$router.push('/dashboard')
                // eslint-disable-next-line handle-callback-err
              }).catch((err) => {
                this.$message({
                  type: 'error',
                  message: '用户名或密码错误，请重新输入'
                })
                this.loading = false
              })
            } else {
              return false
            }
          })
        } else {
          this.$refs.reset.validate(valid => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('ResetPwdByEmail', this.reset).then((res) => {
                console.log(res);
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            } else {
              return false
            }
          })
        }
      } else {
        this.loginForm.password = ''
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log(this.loginForm)
            this.loading = true
            this.$store.dispatch('LoginByAuthCode', this.loginForm).then((res) => {
              this.loading = false
              console.log('验证码正确')
              console.log(res)
              this.$router.push('/dashboard')
              // eslint-disable-next-line handle-callback-err
            }).catch((err) => {
              this.$message({
                type: 'error',
                message: '验证码错误，请重新输入'
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    },
    // 找回密码
    retrieve() {
      this.Steps = 1
      this.reset = {}
      this.isReset = !this.isReset
    },
    // 获取验证码
    getCode(type) {
      if (type === 'reset') {
        this.resetcountDown()
        this.$store.dispatch('GetResetCode', this.reset.accountNo)
      } else {
        this.countDown()
        this.$store.dispatch('GetAuthCode', this.loginForm.accountNo).then(res => {
          console.log(res)
        })
      }
    },
    // 倒计时
    countDown() {
      if (!this.isGetCode) return
      this.isGetCode = false
      this.codeText = this.codeTime + 's后重新获取'
      var clock = window.setInterval(() => {
        this.codeTime--
        this.codeText = this.codeTime + 's后重新获取'
        if (this.codeTime <= 0) {
          window.clearInterval(clock)
          this.codeTime = 60
          this.codeText = '重新获取'
          this.isGetCode = true // 这里重新开启
        }
      }, 1000)
    },
    resetcountDown() {
      if (!this.isResetCode) return
      this.isResetCode = false
      this.ResetcodeText = this.ResetcodeTime + 's后重新获取'
      var reset = window.setInterval(() => {
        this.ResetcodeTime--
        this.ResetcodeText = this.ResetcodeTime + 's后重新获取'
        if (this.ResetcodeTime <= 0) {
          window.clearInterval(reset)
          this.ResetcodeTime = 60
          this.ResetcodeText = '重新获取'
          this.isResetCode = true // 这里重新开启
        }
      }, 1000)
    },
    // 切换登录
    switchLogin() {
      this.isCode = !this.isCode
    },
    next() {
      this.$refs.reset.validate(valid => {
        if (valid) {
          this.Steps = 2
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-btn {
  background: #475477;
  border-color: #475477;
  border-radius: 7px;
}
.login-icon {
  position: absolute;
  left: 10%;
  height: 20px;
  margin-top: 9px;
}
.icon {
  font-size: 1.3rem;
  color: #409eff;
  margin-top: 10px;
}
.login-eye {
  color: #fff;
  position: absolute;
  right: 10%;
  margin-top: 10px;
}
.loginWrap {
  width: 100%;
  height: 430px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-container {
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;
  .lo-container {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 80px;
      background-color: white;
      .logoContext {
        position: relative;
        height: 100%;
        margin: 0 auto;
        .logo {
          position: absolute;
          left: 30px;
          top: 10px;
          width: 60px;
          height: 60px;
          background: url("../../../static/img/LOGO.png") no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }

        .title {
          font-size: 39px;
          margin-left: 10px;
        }

        .appName {
          position: absolute;
          top: 50%;
          left: 80px;
          transform: translate(0, -50%);
          width: 8rem;
          font-size: 1.5rem;
          font-weight: bolder;
          letter-spacing: 3px;
        }
      }
    }
    .el-main {
      width: 100%;
      // height: calc(100% - 128px);
      height: 100%;
      padding: 0px;
      // margin: 14px 0;
      // background: #f5f5f5;
      .loginContainer {
        position: relative;
        width: 64%;
        height: 100%;
        margin: 0 auto;
        .title {
          font-size: 16px;
          text-align: center;
          font-weight: normal;
          color: #ffffff;
        }
        .login-car-wrap {
          position: absolute;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%); /* IE9及以上支持 */
          -webkit-transform: translate(-50%, -50%); /* Safari and Chrome */
          -o-transform: translate(-50%, -50%); /* Opera */
          -moz-transform: translate(-50%, -50%); /* Firefox */
          left: 50%;
          top: 50%;
          width: 100%;
          // height: 320px;
        }
        .loginContext {
          position: relative;
          font-size: 18px;
          height: 100%;
          width: 40%;
          border: none;
          // box-shadow: -33px 2px 4px rgba(0, 0, 0, 0.1);
          margin-left: 30%;
          text-align: center;
          .login-form {
            margin: auto;
            // height: 270px;
          }
          .specrator {
            position: relative;
            left: -4px;
          }
          .el-form-item__error {
            left: 6%;
          }
          .el-input {
            display: inline-block;
            height: 36px;
            width: 85%;

            input {
              background: transparent;
              border-top: 0px;
              border-left: 0px;
              border-right: 0px;
              -webkit-appearance: none;
              height: 36px;
              color: #ffffff;
              border: 1px solid #d6d6d6;
              border-radius: 7px;
              padding-left: 32px;
            }
          }
          .verificationCode {
            width: 60%;
          }
          .codebtn {
            width: 24%;
          }
        }
      }
      .loginButton {
        // margin-top: 48px;
        span {
          cursor: pointer;
        }
        .el-form-item__content {
          line-height: 32px;
          .forgetTips {
            color: #606266 !important;
            margin-left: 16px;
          }
        }

        button {
          width: 40% !important;
          float: right;
          margin-right: 32px;
        }
      }
      .el-card__body {
        height: 100%;
      }
      .el-card {
        background-color: rgba(0, 0, 0, 0.55);
      }
    }
  }
}
</style>
