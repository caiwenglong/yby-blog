<template>
      <!-- 当前路由只有一个子路由，且该子路由不包含孙路由 -->
      <el-menu-item v-if="onlyOneChild(item) && !item.children[0].children" @click="jumpTo(item.children[0])" :index="resolvePath(item.path)">{{item.meta && item.meta.title}}</el-menu-item>
      <!-- 当前路由包含多个子路由 或者当前唯一子路由包含孙路由-->
      <el-submenu v-else :index="resolvePath(item.path)">
        <template slot="title">
          <!-- 显示当前路由名称 -->
          <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>
        <!-- 遍历当前路由的子路由 -->
        <template v-for="child in item.children" v-if="!child.hidden">
          <!-- 子路由包含孙路由 -->
          <menu-nav-item  v-if="child.children && child.children.length>0" 
            :item="child" :key="child.path" :base-path="resolvePath(child.path)"></menu-nav-item>
          <!-- 子路由不含孙路由（叶子） -->
          <el-menu-item v-else @click="jumpTo(child)" :index="resolvePath(child.path)">{{child.meta && child.meta.title}}</el-menu-item>
        </template>
      </el-submenu>
</template>
<script>
import { mapGetters } from 'vuex'
import path from 'path'

export default {
  name: 'MenuNavItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'menuNavList'
    ])
  },
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    },
    onlyOneChild(item) {
      if (item) {
        if (!item.children) {
          return false
        } else {
          const showingChildren = item.children.filter(item => {
            return !item.hidden
          })
          if (showingChildren.length === 1) {
            return true
          }
          return false
        }
      } else {
        return false
      }
    },
    jumpTo(item) {
      if (item) {
        if (typeof item.path === 'undefined') {
          item.path = ''
        }
        const fullPath = this.resolvePath(item.path)
        console.log('jump to: ' + fullPath)
        this.$router.push(fullPath)
      }
    }
  }
}
</script>
<style scoped>
</style>
