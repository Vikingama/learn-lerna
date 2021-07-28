import checkType from './check-type'

/**
 * 判断指定 val 是否为函数
 * @param val
 * @returns {boolean}
 */
export default function isFunction(val) {
  return checkType(val, 'Function')
}
