<template>
  <div>
    <el-dialog :before-close="handleClose" :title="title" :visible="dialogFormVisible">
      <el-form ref="dialogForm" :rules="rules" :model="dialogForm">
        <el-form-item :label="label" prop="name">
          <el-input @keyup.enter.native="commitDialogForm('dialogForm')" v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitToggleDialog(false)">取 消</el-button>
        <el-button type="primary" @click="commitDialogForm('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'YbyDialog',
    props: {
      title: {
        type: String,
        default: '提示'
      },
      label: {
        type: String,
        required: true
      },
      objectId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: ''
      },
      cancelBtn: {
        type: String,
        default: '取消'
      },
      confirmBtn: {
        type: String,
        default: '确定'
      },
      nameRequired: {
        type: Boolean,
        default: false
      },
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      opeCode: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        visible: '',
        dialogForm: {
          objectId: '',
          name: this.name
        },
        rules: {
          name: [
            { required: this.nameRequired, message: '请输入名称', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.$store.dispatch('getArticleCategoryData').then(() => {});
    },
    watch: {
      name: function(newValue) {
        this.dialogForm.name =  newValue;
      }
    },
    computed: {
      ...mapGetters([
        'articleCategoryList'
      ])
    },
    methods: {
      /*
      *  添加，修改， 删除操作
      *  @param objectId: 分类ID
      *  @param opeCOde: 操作类型，0 - 新增文集, 1 - 新增分类， 2 - 修改， 3 - 删除
      * */
      commitDialogForm(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            const isNameExits = this._lodash.filter(this.articleCategoryList, item => {
              return item.name === this.dialogForm.name;
            });
            if(!isNameExits.length) {
              this.dialogForm.objectId = this.objectId;
              let successMessage = '成功信息';
              let errorMessage = '错误信息';
              if (this.opeCode === 0) {
                successMessage = '文集添加成功';
                errorMessage = '文集添加失败';
                this.showMessage('insertArticleCollection', successMessage, errorMessage);
              } else if (this.opeCode === 1) {
                successMessage = '分类添加成功';
                errorMessage = '分类添加失败';
                this.showMessage('insertArticleCategory', successMessage, errorMessage);
              } else if (this.opeCode === 2) {
                successMessage = '文集修改成功';
                errorMessage = '文集修改失败';
                this.showMessage('updateArticleCategory', successMessage, errorMessage);
              }
            } else {
              this._tools.eleEnc.ybyMessage({
                type: 'warning',
                info: '改名称已存在,请重新输入'
              })
            }
          } else {
            this.$notify({
              title: '错误',
              message: '请输入文集名称',
              type: 'error',
              duration: 2000
            });
          }
          this.emitToggleDialog(false);
        })
      },
      showMessage(dispatchName, successMessage, errorMessage) {
        const _this = this;
        _this._tools.eleEnc.eleLoading();
        this.$store.dispatch(dispatchName, this.dialogForm).then(res => {
          _this.$notify({
            title: '成功',
            message: successMessage,
            type: 'success',
            duration: 2000
          });
          if(dispatchName === 'updateArticleCategory') {
            this.handleGetCategoryList();
          }
          _this._tools.commonTools.reloadRouters();
          this.$refs['dialogForm'].resetFields();
          _this._tools.eleEnc.closeEleLoading();
          this.emitToggleDialog(false);
        }).catch(err => {
          _this.$notify({
            title: '错误',
            message: errorMessage,
            type: 'error',
            duration: 2000
          });
          this.emitToggleDialog(false);
          this.$refs['dialogForm'].resetFields();
          _this._tools.eleEnc.closeEleLoading();
        });
      },

      /*
      *  单项数据流：所有的prop都使得其父子prop之间形成了一个单向下行绑定
      *  父级prop的更新会流动到子组价中去，但是反过来就不行，
      *  这是为了防止子组件意外改变父级组件的状态而导致数据流向难以理解
      *  所以不应该在子组件内部改变prop的值
      *  子组件需要改变的值可以通过$emit 发出给父组件
      *  在父组件通过@toggleDialog="自定义方法名"
      * */
      emitToggleDialog(flag) {
        this.$emit('toggleDialog', flag)
      },

      /*
      *   去掉dialog自带的.sync 否则自带的sync会改变从父组件传过来
      *   dialogFormVisible的值，导致单项数据流错误
      *   解决方法：在点击弹出窗关闭按钮会触发:before-close事件，
      *   因此在关闭事件中将需要改变的值emit出去给父组件
      * */
      handleClose() {
        this.emitToggleDialog(false);
      },

      /*
      *   重新生成分类数组
      * */
      handleGetCategoryList() {
        this.$store.dispatch('getCollectionCategory').then();
      }
    }
  }
</script>

<style scoped>

</style>
