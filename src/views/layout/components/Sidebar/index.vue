<template>
  <div class="com-sidebar">
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <el-link @click="handleAddArticleCol" type="primary"><i class="el-icon-plus"></i><span>添加文集</span></el-link>
        <sidebar-item v-for="route in permission_routers" :key="route.url" :item="route" :base-path="route.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <yby-dialog
      @toggleDialog="toggleDialog"
      :title="title"
      :object-id="objectId"
      :ope-code="opeCode"
      :dialogFormVisible="dialogFormVisible"
      :name-required="nameRequired"
      :label="label">
    </yby-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import YbyDialog from '@/components/yby-dialog/index.vue'
export default {
  components: { SidebarItem, YbyDialog },
  data: function() {
    return {
      dialogFormVisible: false,
      opeCode: 0,
      title: '添加文集',
      label: '文集名称',
      objectId: '',
      nameRequired: true
    }
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
  create() {
    this.$on('toggleDialog',function(flag) {
      debugger
      console.log(flag);
    })
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    },
    handleAddArticleCol() {
      this.dialogFormVisible = true;
    },
    toggleDialog(flag) {
      this.dialogFormVisible = flag;
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
