import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '566210')

const TABLE_NAME = 'Article'

export function getArticleSummary() {
  return new Promise(function(resolve, reject) {
    const TableArticle = Bmob.Query(TABLE_NAME)
    TableArticle.find().then(res => {
      const articleList = []
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        const object = {
          title: String,
          artContent: String,
          objectId: String,
          createdAt: String,
          updatedAt: String
        }
        object.title = res[i].title
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
