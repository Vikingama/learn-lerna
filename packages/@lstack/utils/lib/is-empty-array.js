/**
 * 校验：参数是数组且为空数组
 * @param val 被判断参数
 * @returns {boolean} 是否为空数组。注意：如果传入的判断对象非 Array 类型，如 undefined，这里不认为是空数组
 */
import isArray from './is-array'

export default function isEmptyArray(val) {
  return isArray(val) && val.length <= 0
}
