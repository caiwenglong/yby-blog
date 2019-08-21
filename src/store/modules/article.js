import {
  getArticleSummary,
  getArticleDetails
} from '../../api/article'

const entityArticle = {
  state: {
    entityArticleList: null,
    entityArticleDetails: null
  },
  mutations: {
    SET_ENTITY_ARTICLE_LIST: (state, articleList) => {
      state.entityArticleList = articleList
    },
    SET_ENTITY_ARTICLE_DETAILS: (state, articleDetails) => {
      state.entityArticleDetails = articleDetails
    }
  },
  actions: {
    getArticleList({ commit }, params) {
      console.log(params)
      getArticleSummary(params.currentPage, params.pageSize).then((articleList) => {
        commit('SET_ENTITY_ARTICLE_LIST', articleList)
      })
    },
    getSingleArticle({ commit }, artId) {
      getArticleDetails(artId).then(articleDetails => {
        commit('SET_ENTITY_ARTICLE_DETAILS', articleDetails)
      })
    }
  }
}

export default entityArticle
