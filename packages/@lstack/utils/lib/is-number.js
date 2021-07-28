import checkType from './check-type'

/**
 * 判断指定 val 是否为 Number 类型
 * @param val
 * @returns {boolean}
 */
export default function isNumber(val) {
  return checkType(val, 'Number')
}
