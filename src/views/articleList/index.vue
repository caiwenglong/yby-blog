<template>
  <div class="article-list-wrapper app-main-wrapper">
      <el-row :gutter="12">
        <template v-if="entityArticleList && entityArticleList.length > 0">
          <el-col :span="12" v-for="articleItem in entityArticleList" :key="articleItem.objectId">
          <el-card shadow="hover">
            <div slot="header">
              <i class="el-icon-close" @click="handleDeleteArticle(articleItem.objectId)"></i>
            </div>
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
        </template>
        <div v-else>
          暂无数据
        </div>
      </el-row>
      <template v-if="entityArticleList">
        <el-pagination
          v-show="entityArticleList.length>0"
          :total=entityArticleList.length
          :page-sizes="[4, 20, 50, 80, 100]"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </template>
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
        this.getDataList(category);
      },
      getDataList(category) {
        this._tools.eleEnc.eleLoading();
        this.$store.dispatch('getArticleList', { category: category, currentPage: this.currentPage, pageSize: this.pageSize }).then(() => {
          this._tools.eleEnc.closeEleLoading();
        })
      },
      handleDeleteArticle(objectId) {
        const cfmObj = {
          title:'删除文章',
          info: '此操作将删除该文章，是否继续？'
        };
        this._tools.eleEnc.encConfirm(cfmObj).then(res => {
          if (res === 'confirm') {
            this._tools.eleEnc.eleLoading();
            this.$store.dispatch('deleteArticle', objectId).then(res => {
              if (res.msg === 'ok') {
                this._tools.eleEnc.ybyMessage({
                  type: 'success',
                  info: '删除文章成功！'
                });
                this._tools.eleEnc.closeEleLoading();
                this.searchArtData(this.category);
              }
            })
          }
        }).catch(err => {
          console.log('删除文章错误' + err);
        });
      },
      redirectToDetailsPage(artId) {
        this.$router.push({ name: 'articleDetailsIndex', params: { artId: artId }})
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
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

<style lang="scss" scoped>
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

  .el-icon-close {
    &:hover {
      color: $menuActive;
      transform: rotate(180deg);
    }
    transition: all 1s;
  }
</style>
