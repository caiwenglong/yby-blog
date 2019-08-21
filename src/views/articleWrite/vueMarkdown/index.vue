<template>
  <div class="markdown-edit-wrapper">
    <div class="operation-button">
      <el-button type="primary" size="medium" @click="publishArticle()">
        Publish
      </el-button>
    </div>
    <div id="main">
      <!-- 配置页面 https://github.com/hinesboy/mavonEditor -->
      <mavon-editor ref="mavonEditor" v-model="value" :codeStyle="'monokai'"/>
    </div>
  </div>
</template>

<script>
  import Bmob from 'hydrogen-js-sdk'
  Bmob.initialize('e4d31451776823a5', '566210')
  export default {
    name: 'MarkdownEdit',
    data() {
      return { value: 'aaa' }
    },
    methods: {
      publishArticle(articleObj) {
        const _this = this
        return new Promise(function(resolve, reject) {
          const TableArticle = Bmob.Query('Article')
          TableArticle.set('title003', 'biaoti003')
          TableArticle.set('artContent', _this.value)
          TableArticle.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        })
      }

    }
  }
</script>

<style scoped>
  .operation-button {
    text-align: right;
    margin: 0 0 12px 0;
  }
</style>
