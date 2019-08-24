<template>
  <div v-if="entityArticleDetails" class="page-article-details app-main-wrapper">
    <div class="article-detail__title">
      <span>{{entityArticleDetails.title}}</span>
    </div>
    <div class="c-article-detail">
      <div class="article-detail-infos clearfix">
        <div class="col--left">
          <div>
            <span class="article-infos__auth">
              <i class="el-icon-user"></i>
              <span>作者：</span>
              <span>YBY</span>
            </span>
            <span class="article-infos__date">
              <i class="el-icon-date"></i>
              <span>日期：</span>
              <span>2019-08-23</span>
            </span>
            <span class="article-infos__hits">
              <i class="el-icon-stopwatch"></i>
              <span>点击量：</span>
              <span>5</span>
            </span>
          </div>
        </div>
        <div class="col--right">
          <i class="el-icon-paperclip"></i>
          <div class="o-tags__list">
            <ul>
              <el-tag
                v-for="tag in entityArticleDetails.artTags"
                :key="tag"
                :size="'mini'"
                :color="'none'"
              >
                <div class="tags__item">{{tag}}</div>
              </el-tag>
            </ul>
          </div>
        </div>
      </div>

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

<style lang="scss">
.article-details-content {
  width: 100%;
}
.v-note-wrapper .v-note-panel .v-note-show {
  width: 100%;
}
.article-details-content {
  .v-note-wrapper {
    background: none;
  }
.v-show-content {
  background: none !important;
}
  .v-note-panel {
    box-shadow: none !important;
  }
}

.article-detail__title {
  font-size: 28px;
  color: #00b7e9;
}

.article-detail-infos {
  margin: 0 25px 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
}

.c-article-detail {
  font-size: 12px;
  color: #ccc;
}
  .article-infos__date {
    line-height: 20px;
  }
</style>
