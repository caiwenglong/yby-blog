import {
  apiGetArticleCategory,
  apiInsertArticleCollection,
  apiInsertArticleCategory,
  apiUpdateArticleCategory,
  apiDeleteArticleCategory,
  apiBatchesDeleteCategory,
  apiGetCollectionCategory
} from '../../api/articleCategory'

const articleCategory = {
  state: {
    articleCategoryList: [],
    collectionCategoryList: []
  },
  mutations: {
    SET_ARTICLE_CATEGORY: (state, categoryList) => {
      state.articleCategoryList = categoryList
    },
    SET_COLLECTION_CATEGORY: (state, categoryList) => {
      state.articleCategoryList = categoryList
    }
  },
  actions: {

    /*
    *  得到指定菜单底下的所有二级分类
    * */
    getCollectionCategory({ commit }, objectId) {
      return new Promise((resolve, reject) => {
        apiGetCollectionCategory(objectId).then(res => {
          commit('SET_COLLECTION_CATEGORY', res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    /*
    *  得到所有的分类
    * */
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
    /*
    *  删除单个文章分类
    * */
    deleteArticleCategory({ commit }, form) {
      return new Promise((resolve, reject) => {
        apiDeleteArticleCategory(form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    /*
    *  删除一级菜单底下所有的分类
    *  @param objectId: 文集的ID
    * */
    batchesDeleteCategory({ commit }, objectId) {
      return new Promise((resolve, reject) => {
        apiBatchesDeleteCategory(objectId).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
};

export default articleCategory
