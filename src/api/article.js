import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '566210')

export function getArticleSummary() {
  return new Promise(function(resolve, reject) {
    const queryArticle = Bmob.Query('Article')
    queryArticle.find().then(res => {
      const articleList = []
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
        console.log('articleList')
        console.log(articleList)
      }
      resolve(articleList.reverse())
    }).catch(err => {
      console.log(err)
      return []
    })
  })
}

// 查找文章列表，可以带参数
export function queryArticleList(config = {}) {
  return new Promise(function(resolve, reject) {
    const query = new Bmob.Query('Article')
    // if (config.columnId) {
    //   query.equalTo('columnId', config.columnId)
    // } else if (config.userId) {
    //   query.equalTo('userId', config.userId)
    // } else {
    //   query.equalTo('userId', '08dac1c847')
    // }
    // 查询所有数据
    // query.select('col', 'columnId', 'intro', 'mainTitle', 'original', 'tags', 'userId', 'wordCount')
    query.find({
      success: function(result) {
        // const articleList = []
        // for (let i = 0; i < result.length; i++) {
        //   const object = result[i].attributes
        //   object.tags = object.tags.split('，')
        //   object.ID = result[i].id
        //   object.date = result[i].createdAt
        //   object.updateDate = result[i].updatedAt
        //   articleList.push(object)
        // }
        console.log(result)
        resolve(result.reverse())
      },
      error: error => {
        console.log(error)
        reject('文章加载失败')
      }
    })
  })
}
