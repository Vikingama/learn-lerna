/**
 * 校验：是基础数据类型，但不是空字符
 * @param val
 * @returns {boolean}
 */
import isText from './is-text'

export default function isNotEmptyText(val) {
  if (!isText(val)) return false
  return val !== undefined && val !== null && val !== ''
}
