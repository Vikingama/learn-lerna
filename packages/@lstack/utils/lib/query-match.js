import isArray from './is-array'
import isObject from './is-object'
import isQueryMatched from './is-query-matched'

/**
 * 通过 query 对象的键值对过滤数组中与其匹配的数据并返回
 * @param list 原始数据数组
 * @param query 包含过滤条件的键值对对象
 * @param selectionStrategy 刷选策略 Filter, Pick
 * @param ignoreUndefined 是否忽略 query 中值为 undefined 的匹配项
 * @returns {Array} 过滤后的数据数组
 */
export default function (list, query, selectionStrategy = 'Filter', ignoreUndefined = true) {
  if (!isArray(list)) return []
  if (!isObject(query)) return selectionStrategy === 'Pick' ? [] : list
  return list.filter(item => {
    return isQueryMatched(item, query, selectionStrategy, ignoreUndefined)
  })
}
