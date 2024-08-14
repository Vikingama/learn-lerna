import logError from './log-error'
import isExpressionMatched from './is-expression-matched'

export default function (item, expressions, matchMode, selectionStrategy) {
  if (selectionStrategy === 'Filter') {
    return expressions.every(expression => isExpressionMatched(item, expression, matchMode))
  }
  if (selectionStrategy === 'Pick') {
    return expressions.some(expression => isExpressionMatched(item, expression, matchMode))
  }
  logError('刷选策略错误，请在 [Filter, Pick] 中选择一种策略。')
  return false
}
