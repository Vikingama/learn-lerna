import get from './get'
import logError from './log-error'
import isEqual from './is-equal'
import isEmpty from './is-empty'
import contains from './contains'

export default function (data, expression = {}, aMatchMode = 'KeySame') {
  const { key, operator, value, matchMode } = expression
  const cMatchMode = matchMode || aMatchMode
  if (isEmpty(operator)) return false
  let dataValue
  if (isEmpty(key)) {
    dataValue = data
  } else {
    dataValue = get(data, key, undefined)
  }
  let matched = false
  switch (operator) {
    case 'In':
      if (contains(value, dataValue, cMatchMode)) {
        matched = true
      }
      break
    case 'NotIn':
      if (!contains(value, dataValue, cMatchMode)) {
        matched = true
      }
      break
    case 'Exists':
      if (contains(dataValue, value, cMatchMode)) {
        matched = true
      }
      break
    case 'DoesNotExist':
      if (!contains(dataValue, value, cMatchMode)) {
        matched = true
      }
      break
    case 'IsEmpty':
      matched = isEmpty(dataValue)
      break
    case 'IsNotEmpty':
      matched = !isEmpty(dataValue)
      break
    case 'Equal':
      matched = cMatchMode === 'KeySame' ? dataValue === value : isEqual(dataValue, value)
      break
    case 'DoesNotEqual':
      matched = cMatchMode === 'KeySame' ? dataValue !== value : !isEqual(dataValue, value)
      break
    default:
      logError(`expression-match.js isExpressionMatched 暂不支持操作符->${operator}`)
      break
  }
  return matched
}
