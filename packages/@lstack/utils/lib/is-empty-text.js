/**
 * 判断是否为空字符，基础数据类型
 * @param val
 * @returns {boolean}
 */
import isText from './is-text'

export default function isEmptyText(val) {
  if (!isText(val)) return false
  return val === undefined || val === null || val === ''
}
