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
            <MdInput v-model="getPostForm.title" :maxlength="64" name="titleInputName" required>
              title
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  prop="artSummary">
            <MdInput v-model="getPostForm.artSummary" :maxlength="64" name="contentShortInputName" required>
              summary
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  prop="category">
            <el-select v-model="getPostForm.category" placeholder="请选择分类">
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
    </el-form>
    <div id="main">
      <div class="operation-button">
        <el-button size="small" @click="publishArticle()" v-loading="loading" type="primary">
          <label>发布</label>
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
      <!-- 配置页面 https://github.com/hinesboy/mavonEditor -->
      <mavon-editor ref="mavonEditor" v-model="valueMarkdown" :codeStyle="'monokai'"/>
    </div>
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
    tags: '',
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
        valueMarkdown: '',
        titleInputName: 'titleInput',
        contentShortInputName: 'contentShortInput',
        postForm: Object.assign({}, defaultForm),
        loading: false,
        tag: '',
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
      ]),
      getPostForm: function() {
        if (this.entityArticleDetails) {
          return Object.assign(this.postForm, this.entityArticleDetails)
        } else {
          return this.postForm
        }
      }
    },
    created: function() {
      this.getArticleCategoryData()
      if (this.$route.params.isEdit) {
        this.getArticleDetails()
      }
    },
    methods: {
      getArticleCategoryData() {
        const _this = this
        _this.loading = true
        _this.$store.dispatch('getArticleCategoryData').then((res) => {
          _this.loading = false
        })
      },
      getArticleDetails() {
        this.$store.dispatch('getSingleArticle', this.$route.params.artId).then(item => {
          this.valueMarkdown = this.entityArticleDetails.artContent
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
              TableArticle.set('artContent', _this.valueMarkdown)
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
