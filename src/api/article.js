import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '566210')

const TABLE_NAME = 'Article'

export function getArticleSummary(currentPage, pageSize) {
  return new Promise(function(resolve, reject) {
    const TableArticle = Bmob.Query(TABLE_NAME)
    let skipTotal
    if (currentPage > 0) {
      skipTotal = (currentPage - 1) * pageSize
    } else {
      skipTotal = 0
    }
    TableArticle.skip(skipTotal)
    TableArticle.limit(pageSize)
    TableArticle.find().then(res => {
      const articleList = []
      for (let i = 0; i < res.length; i++) {
        const object = {
          title: String,
          artSummary: String,
          artContent: String,
          objectId: String,
          createdAt: String,
          updatedAt: String
        }
        object.title = res[i].title
        object.artSummary = res[i].artSummary
        object.artContent = res[i].artContent
        object.objectId = res[i].objectId
        object.createdAt = res[i].createdAt
        object.updatedAt = res[i].updatedAt
        articleList.push(object)
      }
      resolve(articleList.reverse())
    }).catch(err => {
      console.log(err)
      return []
    })
  })
}

export function getArticleTotal() {
  return new Promise(function(resolve, reject) {
    const TableArticle = Bmob.Query(TABLE_NAME)
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
    const TableArticle = Bmob.Query(TABLE_NAME)
    TableArticle.get(artId).then(res => {
      const singleArticleDetails = res
      resolve(singleArticleDetails)
    }).catch(err => {
      console.log(err)
    })
  })
}
