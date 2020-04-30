import {
  apiGetArticleCategory,
  apiInsertArticleCategory,
  apiUpdateArticleCategory,
  apiDeleteArticleCategory
} from '../../api/articleCategory'

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
      apiGetArticleCategory().then(categoryList => {
        commit('SET_ARTICLE_CATEGORY', categoryList)
      })
    },
    insertArticleCategory({ commit }, collectionForm) {
      return new Promise((resolve, reject) => {
        apiInsertArticleCategory(collectionForm).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateArticleCategory({ commit }, collectionForm) {
      return new Promise((resolve, reject) => {
        apiUpdateArticleCategory(collectionForm).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteArticleCategory({ commit }, collectionForm) {
      return new Promise((resolve, reject) => {
        apiDeleteArticleCategory(collectionForm).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
};

export default articleCategory
