<template>
  <div>
    <el-dialog title="修改文集" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :rules="rules" :model="dialogForm">
        <el-form-item label="文集名称" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitDialogForm('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CDialog',
    props: {
      title: {
        type: String,
        default: '提示'
      },
      label: {
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
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogForm: {
          id: '',
          name: ''
        },
      }
    },
    method: {
      commitDialogForm(form) {
        this.$refs['dialogForm'].validate(valid => {
          if(valid) {

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
