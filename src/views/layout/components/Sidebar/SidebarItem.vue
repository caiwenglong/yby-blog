<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <!-- 有且仅有一个可见子路由，且该子路由无孙路由，且该路由不显式要始终展示两级关系 -->
    <!-- 展示当前路由 -->
    <router-link v-if="hasOneShowingChildren(item.children) && onlyOneVisibleChild && !onlyOneVisibleChild.children&&!item.alwaysShow" :to="resolvePath(onlyOneVisibleChild.path)">
      <el-menu-item :index="resolvePath(onlyOneVisibleChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <!-- <svg-icon v-if="onlyOneVisibleChild&&onlyOneVisibleChild.icon" :icon-class="onlyOneVisibleChild.icon"></svg-icon> -->
        <svg-icon v-if="onlyOneVisibleChild.meta&&onlyOneVisibleChild.meta.icon" :icon-class="onlyOneVisibleChild.meta.icon"></svg-icon>
        <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="onlyOneVisibleChild&&onlyOneVisibleChild.meta.title" slot="title">{{onlyOneVisibleChild.meta.title}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path">
      <!-- 展示当前路由 -->
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <!-- 存在孙路由 -->
        <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
        <!-- 仅有子路由 -->
        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneVisibleChild: null
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        this.onlyOneVisibleChild = showingChildren[0]
        return true
      }
      return false
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.menu-wrapper {
  .el-submenu {
    .el-menu-item {
      padding-left: 50px !important;
    }
  }
}
</style>
