<script>
  import { deepCopy, isEqual, isNotEmptyArray } from '@lstack/utils'

  export default {
    name: 'RlListPipeSort',
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      needClone: Boolean,
      disable: Boolean,
    },
    computed: {
      sortedList() {
        if (this.disable) return this.list

        return this.needClone ? deepCopy(this.list) : this.list
      },
      slotScopeProps() {
        return { sortedList: this.sortedList }
      },
    },
    watch: {
      sortedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.sorted) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('sorted', newVal, oldVal)
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
