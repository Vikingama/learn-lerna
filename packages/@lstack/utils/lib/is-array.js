import checkType from './check-type'

/**
 * 判断指定 val 是否为数组
 * @param val
 * @returns {boolean}
 */
export default function isArray(val) {
  return checkType(val, 'Array')
}
