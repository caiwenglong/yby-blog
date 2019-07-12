<template>
  <div class="datalist-div">
    <div class="contract_wrap search-content-div tabmanage-tabs">
      <el-form ref="entityManagement" :model="entityForm" class="user-management" size="small">
        <el-form-item class="search-input" label="实体名称:">
          <el-input placeholder='请输入组织名称' v-model="entityForm.entityName" class='input_width' prefix-icon='el-icon-search' clearable></el-input>
        </el-form-item>
        <el-form-item class="search-input" label="实体编号:">
          <el-input placeholder='请输入实体编号' v-model="entityForm.entityNo" class='input_width' prefix-icon='el-icon-search' clearable></el-input>
        </el-form-item>
        <el-button class="search-btn" type='primary' size="small" icon='el-icon-search' @click.enter="searchTable">查询</el-button>
      </el-form>
    </div>
    <el-row class="operation-button">
      <el-button size="small" class="tenancy_button" plain @click="createEntity">新增</el-button>
      <el-button type='primary' size="small" class="tenancy_button" @click="editEntity" plain>修改</el-button>
      <el-button type='danger' size="small" class="tenancy_button" @click="deleteEntity" plain>注销</el-button>
      <!-- <el-button type='info' size="small" class="tenancy_button" @click="detailEntity" plain>详情</el-button> -->
    </el-row>
    <MultiSelectTable :tableData="entityList ? entityList.list: [] " :tableTitle='tableTitle' @childData="childData" v-loading="loading"></MultiSelectTable>
    <Pagination :total="entityList? entityList.total: 0" :pageSize="entityList?entityList.pageSize: 10" :pageNum="entityList? entityList.pageNum: 1" @pageSizeSearchFn="pageSizeSearchFn" @pageNumSearch="pageNumSearch"></Pagination>

    <!-- 新增弹窗start -->
    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogFormVisibleShow" width="700px">
      <el-form :model="entityInfoForm" size="small" :rules="entityInfoFormRules" ref="entityInfoForm">
        <el-form-item label="实体名称:" :label-width="formLabelWidth" prop="entityName" style="margin-bottom:15px" class="need-key">
          <el-input v-model="entityInfoForm.entityName" class="key-input" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="实体编号:" :label-width="formLabelWidth" prop="entityNo" style="margin-bottom:15px" class="need-key">
          <el-input v-model="entityInfoForm.entityNo" :disabled="isEdit" class="key-input" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="实体描述:" :label-width="formLabelWidth" prop="entityDesc" style="margin-bottom:15px" class="need-key">
          <el-input style="width: 512px;" type="textarea" :rows="3" v-model="entityInfoForm.entityDesc" class="key-input" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer dailog-button-wrap" style="padding:0;margin:0;">
        <el-button @click="dialogFormVisibleShow = false" class="dailog-button-width" size="small">取 消</el-button>
        <el-button @click="formSubFn('entityInfoForm')" class="dailog-button-width" size="small" v-if="!isDetail">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 新增弹窗end -->

  </div>
