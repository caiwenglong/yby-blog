import Bmob from 'hydrogen-js-sdk'
import * as _ from 'lodash'
Bmob.initialize('e4d31451776823a5', '666666')

const TABLE_NAME = 'Article'
const TableArticle = Bmob.Query(TABLE_NAME)

export function getArticleSummary(categoryName, currentPage, pageSize) {
  return new Promise(function(resolve, reject) {
    let skipTotal
    if (currentPage > 0) {
      skipTotal = (currentPage - 1) * pageSize
    } else {
      skipTotal = 0
    }
    if (categoryName !== 'ALL') {
      TableArticle.equalTo('category', '==', categoryName)
    }
    TableArticle.skip(skipTotal)
    TableArticle.limit(pageSize)
    TableArticle.order('-artLevel', '-updatedAt')
    TableArticle.find().then(res => {
      const articleList = []
      for (let i = 0; i < res.length; i++) {
        const object = {
          title: String,
          artSummary: String,
          artContent: String,
          artTags: [],
          objectId: String,
          createdAt: String,
          updatedAt: String
        }
        object.title = res[i].title
        object.artSummary = res[i].artSummary
        object.artContent = res[i].artContent
        object.artTags = res[i].artTags
        object.objectId = res[i].objectId
        object.createdAt = res[i].createdAt
        object.updatedAt = res[i].updatedAt
        articleList.push(object)
      }
      _.reverse(articleList)
      resolve(articleList.reverse())
    }).catch(err => {
      console.log(err)
      return []
    })
  })
}

export function getArticleTotal() {
  return new Promise(function(resolve, reject) {
    TableArticle.count().then(res => {
      const total = res
      resolve(total)
    }).catch(err => {
      console.log(err)
    })
  })
}

export function getArticleDetails(artId) {
  return new Promise(function(resolve, reject) {
    TableArticle.get(artId).then(res => {
      const singleArticleDetails = res
      resolve(singleArticleDetails)
    }).catch(err => {
      console.log(err)
    })
  })
}
