<script>
  import { isArray, isObject } from '@lstack/utils'

  export default {
    name: 'RlDynamicTableColumns',
    props: {
      kvMap: Object,
      keys: {
        type: Array,
        default() {
          return []
        },
      },
    },
    computed: {
      kvArray() {
        if (!isObject(this.kvMap)) {
          return []
        }
        return Object.keys(this.kvMap).map(key => {
          return { prop: key, label: this.kvMap[key], enable: this.isKeyEnable(key) }
        })
      },
      slotScopeProps() {
        return { kvArray: this.kvArray }
      },
    },
    methods: {
      isKeyEnable(key) {
        const { keys } = this
        if (!isArray(keys) || keys.length <= 0) return true
        return keys.indexOf(key) !== -1
      },
    },
    render(createElement) {
      if (this.$scopedSlots.default) {
        return createElement(
          // 由于无法 render 多个子组件，所以这里使用无意义的 div 裹一层
          // 由于 el-table 的实现逻辑，这里的 div 会渲染在 hidden-columns 布局下，不可见亦即无意义
          'div',
          this.$scopedSlots.default(this.slotScopeProps)
        )
      }
      return undefined
    },
  }
</script>
