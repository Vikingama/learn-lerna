import isExpressionMatched from './is-expression-matched'
import isExpressionsMatched from './is-expressions-matched'
import isArray from './is-array'
import isObject from './is-object'

/**
 * @param list
 * @param expressions In, NotIn, Exists, DoesNotExist, IsEmpty, IsNotEmpty, Equal, DoesNotEqual
 * @param matchMode KeySame, KeyEqual
 * @param selectionStrategy Filter, Pick
 * @returns {*[]|*}
 */
export default function (list, expressions, matchMode, selectionStrategy = 'Filter') {
  if (!isArray(list)) return []
  if (!isArray(expressions) && !isObject(expressions)) return selectionStrategy === 'Pick' ? [] : list
  if (isObject(expressions)) {
    return list.filter(item => {
      return isExpressionMatched(item, expressions, matchMode)
    })
  }
  return list.filter(item => {
    return isExpressionsMatched(item, expressions, matchMode, selectionStrategy)
  })
}
