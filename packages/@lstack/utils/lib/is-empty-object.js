/**
 * 判断一个对象忽略指定属性值的属性后，是否为空对象。
 * @param val 被判断对象
 * @param ignoreValues 忽略的属性值数组
 * @returns {boolean} 是否为空对象。注意：如果传入的判断对象非 Object 类型，如 undefined，这里不认为是空对象
 */
import isObject from './is-object'
import isArray from './is-array'
import removeAttrs from './remove-attrs'

export default function isEmptyObject(val, ignoreValues) {
  if (!isObject(val)) return false
  let cVal = val
  if (isArray(ignoreValues)) {
    cVal = removeAttrs(val, ignoreValues, true)
  }
  return Object.keys(cVal).length <= 0
}
