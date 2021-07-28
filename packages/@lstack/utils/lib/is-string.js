import checkType from './check-type'

/**
 * 判断指定 val 是否为字符串
 * @param val
 * @returns {boolean}
 */
export default function isString(val) {
  return checkType(val, 'String')
}
