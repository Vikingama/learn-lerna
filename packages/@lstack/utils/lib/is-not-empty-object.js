/**
 * 校验：忽略指定属性键的属性后，是对象，但不是空对象
 * @param val 被判断参数
 * @param ignoreValues 忽略的属性键数组
 * @returns {boolean} 是对象，但不是空对象，则返回 true，否则返回 false
 */
import isObject from './is-object'
import isArray from './is-array'
import removeAttrs from './remove-attrs'

export default function isNotEmptyObject(val, ignoreValues) {
  if (!isObject(val)) return false
  let cVal = val
  if (isArray(ignoreValues)) {
    cVal = removeAttrs(val, ignoreValues, true)
  }
  return Object.keys(cVal).length > 0
}
