<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <span v-else-if="isRedirctSamePath(item)" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
        <!-- 暂不支持点击 -->
        <!-- <span class="no-redirect">{{item.meta.title}}</span> -->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null,
      curPath: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
      this.curPath = this.$route.path
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    },
    // 判断当前面包屑项重定向地址是否和当前地址一致
    isRedirctSamePath(item) {
      var path = ''
      // 构造重定向地址
      if (item) {
        // 确保前缀不带'/'
        if (item.path && item.path[item.path.lenght - 1] === '/') {
          path = item.path.substring(0, this.path.lenght - 1)
        } else {
          path = item.path
        }
        if (item.redirect && item.redirect[0] === '/') {
          path = item.redirect
        } else {
          // 手工构造'/'
          path += '/' + item.redirect
        }
      }
      if (path === this.curPath) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
