import isObject from './is-object'
import isArray from './is-array'

/**
 * 移除对象含指定属性值的属性
 * @param sourceObject 源对象
 * @param values 指定属性值
 * @param returnNewObj 是否返回新对象
 * @returns {*}
 */
export default function removeAttrs(sourceObject, values, returnNewObj) {
  if (!isObject(sourceObject) || !isArray(values)) return sourceObject

  const result = returnNewObj ? { ...sourceObject } : sourceObject
  Object.keys(sourceObject).forEach(key => {
    if (values.indexOf(sourceObject[key]) !== -1) {
      delete result[key]
    }
  })
  return result
}
