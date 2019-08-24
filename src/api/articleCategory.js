import Bmob from 'hydrogen-js-sdk'
Bmob.initialize('e4d31451776823a5', '566210')

const TABLE_NAME = 'Article_Category'
const TableArticleCategory = Bmob.Query(TABLE_NAME)

export function getArticleCategory() {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.order('categoryLevel')
    TableArticleCategory.find().then((res) => {
      const category = res
      resolve(category)
    })
  })
}
