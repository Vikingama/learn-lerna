<script>
  import {
    deepCopy,
    isEmpty,
    isArray,
    isObject,
    isFunction,
    flag2hump,
    isQueryMatched,
    isExpressionsMatched,
    isEqual,
  } from '@lstack/utils'

  export default {
    name: 'RlListPipePick',
    props: {
      list: { type: Array, default: () => [] },
      needClone: Boolean,
      expressions: { type: [Array, Object], default: () => [] },
      query: Object,
      searchKey: String,
      searchValue: String,
      expressionMatchMode: String,
      disable: Boolean,
      disableQueryTransform: Boolean,
      attrsTransformApi: { type: Function, default: flag2hump },
    },
    computed: {
      aQuery() {
        if (this.disable) return undefined

        const attrsQueryKvs = Object.keys(this.$attrs)
          .filter(key => {
            return key.startsWith('query-')
          })
          .map(key => {
            let resultKey = key.replace('query-', '')
            if (!this.disableQueryTransform && isFunction(this.attrsTransformApi)) {
              resultKey = this.attrsTransformApi(resultKey)
            }
            return { key: resultKey, value: this.$attrs[key] }
          })
        const result = {}
        attrsQueryKvs.forEach(kv => {
          if (kv.value !== undefined) {
            result[kv.key] = kv.value
          }
        })
        return result
      },
      cQuery() {
        if (this.disable) return this.query

        return isObject(this.query) ? this.query : this.aQuery
      },
      aExpressions() {
        if (this.disable) return []

        if (isEmpty(this.searchKey) || isEmpty(this.searchValue)) return []
        return [{ key: this.searchKey, operator: 'Exists', value: this.searchValue }]
      },
      cExpressions() {
        if (this.disable) return this.expressions

        if (isArray(this.expressions)) {
          return this.expressions.concat(this.aExpressions)
        }
        if (isObject(this.expressions)) {
          return [this.expressions].concat(this.aExpressions)
        }
        return this.aExpressions
      },
      pickedList() {
        if (this.disable) return this.list

        const cList = this.needClone ? deepCopy(this.list) : this.list
        return cList.filter(item => {
          return (
            isQueryMatched(item, this.cQuery, 'Pick') ||
            isExpressionsMatched(item, this.cExpressions, this.expressionMatchMode, 'Pick')
          )
        })
      },
      slotScopeProps() {
        return { pickedList: this.pickedList }
      },
    },
    watch: {
      pickedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.picked) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('picked', newVal, oldVal)
            }
          }
        },
      },
    },
    render() {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(this.slotScopeProps)
      }
      return undefined
    },
  }
</script>
