<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="route in permission_routers" :key="route.url" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  create: function() {
    console.log(permission_routers);
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // 菜单排序
    sortstudents: function() {
      return this.sortByKey(this.permission_routers, 'name')
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    }
  }
}
</script>

<style lang="scss">
  .sidebar-container {
    background: #304156;
  }
</style>
