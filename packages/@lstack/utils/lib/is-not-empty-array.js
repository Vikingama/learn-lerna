/**
 * 校验：参数是数组但不为空数组
 * @param val 被判断参数
 * @returns {boolean} 是数组但不为空数组返回 true，否则 false
 */
import isArray from './is-array'

export default function isNotEmptyArray(val) {
  return isArray(val) && val.length > 0
}
