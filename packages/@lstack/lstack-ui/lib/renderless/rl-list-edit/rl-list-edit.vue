<script>
  import { deepCopy, isArray, isEmptyArray, isFunction } from '@lstack/utils'

  export default {
    name: 'RlListEdit',
    props: {
      value: { type: Array, default: () => [] },
      // TODO: 异步钩子的支持，返回值反了，默认不拦截 by 吴斌
      // 返回值为 true 表示继续
      beforeEdit: Function,
      beforeInsert: Function,
      beforeAdd: Function,
      beforeRemove: Function,
      beforeReset: Function,
      beforeReplace: Function,
      initValue: Boolean,
      emptyItem: {},
    },
    computed: {
      cValue: {
        set(val) {
          this.$emit('input', val)
          this.$emit('change', val)
        },
        get() {
          return this.value
        },
      },
      slotScopeProps() {
        return {
          add: this.add,
          insert: this.insert,
          remove: this.remove,
          reset: this.reset,
          replace: this.replace,
          editList: this.cValue,
          listLength: this.listLength,
          isListEmpty: this.listLength <= 0,
        }
      },
      listLength() {
        if (!isArray(this.cValue)) return 0
        return this.cValue.length
      },
    },
    // watch: {
    //   list: {
    //     handler(newVal, oldVal) {
    //       this.$emit('change', newVal, oldVal)
    //     },
    //   },
    // },
    mounted() {
      if (this.initValue && isEmptyArray(this.cValue)) {
        this.cValue.push(this.newItem())
      }
    },
    methods: {
      newItem() {
        if (isFunction(this.emptyItem)) {
          return this.emptyItem()
        }
        return deepCopy(this.emptyItem)
      },
      insert(index, item) {
        if (isFunction(this.beforeInsert) && !this.beforeInsert()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Insert')) return false
        this.cValue.splice(
          index !== undefined ? index : this.cValue.length,
          0,
          item !== undefined ? deepCopy(item) : this.emptyItem
        )
        return true
      },
      add() {
        if (isFunction(this.beforeAdd) && !this.beforeAdd()) return undefined
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Add')) return undefined
        const newItem = this.newItem()
        this.cValue.push(newItem)
        return newItem
      },
      remove(index) {
        if (isFunction(this.beforeRemove) && !this.beforeRemove()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Remove')) return false
        this.cValue.splice(index !== undefined ? index : this.cValue.length - 1, 1)
        return true
      },
      reset() {
        if (isFunction(this.beforeReset) && !this.beforeReset()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Reset')) return false
        this.cValue.length = 0
        if (this.initValue) {
          this.cValue.push(this.newItem())
        }
        return true
      },
      replace(index, item) {
        if (isFunction(this.beforeReplace) && !this.beforeReplace()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Replace')) return false
        this.$set(this.cValue, index, item)
        return true
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
