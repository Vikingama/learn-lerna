import queryMatch from './query-match'

export default function (list, query, ignoreUndefined = true) {
  return queryMatch(list, query, 'Pick', ignoreUndefined)
}
