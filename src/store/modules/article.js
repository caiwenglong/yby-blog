import {
  getArticleSummary
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
      state.entityArticleList = articleDetails
    }
  },
  actions: {
    getArticleList({ commit }) {
      getArticleSummary().then((articleList) => {
        commit('SET_ENTITY_ARTICLE_LIST', articleList)
      })
    }
  }
}

export default entityArticle
