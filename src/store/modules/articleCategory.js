import {
  apiGetArticleCategory,
  apiInsertArticleCollection,
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
    insertArticleCollection({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiInsertArticleCollection(form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    insertArticleCategory({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiInsertArticleCategory(form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateArticleCategory({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiUpdateArticleCategory(form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteArticleCategory({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiDeleteArticleCategory(form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
};

export default articleCategory
