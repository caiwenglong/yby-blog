<template>
  <div class="com-sidebar">
    <GeminiScrollbar wrapClass="scrollbar-wrapper">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <template v-if="permission_routers">
          <sidebar-item
            v-for="(route, index) in permission_routers"
            :index="index"
            :key="route.path"
            :item="route"
            :base-path="route.path">
          </sidebar-item>
        </template>
      </el-menu>
    </GeminiScrollbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import YbyDialog from '@/components/yby-dialog/index.vue'

  export default {
    components: {SidebarItem, YbyDialog},
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss">
  .sidebar-container {
    background: $menuBg;
  }
  .el-link.el-link--primary {
    font-size: 16px;
    padding-left: 20px;
    height: 56px;
    line-height: 56px;
    color: $menuColor;
    &:hover {
      background: $menuHovBg;
    }
  }
</style>
