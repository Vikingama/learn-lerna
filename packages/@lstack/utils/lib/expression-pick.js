import expressionMatch from './expression-match'

export default function (list, expressions, matchMode) {
  return expressionMatch(list, expressions, matchMode, 'Pick')
}
