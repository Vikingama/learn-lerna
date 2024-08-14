<script>
  import { deepCopy, isArray, isFunction } from '@lstack/utils'

  export default {
    name: 'RlEditableList',
    model: { prop: 'list', event: 'change' },
    props: {
      list: { type: Array, default: () => [] },
      // 返回值为 true 表示继续
      beforeEdit: Function,
      beforeInsert: Function,
      beforeAdd: Function,
      beforeRemove: Function,
      beforeReset: Function,
      initValue: Boolean,
      emptyItem: {},
    },
    computed: {
      slotScopeProps() {
        return {
          add: this.add,
          insert: this.insert,
          remove: this.remove,
          reset: this.reset,
          editList: this.list,
          listLength: this.listLength,
          isListEmpty: this.listLength <= 0,
        }
      },
      listLength() {
        if (!isArray(this.list)) return 0
        return this.list.length
      },
    },
    watch: {
      list: {
        handler(newVal, oldVal) {
          this.$emit('change', newVal, oldVal)
        },
      },
    },
    mounted() {
      if (this.initValue) {
        this.list.push(deepCopy(this.emptyItem))
      }
    },
    methods: {
      insert(index, item) {
        if (isFunction(this.beforeInsert) && !this.beforeInsert()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Insert')) return false
        this.list.splice(
          index !== undefined ? index : this.list.length,
          0,
          deepCopy(item !== undefined ? item : this.emptyItem)
        )
        return true
      },
      add() {
        if (isFunction(this.beforeAdd) && !this.beforeAdd()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Add')) return false
        this.list.push(deepCopy(this.emptyItem))
        return true
      },
      remove(index) {
        if (isFunction(this.beforeRemove) && !this.beforeRemove()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Remove')) return false
        this.list.splice(index !== undefined ? index : this.list.length - 1, 1)
        return true
      },
      reset() {
        if (isFunction(this.beforeReset) && !this.beforeReset()) return false
        if (isFunction(this.beforeEdit) && !this.beforeEdit('Reset')) return false
        this.list.length = 0
        if (this.initValue) {
          this.list.push(deepCopy(this.emptyItem))
        }
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
