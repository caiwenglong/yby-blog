<template>
  <div class="markdown-edit-wrapper">
    <div id="main">
      <!-- 配置页面 https://github.com/hinesboy/mavonEditor -->
      <mavon-editor v-model="value" :codeStyle="'monokai'"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarkdownEdit',
    data() {
      return { value: 'aaa' }
    }
  }
</script>
