<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       class="article-list-wrapper app-main-wrapper">
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
                {{articleItem.artSummary}}
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
      <el-pagination
        v-show="total>0"
        :total=total
        :page-sizes="[4, 20, 50, 80, 100]"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getArticleTotal } from '../../api/article'
  export default {
    name: 'ArticleList',
    category: 'ALL',
    data: function() {
      return {
        articleList: [],
        loading: {
          type: Boolean,
          default: false
        },
        total: 0,
        currentPage: 1,
        pageSize: 4
      }
    },
    computed: {
      ...mapGetters([
        'entityArticleList'
      ])
    },
    created: function() {
      if (this.$route.params.category) {
        this.category = this.$route.params.category
      } else {
        this.category = 'ALL'
      }
      this.searchArtData(this.category)
    },
    methods: {
      searchArtData(category) {
        this.getDataList(category)
        this.getArticleTotalNum()
      },
      getArticleTotalNum() {
        getArticleTotal().then(res => {
          this.total = res
        })
      },
      getDataList(category) {
        const _this = this
        this.loading = true
        this.$store.dispatch('getArticleList', { category: category, currentPage: this.currentPage, pageSize: this.pageSize }).then(() => {
          _this.loading = false
        })
      },
      redirectToDetailsPage(artId) {
        this.$router.push({ name: 'articleDetailsIndex', params: { artId: artId }})
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getDataList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getDataList()
      }
    },
    watch: {
      $route(to, from) {
        this.getDataList(to.params.category)
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
