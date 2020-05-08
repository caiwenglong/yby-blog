<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :rules="rules" :model="dialogForm">
        <el-form-item :label="label" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
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
        dialogForm: {
          objectId: '',
          name: ''
        },
        rules: {
          name: [
            { required: this.nameRequired, message: '请输入名称', trigger: 'change'}
          ]
        }
      }
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
          _this._tools.eleEnc.closeEleLoading();
          _this._tools.commonTools.reloadRouters();
          this.emitToggleDialog(false);
        }).catch(err => {
          _this.$notify({
            title: '错误',
            message: errorMessage,
            type: 'error',
            duration: 2000
          });
          console.log(err);
          this.emitToggleDialog(false);
          _this._tools.eleEnc.closeEleLoading();
        });
      },
      emitToggleDialog(flag) {
        this.$emit('toggleDialog', flag)
      }
    }
  }
</script>

<style scoped>

</style>
