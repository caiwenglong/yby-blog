<template>
  <div class="article-write-wrapper app-main-wrapper">
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

</style>
