/**
 * 判断是否为空，含空对象、空数组、空字符
 * @param val
 * @returns {boolean}
 */
import isObject from './is-object'
import isEmptyObject from './is-empty-object'
import isArray from './is-array'
import isEmptyArray from './is-empty-array'
import isEmptyText from './is-empty-text'
import isText from './is-text'

export default function isEmpty(val) {
  if (isObject(val)) {
    return isEmptyObject(val)
  }
  if (isArray(val)) {
    return isEmptyArray(val)
  }
  if (isText(val)) {
    return isEmptyText(val)
  }
  return val === undefined
}
