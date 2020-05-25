<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="aboutMe">
      <p>{{$t('message.hello')}}</p>
    </div>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="~@/../static/img/logged.png">
        <i class="el-icon-caret-bottom"></i>
      </div>

      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item @click.native="changePassword">
          <div>修改密码</div>
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">
          <div>退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <transition name="fade" mode="out-in">
      <div class="welecome">欢迎您！<span v-text="name">{{name}}</span></div>
    </transition>

    <el-dialog :close-on-click-modal="false" :before-close="close" style="text-align: center;" :closeOnClickModal="isNew?false:true" :closeOnPressEscape="isNew?false:true" :closeOnHashChange="isNew?false:true" :title="dialogTitle" :visible.sync="dialogFormVisibleShow" width="600px">
      <el-form label-position="right" :model="resetForm" size="small" status-icon :rules="resetRules" ref="resetForm" style="width:400px;margin:0 auto">
        <el-form-item v-if="!isNew" label="原密码:" label-width="100px" prop="oldPassword">
          <el-input type="password" v-model="resetForm.oldPassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码:" label-width="100px" prop="newPassword">
          <el-input type="password" v-model="resetForm.newPassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" label-width="100px" prop="password">
          <el-input type="password" v-model="resetForm.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer dailog-button-wrap" style="padding:0;margin:0;">
        <el-button v-if="!isNew" @click="close" class="dailog-button-width" size="small">取 消</el-button>
        <el-button type='primary' @click="submitForm('resetForm')" class="dailog-button-width" size="small">确 认</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUserData } from '@/utils/auth'
export default {
  data() {
    let oldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      dialogTitle: '修改密码',
      dialogFormVisibleShow: false,
      resetForm: {
        accountNo: '',
        oldPassword: '',
        newPassword: '',
        password: ''
      },
      isNew: false,
      openUserInfo: false,
      resetRules: {
        oldPassword: [{ validator: oldPass, trigger: 'blur' }],
        newPassword: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  created() {
    const userData = JSON.parse(getUserData() || '{}')
    this.resetForm.accountNo = userData.accountNo

    if (userData.isnew === 1) {
      this.dialogTitle = '设置密码'
      this.isNew = true
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    userInfo() {
      this.openUserInfo = true
    },
    closeDelong() {
      this.openUserInfo = false
    },
    logout() {
      this.$confirm('确认退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '我再想想'
        })
      })
    },
    close() {
      this.resetForm = {}
      this.dialogFormVisibleShow = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let actions
          if (this.isNew) {
            actions = 'InitPwd'
          } else {
            actions = 'UpdatePwdByOldPwd'
          }
          this.$store.dispatch(actions, this.resetForm).then((res) => {
            this.dialogFormVisibleShow = false
            if (res.msg === 'ok') {
              this.$alert(this.isNew ? '密码已设置，请重新登录' : '密码已修改，请重新登录', '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.logout()
                }
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改密码
    changePassword() {
      this.dialogTitle = '修改密码'
      this.dialogFormVisibleShow = true
    },
    switchChinese(){
      this.$i18n.locale = 'cn';
    },
    switchEnlish(){
      this.$i18n.locale = 'en';
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: block;
    float: right;
    .avatar-wrapper {
      height: 100%;
      .user-avatar {
        margin-top: 5px;
        width: 36px;
        height: 36px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    overflow: hidden;
  }

  .welecome {
    float: right;
    transform: translate(-50% 0);
    font-size: 14px;
    color: #303133;
    font-weight: 700;
    text-decoration: none;
    margin-right: 90px;
  }
}
.navbar::after {
  content: "";
  display: block;
  clear: both;
}
</style>

