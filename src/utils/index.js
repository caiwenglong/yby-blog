/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function getAbsoluteAppUrl(uri) {
  const len = process.env.APP_BASE_API && process.env.APP_BASE_API.length
  const prefix = process.env.APP_BASE_API.substring(len - 1, len) === '/' ? process.env.APP_BASE_API : process.env.APP_BASE_API + '/'
  uri = (uri && uri[0] === '/') ? uri.slice(1) : uri
  return prefix + uri
}

export function getAbsoluteProductPicURI(uri) {
  const len = process.env.PD_IMG_PREFIX && process.env.PD_IMG_PREFIX.length
  const prefix = process.env.PD_IMG_PREFIX.substring(len - 1, len) === '/' ? process.env.PD_IMG_PREFIX : process.env.PD_IMG_PREFIX + '/'
  uri = (uri && uri[0] === '/') ? uri.slice(1) : uri
  return prefix + uri
}

export function getAbsoluteDocURI(uri) {
  const len = process.env.BASE_API && process.env.BASE_API.length
  const prefix = process.env.BASE_API.substring(len - 1, len) === '/' ? process.env.BASE_API : process.env.BASE_API + '/'
  uri = (uri && uri[0] === '/') ? uri.slice(1) : uri
  return prefix + uri
}

/**
 * 将已打平的具有父、子关系数据按树型计算数据项所在层级
 * @param {*} list  需要处理的打平结构数据
 * @param {*} curLevel 当前处理层级
 * @param {*} prop 当前层级属性
 * @param {*} parentProp 父层级属性
 * @param {*} parentValue 父层级标志值
 */
export function parseItemLevel(list, curLevel, prop, parentProp, parentValue) {
  list && list.forEach((item) => {
    if (item[parentProp] == parentValue) { //eslint-disable-line
      item.level = curLevel
      parseItemLevel(list, curLevel + 1, prop, parentProp, item[prop])
    }
  })
  return list
}

// list = [
//   {no: 1, parentNo: 0, name: 'top1'},
//   {no: 2, parentNo: 0, name: 'top2'},
//   {no: 21, parentNo: 2, name: 'second21'},
//   {no: 3, parentNo: 0, name: 'top3'},
//   {no: 22, parentNo: 2, name: 'second22'},
//   {no: 221, parentNo: 22, name: 'third221'},
//   {no: 4, parentNo: 0, name: 'top4'}
// ]

