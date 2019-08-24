import { getArticleCategory } from '../../api/articleCategory'

const articleCategory = {
  state: {
    articleCategoryList: []
  },
  mutations: {
    SET_ARTICLE_CATEGORY: (state, categoryList) => {
      state.articleCategoryList = categoryList
    }
  },
  actions: {
    getArticleCategoryData({ commit }) {
      getArticleCategory().then(categoryList => {
        commit('SET_ARTICLE_CATEGORY', categoryList)
      })
    }
  }
}

export default articleCategory
