import Bmob from 'hydrogen-js-sdk';
import { uuId } from '../utils/tools/tools-common';
import { remove } from 'lodash'

Bmob.initialize('e4d31451776823a5', '666666');

const TABLE_NAME = 'Article_Category';
const TableArticleCategory = Bmob.Query(TABLE_NAME);

/*
*   得到指定一级菜单的底下的所有分类
* */
export function apiGetCollectionCategory(objectId) {
  return new Promise((resolve, reject) => {
    TableArticleCategory.find().then((res) => {
      remove(res, category => {
        return category.parentId !== objectId
      });
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/*
*   得到所有的文章分类
* */
export function apiGetArticleCategory() {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.order('-createdAt');
    TableArticleCategory.find().then((res) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function apiInsertArticleCollection(form) {
  return new Promise(function(resolve, reject) {
    const uuid = uuId(8, 16);
    TableArticleCategory.set('parentId', '0');
    TableArticleCategory.set('name', form.name);
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
export function apiInsertArticleCategory(form) {
  return new Promise(function(resolve, reject) {
    const uuid = uuId(8, 16);
    TableArticleCategory.set('parentId', form.objectId);
    TableArticleCategory.set('name', form.name);
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

export function apiUpdateArticleCategory(form) {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.get(form.objectId).then(res => {
      res.set('name', form.name)
      res.save();
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  })
}

export function apiDeleteArticleCategory(objectId) {
  return new Promise(function(resolve, reject) {
    TableArticleCategory.get(objectId).then(res => {
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

export function apiBatchesDeleteCategory(objectId) {
  return new Promise((resolve, reject) => {
    TableArticleCategory.find().then((res) => {
      remove(res, item => {
        return item.parentId !== objectId;
      });
      if(res.length) {
        res.destroyAll().then(destroyRes => {
          resolve(destroyRes)
        }).catch(err => {
          reject(err);
          console.log('数据库删除数据错误！' + err);
        })
      } else {
        resolve({msg: 'ok', info: '没有可删除的文章'});
      }
    }).catch(err => {
      console.log('数据库查找数据错误！' + err);
      reject(err);
    })
  })
}
