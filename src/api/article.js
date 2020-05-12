import Bmob from 'hydrogen-js-sdk'
import { reverse, remove, forEach } from 'lodash'
Bmob.initialize('e4d31451776823a5', '666666');

const TABLE_NAME = 'Article';
const TableArticle = Bmob.Query(TABLE_NAME);

export function apiGetArticleSummary(categoryName, currentPage, pageSize) {
  return new Promise(function(resolve, reject) {
    let skipTotal;
    if (currentPage > 0) {
      skipTotal = (currentPage - 1) * pageSize
    } else {
      skipTotal = 0
    }
    if (categoryName !== 'ALL') {
      TableArticle.equalTo('category', '==', categoryName)
    }
    TableArticle.skip(skipTotal);
    TableArticle.limit(pageSize);
    TableArticle.order('-artLevel', '-updatedAt');
    TableArticle.find().then(res => {
      const articleList = []
      for (let i = 0; i < res.length; i++) {
        const object = {
          title: String,
          artSummary: String,
          artContent: String,
          artTags: [],
          clicks: Number,
          objectId: String,
          createdAt: String,
          updatedAt: String
        };
        object.title = res[i].title;
        object.artSummary = res[i].artSummary;
        object.artContent = res[i].artContent;
        object.artTags = res[i].artTags;
        object.clicks = res[i].clicks ? res[i].clicks : 0;
        object.objectId = res[i].objectId;
        object.createdAt = res[i].createdAt;
        object.updatedAt = res[i].updatedAt;
        articleList.push(object)
      }
      reverse(articleList);
      resolve(articleList.reverse())
    }).catch(err => {
      console.log(err);
      return []
    })
  })
}

export function apiGetArticleTotal() {
  return new Promise(function(resolve, reject) {
    TableArticle.count().then(res => {
      const total = res;
      resolve(total)
    }).catch(err => {
      console.log(err)
    })
  })
}

export function apiGetArticleDetails(artId) {
  return new Promise(function(resolve, reject) {
    TableArticle.get(artId).then(res => {
      res.clicks = res.clicks ? res.clicks : 0;
      res.set('clicks', res.clicks + 1);
      res.save();
      const singleArticleDetails = res;
      resolve(singleArticleDetails)
    }).catch(err => {
      console.log(err)
    })
  })
}

export function apiDeleteArticle(artId) {
  return new Promise(function(resolve, reject) {
    TableArticle.destroy(artId).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err);
      console.log(err);
    })
  })
}

export function apiBatchesDeleteArticle(categoryArr) {
  return new Promise((resolve, reject) => {
    TableArticle.find().then(res => {
      if(!Array.isArray(categoryArr)) {
        categoryArr = [categoryArr];
      }
      forEach(categoryArr, category => {
        remove(res, article => {
          return article.category !== category
        });
      });

      if(res.length) {
        res.destroyAll().then(destroyRes => {
          resolve(destroyRes)
        }).catch(err => {
          console.log('数据库删除文章错误！' + err);
        })
      }
    }).catch(err => {
      reject(err);
    })
  })
}
