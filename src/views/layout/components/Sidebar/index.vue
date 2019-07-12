<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
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

  created() {
    // 根据meta中的hidden属性裁剪动态路由列表，隐藏不需要用户可见的路由项
    //    this.sidebarConfig = JSON.parse(JSON.stringify(this.permission_routers))
    //    this.filter(this.sidebarConfig)
    console.log('this.permission_routers')
    console.log(this.permission_routers)
  },
  //  watch: {
  //    'permission_routers': (val) => {
  //      this.sidebarConfig = JSON.parse(JSON.stringify(val))
  //      this.filter(this.sidebarConfig)
  //    }
  //  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    }
    //    filter: function(arr) {
    //      for (let i = 0; i < arr.length; i++) {
    //        if (arr[i].meta && arr[i].meta.hasOwnProperty('hidden') && arr[i].meta.hidden === true) {
    //          arr.splice(i, 1)
    //        } else {
    //          if (arr[i].children && arr[i].children.length) {
    //            this.filter(arr[i].children)
    //          }
    //        }
    //      }
    //    }
  }
}
</script>
