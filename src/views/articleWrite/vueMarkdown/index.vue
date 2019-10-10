<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       class="markdown-edit-wrapper">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="post-main-container">
        <el-col :span="24">
          <el-form-item prop="title">
            <MdInput v-model="postForm.title" :maxlength="64" name="titleInputName" required>
              title
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item  prop="content_short">
            <MdInput v-model="postForm.content_short" :maxlength="64" name="contentShortInputName" required>
              summary
            </MdInput>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item  prop="valueTag">
            <div class="tags-list">
              <el-select
                v-model="postForm.valueTag"
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
    <div class="operation-button">
      <el-button v-loading="loading" type="primary" size="medium" @click="publishArticle()">
        Publish
      </el-button>
      <el-button v-loading="loading" type="primary" size="medium" @click="getTags()">
        draft
      </el-button>
    </div>
    <div id="main">
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
    content_short: '',
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
        } else if (rule.field === 'content_short') {
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
        valueMarkdown: 'aaa',
        titleInputName: 'titleInput',
        contentShortInputName: 'contentShortInput',
        postForm: Object.assign({}, defaultForm),
        loading: false,
        tag: '',
        inputVisible: false,
        inputValue: '',
        rules: {
          title: [{ validator: validateRequire }],
          content_short: [{ validator: validateRequire }],
          valueTag: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'articleCategoryList'
      ])
    },
    created: function() {
      this.getArticleCategoryData()
    },
    methods: {
      getArticleCategoryData() {
        const _this = this
        _this.loading = true
        _this.$store.dispatch('getArticleCategoryData').then((res) => {
          _this.loading = false
        })
      },
      publishArticle(articleObj) {
        const _this = this
        this.$refs.postForm.validate((valid) => {
          if (valid) {
            return new Promise(function(resolve, reject) {
              _this.loading = true
              const TableArticle = Bmob.Query('Article')
              TableArticle.set('title', _this.postForm.title)
              TableArticle.set('artSummary', _this.postForm.content_short)
              TableArticle.set('artContent', _this.valueMarkdown)
              TableArticle.set('artTags', _this.postForm.valueTag)
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
</style>
