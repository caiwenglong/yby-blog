import Vue from 'vue'
/* 字段不能全为空白字符 */
export function isNotBlankInput(str) {
  return str && str.trim().length > 0
}

/* 合法用户名称 */
export function isvalidUsername(str) {
  const reg = /^[a-zA-Z0-9_-]+((\.)?[a-zA-Z0-9_-]+)+$/
  return reg.test(str.trim())
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/** 纯数字 */
export function validateNumber(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}
/** 不能出现汉字的 */
export function validateNoChinese(str) {
  const reg = /^[^\u4e00-\u9fa5]+$/
  return reg.test(str)
}

/** 长度不能大于1000 */
export function validateLengthForOneThousand(str) {
  if (str && str.length <= 1000) {
    return true
  } else {
    return false
  }
}
/** 地址长度不能大于 512 */
export function validateLengthForFiveThousand(str) {
  if (str && str.length <= 512) {
    return true
  } else {
    return false
  }
}
/** 长度不能大于300*/
export function validateLengthForThreeHundred(str) {
  if (str && str.length <= 300) {
    return true
  } else {
    return false
  }
}
/** 输入名称长度 不能大于100 */
export function validateLengthForOneHundred(str) {
  if (str && str.length <= 100) {
    return true
  } else {
    return false
  }
}
/** 长度不能超过64 */
export function validateLengthForSixtyFor(str) {
  if (str && str.length <= 64) {
    return true
  } else {
    return false
  }
}
/** 长度不能超过32 */
export function validateLengthForThirtyTwo(str) {
  if (str && str.length <= 32) {
    return true
  } else {
    return false
  }
}
/** 长度不能超过16 */
export function validateLengthForSixteen(str) {
  if (str && str.length <= 16) {
    return true
  } else {
    return false
  }
}
/** 电话号码 */
export function isvalidPhone(str) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(str)
}
/** 货币 */
export function ismoney(str) {
  const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
  return reg.test(str)
}

/** email校验 */
export function isvalidEmail(str) {
  const reg = /^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return reg.test(str)
}

/** 身份证校验 */
export function isvalidIdCard(str) {
  const reg = /^[1-9]{1}[0-9]{5}(19|20)[0-9]{2}((0[1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|([1-2]{1}[0-9]{1}|(3[0-1]{1})))[0-9]{3}[0-9xX]{1}$/
  return reg.test(str)
}

export function validateRequire(rule, value, callback) {

}
