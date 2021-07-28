import isArray from './is-array'
import isEqual from './is-equal'
import isString from './is-string'
import logError from './log-error'
import isObject from './is-object'

/**
 * 判断字符串、数组或对象 data 中是否包含 value
 * @param data 判断的字符串、数组或对象 data
 * @param value 包含的值
 * @param matchMode
 * @returns {boolean} 是否包含指定 value。注意，如果被判断的是对象，则返回的是是否包含对应属性
 */
export default function (data, value, matchMode = 'KeySame') {
  let matched
  if (isString(data) && data.indexOf(value) !== -1) {
    matched = true
  } else if (isArray(data)) {
    if (matchMode === 'KeySame') {
      if (data.indexOf(value) !== -1) {
        matched = true
      }
    } else if (matchMode === 'KeyEqual') {
      const find = data.find(dataItem => {
        return isEqual(dataItem, value)
      })
      // 此处，find只能用undefined去判断，因为查找的 value 不排除布尔值的情况
      if (find !== undefined) {
        matched = true
      }
    } else {
      logError(`contains.js 暂不支持匹配模式 matchMode: ${matchMode}`)
    }
  } else if (isObject(data)) {
    if (Object.prototype.hasOwnProperty.call(data, value)) {
      matched = true
    }
  }
  return matched
}