</template>
<script>
import MultiSelectTable from '@/components/MultiSelectTable/index'
import Pagination from '@/components/Pagination/Pagination'
import { mapGetters } from 'vuex'
export default {
  name: 'entityManagement',
  data() {
    return {
      entityIds: [],
      // 实体信息查询表单
      entityForm: {
        entityName: '',
        entityNo: '',
        pageSize: 10,
        pageNum: 1
      },
      // 新增表单信息
      entityInfoForm: {
        entityName: '',
        entityNo: '',
        entityDesc: ''
      },
      // 实体信息表头
      tableTitle: [
        { prop: 'entityName', label: '实体名称' },
        { prop: 'entityNo', label: '实体编号' },
        { prop: 'entityDesc', label: '实体描述' }
      ],
      dialogFormVisibleShow: false,
      formLabelWidth: '85px',
      entityInfoFormRules: {
        entityName: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
        entityNo: [{ required: true, message: '请输入实体编号', trigger: 'blur' }]
      },
      loading: false,
      isChangeSize: false,
      dialogTitle: '',
      isEdit: false,
      isDetail: false
    }
  },
  methods: {
    // 接收选中的表格数据并封装成数组
    childData(data) {
      this.entityIds = []
      if (data) {
        data.forEach(item => {
          this.entityIds.push(item.entityId)
        })
      }
    },
    // 弹窗保存
    formSubFn(formName) {
      this.$refs[formName].validate(val => {
        // 校验成功
        if (!val) {
          return
        }
        let postAction = 'AddEntityInfo'
        if (this.isEdit) { // 修改
          postAction = 'ModEntityInfo'
        }
        this.$store.dispatch(postAction, this.entityInfoForm).then(() => {
          this.dialogFormVisibleShow = false
          let messageText = '保存成功'
          if (this.isEdit) {
            messageText = '修改成功'
          }
          this.$message({
            message: messageText,
            type: 'success'
          })
          // 保存成功后，重新请求数据列表
          this.getDataList()
        })
      })
    },
    pageSizeSearchFn(value) {
      this.isChangeSize = true
      this.entityForm.pageSize = value
      // 请求数据
      this.searchTable()
    },
    pageNumSearch(value) {
      if (this.isChangeSize) {
        return
      }
      this.entityForm.pageNum = value
      // 请求数据
      this.getDataList()
    },
    // 新增实体
    createEntity() {
      // 弹窗展示
      this.dialogFormVisibleShow = true
      this.isEdit = false
      this.dialogTitle = '新增实体信息'
    },
    // 修改实体
    editEntity() {
      const entityIdsLength = this.entityIds.length
      if (entityIdsLength === 1) {
        this.dialogFormVisibleShow = true
        this.isEdit = true
        this.dialogTitle = '修改实体信息'
        // 获取实体信息
        this.$store.dispatch('GetEntityInfo', this.entityIds[0]).then(res => {
          // 回填表单信息
          this.entityInfoForm = this.entityInfo
        })
      } else if (entityIdsLength === 0) {
        this.$message({
          message: '请选择需要修改的实体！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '只能修改一条实体！',
          type: 'warning'
        })
      }
    },
    // 查看实体
    detailEntity() {
      const entityIdsLength = this.entityIds.length
      if (entityIdsLength === 1) {
        this.dialogFormVisibleShow = true
        this.isEdit = false
        this.isDetail = true
        this.dialogTitle = '查看实体信息'
        // 获取实体信息
        this.$store.dispatch('GetEntityInfo', this.entityIds[0]).then(res => {
          // 回填表单信息
          this.entityInfoForm = this.entityInfo
        })
      } else if (entityIdsLength === 0) {
        this.$message({
          message: '请选择需要查看的实体！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '只能查看一条实体！',
          type: 'warning'
        })
      }
    },
    // 注销实体
    deleteEntity() {
      if (this.entityIds.length > 0) {
        this.$confirm('确定注销选中实体吗？', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const entityNos = this.entityIds.join(',')
          this.$store.dispatch('DelEntityInfo', entityNos).then(res => {
            this.$message({
              type: 'success',
              message: '注销成功！'
            })
            // 重新请求列表数据
            this.getDataList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择需要注销的实体'
        })
      }
    },
    getDataList() {
      this.loading = true
      this.$store.dispatch('GetEntityList', this.entityForm).then(() => {
        this.loading = false
        this.isChangeSize = false
      }).catch(() => {
        this.loading = false
        this.isChangeSize = false
      })
    },
    // 点击查询
    searchTable() {
      // 重置页码
      this.entityForm.pageNum = 1
      this.getDataList()
    }
  },
  computed: {
    ...mapGetters([
      'entityList',
      'entityInfo'
    ])
  },
  created() {
    this.searchTable()
  },
  components: {
    MultiSelectTable,
    Pagination
  },
  watch: {
    dialogFormVisibleShow(val) {
      if (!val) {
        this.$refs['entityInfoForm'].resetFields()
        this.isDetail = false
      }
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.operation-button {
  text-align: left;
  margin: 10px;
}
.el-dialog {
  .el-form-item {
    width: 45%;
    display: inline-block;
  }
}
</style>
