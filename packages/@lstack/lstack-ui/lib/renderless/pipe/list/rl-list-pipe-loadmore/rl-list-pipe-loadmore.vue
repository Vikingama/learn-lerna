<script>
  import { isNumber, isArray, isFunction, isNotEmptyArray, isEqual } from '@lstack/utils'

  export default {
    name: 'RlListPipeLoadmore',
    props: {
      list: { type: Array, default: () => [] },
      pageSize: Number,
      page: Number,
      total: Number,
      disable: Boolean,
      onPageMax: Function,
    },
    data() {
      return {
        lists: [],
        isLoadError: false,
      }
    },
    computed: {
      cPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        },
      },
      cPageSize: {
        get() {
          return this.pageSize
        },
        set(val) {
          this.$emit('update:pageSize', val)
        },
      },
      maxPage() {
        if (!isNumber(this.total) || !isNumber(this.cPageSize)) {
          return undefined
        }
        return Math.ceil(this.total / this.cPageSize)
      },
      isMaxPage() {
        if (!isNumber(this.maxPage)) return false
        return this.cPage >= this.maxPage
      },
      loadedList() {
        return this.lists.reduce((prev, current) => {
          if (!isArray(current)) return prev
          return prev.concat(current)
        }, [])
      },
      slotScopeProps() {
        return {
          loadedList: !this.disable ? this.loadedList : this.list,
          isMaxPage: this.isMaxPage,
          isLoadError: this.isLoadError,
          resetPage: this.resetPage,
          nextPage: this.nextPage,
          maxPage: this.maxPage,
        }
      },
    },
    watch: {
      cPageSize: {
        immediate: true,
        handler() {
          if (this.disable) return
          this.resetPage()
        },
      },
      cPage: {
        immediate: true,
        handler(val) {
          if (this.disable) return
          if (val <= 1) {
            this.clearLists()
          }
        },
      },
      list: {
        immediate: true,
        handler(val) {
          if (this.disable) return
          if (isNotEmptyArray(val)) {
            this.$set(this.lists, this.page - 1, val)
            this.isLoadError = false
          } else {
            this.isLoadError = true
          }
        },
      },
      loadedList: {
        handler(newVal, oldVal) {
          if (this.$listeners.loaded) {
            if (!isEqual(newVal, oldVal)) {
              this.$emit('loaded', newVal, oldVal)
            }
          }
        },
      },
    },
    methods: {
      resetPage() {
        if (this.disable) return
        this.cPage = 1
        this.clearLists()
      },
      clearLists() {
        this.lists = []
      },
      nextPage() {
        if (this.disable) return
        if (!this.isMaxPage) {
          this.cPage += 1
        } else if (isFunction(this.onPageMax)) {
          this.onPageMax(this.cPage, this.maxPage)
        }
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
