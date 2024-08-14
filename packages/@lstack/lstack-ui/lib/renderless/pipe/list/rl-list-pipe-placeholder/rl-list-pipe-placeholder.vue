<script>
  import { isArray, isEqual, isFunction, isNotEmptyArray, logError } from '@lstack/utils'

  export default {
    name: 'RlListPipePlaceholder',
    props: {
      list: { type: Array, default: () => [] },
      listPlaceholder: { default: undefined },
      listPlacedApi: {
        type: Function,
        default: (list = [], placeholder) => {
          const source = isArray(list) ? list : []
          return placeholder === undefined ? source : [placeholder].concat(source)
        },
      },
      disable: Boolean,
    },
    computed: {
      placedList() {
        if (this.disable) return this.list
        if (!isFunction(this.listPlacedApi)) return this.list
        const result = this.listPlacedApi(this.list, this.listPlaceholder)
        if (!isArray(result)) {
          logError(`${this.$vnode.tag}，listPlacedApi 执行结果为${result}，请确保该 api 函数返回一个数组`)
          return this.list
        }
        return result
      },
      slotScopeProps() {
        return { placedList: this.placedList }
      },
    },
    watch: {
      placedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.placed) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('placed', newVal, oldVal)
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
