import { isArray, isEmptyText, isFunction, logError } from '@lstack/utils'
import BaseView from './base-view'

export default {
  name: 'BaseSubFormView',
  extends: BaseView,
  props: {
    value: { type: Object, required: true },
    baseProp: String,
    validateFieldApi: Function,
  },
  methods: {
    obtainProp(subProp) {
      if (isEmptyText(this.baseProp)) {
        logError('执行 obtainProp 时，baseProp 为空，请提供 baseProp')
        return undefined
      }
      return `${this.baseProp}.${subProp}`
    },
    validateField(subProps) {
      if (!isFunction(this.validateFieldApi)) {
        logError('validateFieldApi 不是一个函数，请确认 validateFieldApi 参数')
        return false
      }
      let props
      if (isArray(subProps)) {
        props = subProps.map(subProp => {
          return this.obtainProp(subProp)
        })
      } else {
        props = this.obtainProp(subProps)
      }
      return this.validateFieldApi(props)
    },
  },
}
