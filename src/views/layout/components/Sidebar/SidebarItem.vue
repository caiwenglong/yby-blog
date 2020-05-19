<template>
  <div class="sidebar-item">
    <!--添加文集链接-->
    <div  v-if="index === 0" class="menu-wrapper cus-menu-wrapper">
      <el-menu-item index="8090" @click="handleCategoryOpe({objectId: '', opeCode: 0})">
        <i class="el-icon-plus"></i>
        <span slot="title">添加文集</span>
      </el-menu-item>
    </div>
    <div v-if="!item.hidden && item.children" class="menu-wrapper">
      <!-- 有且仅有一个可见子路由，且该子路由无孙路由，且该路由不显式要始终展示两级关系 -->
      <!-- 展示当前路由 -->
      <router-link
        v-if="hasOneShowingChildren(item.children) && onlyOneVisibleChild && !onlyOneVisibleChild.children && !item.alwaysShow"
        :to="resolvePath(onlyOneVisibleChild.path)">
        <el-menu-item :index="resolvePath(onlyOneVisibleChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="onlyOneVisibleChild.meta && onlyOneVisibleChild.meta.icon"
                    :icon-class="onlyOneVisibleChild.meta.icon"></svg-icon>
          <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="onlyOneVisibleChild && onlyOneVisibleChild.meta.title" slot="title">{{onlyOneVisibleChild.meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path">
        <!-- 展示当前路由 -->
        <template slot="title">
          <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
          <el-dropdown @command="handleCategoryOpe">
            <i @click.stop="() => { return false }" class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command='{objectId: item.meta.objectId, category: item.category, opeCode: 1}'>添加分类</el-dropdown-item>
              <el-dropdown-item :command='{objectId: item.meta.objectId, category: item.category, opeCode: 2, name: item.name}'>编辑</el-dropdown-item>
              <el-dropdown-item :command='{objectId: item.meta.objectId, category: item.category, opeCode: 4, name: item.name}'>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <!-- 存在孙路由 -->
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length>0" :item="child"
                        :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
          <!-- 仅有子路由 -->
          <el-menu-item  v-contextmenu:contextmenu @click="goToView(child.name, child.category)" :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta && child.meta.title" slot="title">
              <span class="submenu__title">{{child.meta.title}}</span>
            </span>
            <el-dropdown @command="handleCategoryOpe">
              <i @click.stop="() => { return false }" class="el-icon-setting"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{category: child.category, opeCode: 5}'>添加文章</el-dropdown-item>
                <el-dropdown-item :command='{objectId: child.meta.objectId, category: child.category, opeCode: 2, name: child.name}'>编辑</el-dropdown-item>
                <el-dropdown-item :command='{objectId: child.meta.objectId, category: child.category, opeCode: 3, name: child.name}'>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </template>
      </el-submenu>
    </div>
    <yby-dialog
      @toggleDialog="getDataFromSubCom"
      :title="dialogTitle"
      :object-id="objectId"
      :name="name"
      :ope-code="opeCode"
      :dialogFormVisible="dialogFormVisible"
      :name-required="nameRequired"
      :label="label">
    </yby-dialog>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item>菜单3</v-contextmenu-item>
    </v-contextmenu>
  </div>



</template>

<script>
  import path from 'path';
  import YbyDialog from '@/components/yby-dialog/index.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'SidebarItem',
    components: {
      YbyDialog
    },
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
      },
      index: ''
    },
    data() {
      /*
      * 定义验证规则
      * */
      const validateRequire = (rules, value, callbacks) => {
        let message = '';
        if (rules.field === 'collectionName') {
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
        opeCode: -1,
        objectId: '',
        category: '',
        name: '',
        nameRequired: true,
        dialogTitle: '添加文集',
        label: '文集名称',
      }
    },
    computed: {
      ...mapGetters([
        'collectionCategoryList'
      ])
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        });
        if (showingChildren.length === 1) {
          this.onlyOneVisibleChild = showingChildren[0];
          return true
        }
        return false
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      },
      goToView(name, category) {
        this.$router.push({name: name, params: {category: category}})
      },

      /*
      *  添加，修改， 删除操作
      *  @param objectId: 分类ID
      *  @param opeCOde: 操作类型，1 - 新增， 2 - 修改， 3 - 二级删除， 4 - 一级菜单删除， 5 - 添加文章
      * */
      handleCategoryOpe(command) {
        this.objectId = command.objectId || '';
        this.category = command.category || '';
        this.opeCode = command.opeCode;
        this.name = command.name || '';

        if (this.opeCode === 0 || this.opeCode === 1 || this.opeCode === 2) {
          this.dialogFormVisible = true; // 显示文集弹窗
        }
        if(this.opeCode === 0) {
          this.dialogTitle = '添加文集';
        }
        if(this.opeCode === 1) {
          this.dialogTitle = '添加分类';
          this.name = '';
        }
        if (this.opeCode === 2) {
          this.dialogTitle = '修改名称';
        }
        if (this.opeCode === 3) {
          this.handleDeleteArticleCategory();
        }
        if (this.opeCode === 4) {
          this.handleDeleteArticleCollection();
        }
        if(this.opeCode === 5) {
          this.handleAddArticle();
        }
      },

      /*
      *  删除文章分类，也就是本菜单
      * */
      handleDeleteArticleCategory() {
        const cnfObj = {
          type: 'warning',
          info: `即将删除${this.name}分类，该分类底下的所有文章也将都被删除，是否继续？`,
          title: '删除分类',
          messageType: 'success',
          cfmMsgInfo: '删除分类成功'
        };
        this._tools.eleEnc.encConfirm(cnfObj).then(res => {
          if (res === 'confirm') {
            this._tools.eleEnc.eleLoading();
            this.handleDelArticleCategory(this.category);
          }
        });
      },

      /*
      *  删除文集，也就是删除本菜单以及本菜单底下所有的二级菜单
      * */
      async handleDeleteArticleCollection() {
        const cnfObj = {
          type: 'warning',
          info: `即将删除${this.name}文集，文集里面的文章分类也会被全部删除掉，是否继续？`,
          title: '删除文集',
          messageType: 'success',
          cfmMsgInfo: '删除文集成功'
        };

        this._tools.eleEnc.encConfirm(cnfObj).then(async res => {
          if (res === 'confirm') {
            this._tools.eleEnc.eleLoading();

            // 得到要删除的所有分类菜单
            const categoryRes = await this.handleGetCollectionCategory(this.objectId);
            const categoryArr = this.handleGenerateCategoryArr(categoryRes);

            // 通过分类菜单数组来删除分类菜单底下的文章
            const batchesDelArtRes = await this.$store.dispatch('batchesDeleteArticle', categoryArr);
            if(this.isSuccess(batchesDelArtRes) || batchesDelArtRes.msg==='ok') {
              const batchesDelCgyRes = await this.$store.dispatch('batchesDeleteCategory', this.objectId);
              if(this.isSuccess(batchesDelCgyRes) || batchesDelCgyRes.msg==='ok') {
                const deleteArticleMenuRes = await this.$store.dispatch('deleteArticleCategory', this.objectId);
                if(deleteArticleMenuRes && deleteArticleMenuRes.msg === 'ok') {
                  this._tools.commonTools.reloadRouters().then(() => {
                    this._tools.eleEnc.closeEleLoading();
                    const objMsg = {
                      type: 'success',
                      info: `文集${this.name}删除成功`
                    };
                    this._tools.eleEnc.ybyMessage(objMsg);
                    this.$router.push('/')
                  });
                }
              }
            }
          }
        })
      },

      // 执行删除本菜单操作
      handleDelArticleCategory(category) {
        this.$store.dispatch('deleteArticleCategory', this.objectId).then(res => {
          if (res.msg === 'ok') {
            this.$store.dispatch('batchesDeleteArticle', category).then(() => {
              this._tools.commonTools.reloadRouters().then(() => {
                this._tools.eleEnc.closeEleLoading();
                const objMsg = {
                  type: 'success',
                  info: `分类${this.name}删除成功`
                };
                this._tools.eleEnc.ybyMessage(objMsg);
              });
            })
          }
        });
      },

      /*
      *  获得指定菜单底下的所有分类
      * */
      async handleGetCollectionCategory(objectId) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('getCollectionCategory', objectId).then((res) => {
            resolve(res)
          })
        })
      },

      getDataFromSubCom(flag) {
        this.dialogFormVisible = flag;
      },

      /*
      *   将调用handleGetCollectionCategory返回的数据进行二次操作，拿出里面的category组成数组以备后续使用
      * */
      handleGenerateCategoryArr(categoryRes) {
        const categoryArr = [];
        this._lodash.forEach(categoryRes, item => {
          categoryArr.push(item.category);
        });
        return categoryArr;
      },
      /*
      * 添加文章到指定分类
      *
       */
      handleAddArticle() {
        this.$router.push({path: '/articleWrite', query: { category: this.category }});
      },

      /*
      *  判断返回结果是否成功
      * */
      isSuccess(res) {
        return res && res[0] && res[0].success && res[0].success.msg === 'ok'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .menu-wrapper {
    .el-submenu {
      .el-menu-item {
        padding-left: 50px !important;
        color: $menuColor !important;
      }
    }
  }

  .el-menu-item.is-active .svg-icon {
    color: $menuActive;
  }

  .el-dropdown {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
  }

  .el-icon-plus {
    width: 16px;
    height: 16px;
  }
  .el-menu--collapse {
    .el-tooltip {
      padding: 10px !important;
    }
  }
  .el-submenu__title > span, .submenu__title {
    width: 106px;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
