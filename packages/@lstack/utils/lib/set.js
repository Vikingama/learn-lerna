import set from 'lodash.set'
import isEmpty from './is-empty'

export default function (object, path, value, ignoreEmpty = false) {
  if (!ignoreEmpty) {
    set(object, path, value)
  } else if (!isEmpty(value)) {
    set(object, path, value)
  }
}
