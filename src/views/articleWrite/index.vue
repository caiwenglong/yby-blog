<template>
  <div class="article-write-wrapper">
    <div class="operation-button">
      <el-button type="primary" size="medium">
        Publish
      </el-button>
    </div>
    <VueMarkdown></VueMarkdown>
  </div>
</template>

<script>
  import VueMarkdown from './vueMarkdown/index'
  export default {
    name: 'ArticleWrite',
    components: {
      VueMarkdown
    }
  }
</script>

<style scoped lang="scss">
  .article-write-wrapper {
    margin-top: -60px;
  }
  .operation-button {
    margin: 0 !important;
    border-bottom: 10px solid #e6ebf4;
    padding: 10px;
    text-align: right;
  }
</style>
