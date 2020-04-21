<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       class="markdown-edit-wrapper">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="post-main-container">
        <el-col :span="6">
          <el-form-item prop="title">
            <MdInput v-model="postForm.title" :maxlength="64" name="titleInputName" required>
              title
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  prop="artSummary">
            <MdInput v-model="postForm.artSummary" :maxlength="64" name="contentShortInputName" required>
              summary
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  prop="category">
            <el-select v-model="postForm.category" placeholder="请选择分类">
              <el-option
                v-for="item in articleCategoryList"
                :key="item.category"
                :label="item.category"
                :value="item.category">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  prop="artTags">
            <div class="tags-list">
              <el-select
                v-model="postForm.artTags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in articleCategoryList"
                  :key="item.category"
                  :label="item.category"
                  :value="item.category">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
      </div>
      <div id="main">
        <div class="operation-button">
          <el-button v-if="isEdit" type="success" size="small" icon="el-icon-edit-outline" @click="handleRedirectToArtWrite">新建文章</el-button>
          <el-button v-if="isEdit" type="warning" size="small" icon="el-icon-warning-outline" @click="handleAddArticle">重置</el-button>
          <el-button size="small" @click="publishArticle()" v-loading="loading" type="primary">
            <i class="el-icon-upload"></i>
            <label>发布</label>
          </el-button>
          <el-button size="small" icon="el-icon-arrow-left" @click="goBack">返回</el-button>

        </div>
        <!-- 配置页面 https://github.com/hinesboy/mavonEditor -->
        <mavon-editor prop="artContent" v-model="postForm.artContent" :codeStyle="'monokai'"/>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Bmob from 'hydrogen-js-sdk'
  Bmob.initialize('e4d31451776823a5', '666666')
  import MdInput from '../../../components/MdInput/index'
  import { mapGetters } from 'vuex'

  const defaultForm = {
    status: 'draft',
    title: '',
    artContent: '',
    artSummary: '',
    category: '',
    artTags: [],
    source_uri: '',
    image_uri: '',
    importance: 0
  }

  export default {
    name: 'MarkdownEdit',
    components: { MdInput },
    data() {
      const validateRequire = (rule, value, callback) => {
        let message = ''
        if (rule.field === 'title') {
          message = '标题为必填项'
        } else if (rule.field === 'artSummary') {
          message = '文章概览为必填项'
        } else {
          message = '信息错误！'
        }
        if (value === '') {
          this.$message({
            message: message,
            type: 'error'
          })
          callback(new Error(message))
        } else {
          callback()
        }
      }
      return {
        titleInputName: 'titleInput',
        contentShortInputName: 'contentShortInput',
        postForm: Object.assign({}, defaultForm),
        loading: false,
        isEdit: false,
        inputVisible: false,
        inputValue: '',
        rules: {
          title: [{ validator: validateRequire }],
          artSummary: [{ validator: validateRequire }],
          artTags: [
            { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
          ],
          category: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'articleCategoryList',
        'entityArticleDetails'
      ])
    },
    created: function() {
      this.isEdit = this.$route.params.isEdit
      this.getArticleCategoryData()
      if (this.isEdit) {
        this.getArticleDetails()
        if (this.entityArticleDetails) {
          this.postForm = Object.assign(this.postForm, this.entityArticleDetails)
        }
      }
    },
    methods: {
      /*
      *   重置form
      * */
      handleResetForm() {
        this.postForm = Object.assign({}, defaultForm)
        this.$refs.postForm.resetFields()
      },
      getArticleCategoryData() {
        const _this = this
        _this.loading = true
        _this.$store.dispatch('getArticleCategoryData').then((res) => {
          _this.loading = false
        })
      },
      getArticleDetails() {
        this.$store.dispatch('getSingleArticle', this.$route.params.artId).then(item => {
          this.postForm.artContent = this.entityArticleDetails.artContent
        })
      },
      publishArticle(articleObj) {
        const _this = this
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            return new Promise(function(resolve, reject) {
              _this.loading = true
              const TableArticle = Bmob.Query('Article')
              if (_this.$route.params.isEdit) {
                TableArticle.set('id', _this.$route.params.artId)
              }
              TableArticle.set('title', _this.postForm.title)
              TableArticle.set('artSummary', _this.postForm.artSummary)
              TableArticle.set('category', _this.postForm.category)
              TableArticle.set('artContent', _this.postForm.artContent)
              TableArticle.set('artTags', _this.postForm.artTags)
              TableArticle.save().then(res => {
                _this.$notify({
                  title: '成功',
                  message: '发布文章成功',
                  type: 'success',
                  duration: 2000
                })
                _this.postForm.status = 'published'
                _this.loading = false
              }).catch(err => {
                _this.$notify({
                  title: '错误',
                  message: '发布文章失败',
                  type: 'error',
                  duration: 2000
                })
                console.log(err)
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      validateForm() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            return true
          } else {
            this.$notify({
              title: '错误',
              message: '发布文章失败',
              type: 'error',
              duration: 2000
            })
            return false
          }
        })
      },
      handleAddArticle() {
        this.$confirm('将要清空当前文章的所有数据，是否继续？', 'tip',{
          confirmButtonText: '重置',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          console.log('res' + res)
          this.handleResetForm()
          this.$message({
            type: 'success',
            message: '重置已完成'
          })
        }).catch(() => {
          this.$message({
            message: '取消重置'
          })
        })
      },
      handleRedirectToArtWrite() {
        this.$confirm('您当前的修改如果没有发布，那将被不保存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          window.location.reload()
        }).catch(() => {
          this.$message({
            message: '您已取消操作'
          })
        })
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  .operation-button {
    text-align: right;
    margin: 0 0 12px 0;
  }
  .tags-list {
    text-align: left;
  }
  .input-new-tag {
    margin-left: 4px;
    width: 90px;
  }
  .el-form-item {
    margin-bottom: 42px;
  }
  .el-col .el-form-item {
    margin-left: 12px;
  }

  #main {
    &::v-deep .shadow, &::v-deep.v-note-panel {
      border: 10px solid #000;
    }
  }
</style>
