import checkType from './check-type'

/**
 * 判断指定 val 是否为对象
 * @param val
 * @returns {boolean}
 */
export default function isObject(val) {
  return checkType(val, 'Object')
}
