<template>
  <div class="article-list-wrapper app-main-wrapper">
      <el-row :gutter="12">
        <el-col :span="12" v-for="articleItem in entityArticleList" :key="articleItem.objectId">
          <el-card shadow="hover">
            <h4 class="article-title">
              {{ articleItem.title }}
            </h4>
            <div class="article-infos">
              <div class="article-date">
                <svg-icon icon-class="icon-home"></svg-icon>
                <span>{{ articleItem.createdAt }}</span>
              </div>
              <div class="article-content">
                这个位置是存放内容的
              </div>
            </div>
            <div class="operation-area">
              <el-button @click="redirectToDetailsPage(articleItem.objectId)" type="primary" size="medium">
                阅读全文
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { getArticleSummary } from '../../api/article'
  export default {
    name: 'ArticleList',
    data: function() {
      return {
        articleList: []
      }
    },
    computed: {
      ...mapGetters([
        'entityArticleList'
      ])
    },
    created: function() {
      this.searchArtData()
    },
    methods: {
      searchArtData() {
        this.getDataList()
      },
      getDataList() {
        this.$store.dispatch('getArticleList').then(() => {})
      },
      redirectToDetailsPage(artId) {
        this.$router.push({ name: 'articleDetailsIndex', params: { artId: artId }})
      }
    }
  }
</script>

<style scoped>
  .el-col-12 {
    margin-top: 8px;
  }

  .el-col-12:nth-child(1),
  .el-col-12:nth-child(2) {
    margin-top: 0;
  }

  .article-date {
    font-size: 14px;
    color: #999;
  }

  .article-content {
    font-size: 14px;
    padding: 8px;
  }

  .operation-area {
    margin-top: 16px;
  }
</style>
