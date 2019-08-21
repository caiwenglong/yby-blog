<template>
  <div v-if="entityArticleDetails" class="article-details-wrapper app-main-wrapper">
    <div>
      <h4>
        {{entityArticleDetails.title}}
      </h4>

      <div class="article-details-content">
        <mavon-editor
          ref="mavonEditor"
          v-model="entityArticleDetails.artContent"
          :defaultOpen="'preview'"
          :subfield="false"
          :toolbarsFlag="false"
          :codeStyle="'monokai'"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'ArticleDetails',
    created: function() {
      this.getArticleDetails()
    },
    computed: {
      ...mapGetters([
        'entityArticleDetails'
      ])
    },
    methods: {
      getArticleDetails() {
        this.$store.dispatch('getSingleArticle', this.$route.params.artId).then()
      }
    }
  }
</script>

<style>
.article-details-content {
  width: 100%;
}
.v-note-wrapper .v-note-panel .v-note-show {
  width: 100%;
}
</style>
