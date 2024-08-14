<script>
  import { isArray, isEqual, isFunction, isNotEmptyArray } from '@lstack/utils'

  export default {
    name: 'RlListPipeFormat',
    props: {
      list: { type: Array, default: () => [] },
      formatApi: Function,
      processApi: Function,
      disable: Boolean,
    },
    computed: {
      formattedList() {
        if (this.disable) return this.list

        if (!isFunction(this.formatApi) || !isArray(this.list)) return this.list

        const formatted = this.list.map(item => this.formatApi(item))
        if (!isFunction(this.processApi)) return formatted
        return formatted.map(item => this.processApi(item))
      },
      slotScopeProps() {
        return { formattedList: this.formattedList, formatApi: this.formatApi }
      },
    },
    watch: {
      formattedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.formatted) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('formatted', newVal, oldVal)
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
