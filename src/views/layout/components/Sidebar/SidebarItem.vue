<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <!-- 有且仅有一个可见子路由，且该子路由无孙路由，且该路由不显式要始终展示两级关系 -->
    <!-- 展示当前路由 -->
    <router-link v-if="hasOneShowingChildren(item.children) && onlyOneVisibleChild && !onlyOneVisibleChild.children && !item.alwaysShow" :to="resolvePath(onlyOneVisibleChild.path)">
      <el-menu-item :index="resolvePath(onlyOneVisibleChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <!-- <svg-icon v-if="onlyOneVisibleChild && onlyOneVisibleChild.icon" :icon-class="onlyOneVisibleChild.icon"></svg-icon> -->
        <svg-icon v-if="onlyOneVisibleChild.meta && onlyOneVisibleChild.meta.icon" :icon-class="onlyOneVisibleChild.meta.icon"></svg-icon>
        <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="onlyOneVisibleChild && onlyOneVisibleChild.meta.title" slot="title">{{onlyOneVisibleChild.meta.title}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path">
      <!-- 展示当前路由 -->
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.meta.objectId">新增</el-dropdown-item>
            <el-dropdown-item :command="item.meta.objectId">修改</el-dropdown-item>
            <el-dropdown-item :command="item.meta.objectId">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <!-- 存在孙路由 -->
        <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
        <!-- 仅有子路由 -->
        <el-menu-item @click="goToView(child.name, child.category)" :index="resolvePath(child.path)">
          <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
          <span v-if="child.meta && child.meta.title" slot="title">
            <span class="submenu__title">{{child.meta.title}}</span>
          </span>
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="child.meta.objectId">编辑</el-dropdown-item>
              <el-dropdown-item :command="child.meta.objectId">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </template>
    </el-submenu>

    <el-dialog title="修改文集" :visible.sync="dialogFormVisible">
      <el-form ref="collectionForm" :rules="rules" :model="collectionForm">
        <el-form-item label="文集名称"  prop="collectionName">
          <el-input v-model="collectionForm.collectionName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitCollectionForm('collectionForm')">确 定</el-button>
      </div>
    </el-dialog>

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
    /*
    * 定义验证规则
    * */
    const validateRequire = (rules, value, callbacks) => {
      let message = '';
      if(rules.field === 'collectionName') {
        message = '请输入文集名称'
      }
      if (value === '') {
        this.$message({
          message: message,
          type: 'error'
        });
        callback(new Error(message))
      } else {
        callback()
      }
    };
    return {
      onlyOneVisibleChild: null,
      dialogFormVisible: false,
      collectionForm: {
        collectionName: ''
      },
      rules: {
        collectionName: [
          { required: true, message: '请输入文集名称', trigger: 'change' }
        ],
      }
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
    },
    goToView(name, category) {
      this.$router.push({ name: name, params: { category: category }})
    },
    /*
    *   显示文集弹窗
    * */
    handleCommand(command) {
      this.dialogFormVisible = true;
    },

    /*
    *   提交文集表单
    * */
    commitCollectionForm(formName) {
      this.validateForm(formName);
    },
    // 验证表单
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          return true;
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .menu-wrapper {
    .el-submenu {
      .el-menu-item {
        padding-left: 50px !important;
        color: #bfcbd9 !important;
      }
    }
  }
  .el-dropdown {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
  }
</style>
