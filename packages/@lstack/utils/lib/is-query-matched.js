import logError from './log-error'
import removeAttrs from './remove-attrs'

export default function (item, query, selectionStrategy, ignoreUndefined = true) {
  let cQuery = query
  if (ignoreUndefined) {
    cQuery = removeAttrs(query, [undefined], true)
  }
  const queryKeys = Object.keys(cQuery)
  if (selectionStrategy === 'Filter') {
    return queryKeys.every(key => item[key] === cQuery[key])
  }
  if (selectionStrategy === 'Pick') {
    return queryKeys.some(key => item[key] === cQuery[key])
  }
  logError('刷选策略错误，请在 [Filter, Pick] 中选择一种策略。')
  return false
}
