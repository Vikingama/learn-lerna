import isObject from './is-object'
/**
 * 将一个对象转化为键值对数组返回
 * @param obj{Object} 对象
 * @param kKey 转换后 KV 对象的键的 key
 * @param vKey 转换后 KV 对象的值的 key
 * @returns {Array} 结构为 {key,value} 的键值对数组
 */
export default function mapKvs(obj, kKey = 'key', vKey = 'value') {
  if (!isObject(obj)) return []
  return Object.keys(obj).map(key => {
    return { [kKey]: key, [vKey]: obj[key] }
  })
}
