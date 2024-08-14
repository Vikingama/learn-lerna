import checkType from './check-type'

/**
 * 判断指定 val 是否为可展示基础数据类型
 * @param val
 * @returns {boolean}
 */
export default function isText(val) {
  return (
    checkType(val, 'Null') ||
    checkType(val, 'Undefined') ||
    checkType(val, 'Boolean') ||
    checkType(val, 'Number') ||
    checkType(val, 'BigInt') ||
    checkType(val, 'String')
  )
}
