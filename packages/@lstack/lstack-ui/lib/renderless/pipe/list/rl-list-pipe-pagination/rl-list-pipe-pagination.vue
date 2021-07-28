<script>
  import { deepCopy, isArray, isEqual, isNotEmptyArray } from '@lstack/utils'

  export default {
    name: 'RlListPipePagination',
    props: {
      page: { type: Number, default: 1 },
      pageSize: { type: Number, default: 10 },
      list: { type: Array, default: () => [] },
      needClone: Boolean,
      disable: Boolean,
    },
    computed: {
      total() {
        return isArray(this.list) ? this.list.length : 0
      },
      paginatedList() {
        if (this.disable) return this.list

        const cList = this.needClone ? deepCopy(this.list) : this.list
        if (!isArray(cList)) {
          return []
        }
        if (this.total <= 0) {
          return cList
        }
        let result = cList
        if (this.page && this.pageSize) {
          const begin = (this.page - 1) * this.pageSize
          const end = this.page * this.pageSize
          result = result.slice(begin, end <= result.length ? end : result.length)
        }
        return result
      },
      slotScopeProps() {
        return {
          total: this.total,
          page: this.page,
          pageSize: this.pageSize,
          paginatedList: this.paginatedList,
        }
      },
    },
    watch: {
      paginatedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.paginated) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('paginated', newVal, oldVal)
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
