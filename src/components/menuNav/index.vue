<template>
  <el-menu  class="el-menu" mode="horizontal" @select="handleSelect">
   <menu-nav-item v-for="(menu, index) in menuNavList" :key="menu.name" :item="menu" :index="index+''" :base-path="menu.path"></menu-nav-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import store from '../../store'
import MenuNavItem from './MenuNavItem.vue'

export default {
  name: 'menuNav',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'menuNavList'
    ])
  },
  components: {
    MenuNavItem
  },
  methods: {
    handleSelect: function(index, path) {
      console.log('menu item select: ' + index + 'path: ' + path)
    }
  },
  created() {
    store.dispatch('GenerateMenuList', { roles: this.roles }).then(() => {
      console.log('初始化首页导航菜单')
    })
  }
}
</script>
<style scoped>
  .el-menu {
    padding-top: 20px;
    border-bottom: none;
    background-color: transparent;
  }
</style>
