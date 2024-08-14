import isArray from './is-array'
import isNotEmptyText from './is-not-empty-text'
/**
 * 将键值对数组转化为一个对象返回
 * @returns obj{Object} 对象
 * @param kvs
 * @param kKey KV 对象 kKey 转换前的键的 key
 * @param vKey KV 对象 kKey 转换前的值的 key
 */
export default function kvs2map(kvs, kKey = 'key', vKey = 'value') {
  if (!isArray(kvs)) return {}
  return kvs.reduce((prev, cur) => {
    const key = cur[kKey]
    if (isNotEmptyText(key)) {
      prev[key] = cur[vKey]
    }
    return prev
  }, {})
}
