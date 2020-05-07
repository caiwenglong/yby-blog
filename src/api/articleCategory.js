import Bmob from 'hydrogen-js-sdk'
import { uuId } from '../utils/tools/tools-common'

Bmob.initialize('e4d31451776823a5', '666666');

const TABLE_NAME = 'Article_Category';
const TableArticleCategory = Bmob.Query(TABLE_NAME);

export function apiGetArticleCategory() {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.order('categoryLevel');
    TableArticleCategory.find().then((res) => {
      resolve(res)
    })
  })
}

export function apiInsertArticleCategory(collectionForm) {
  return new Promise(function(resolve, reject) {
    const uuid = uuId(8, 16);
    TableArticleCategory.set('parentId', collectionForm.objectId);
    TableArticleCategory.set('name', collectionForm.collectionName);
    TableArticleCategory.set('url', uuid);
    TableArticleCategory.set('category', uuid);
    TableArticleCategory.save().then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
      console.log(err);
    })
  })
}

export function apiUpdateArticleCategory(collectionForm) {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.get(collectionForm.objectId).then(res => {
      res.set('name', collectionForm.collectionName)
      res.save();
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  })
}

export function apiDeleteArticleCategory(collectionForm) {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.get(collectionForm.objectId).then(res => {
      res.destroy().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err)
      });
    }).catch(err => {
      reject(err);
    });
  })
}
