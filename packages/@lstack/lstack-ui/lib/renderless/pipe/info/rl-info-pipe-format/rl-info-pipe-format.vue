<script>
  import { isFunction, isObject } from '@lstack/utils'

  export default {
    name: 'RlInfoPipeFormat',
    props: {
      info: Object,
      formatApi: Function,
      processApi: Function,
      disable: Boolean,
    },
    computed: {
      formattedInfo() {
        if (this.disable) return this.info

        if (!isFunction(this.formatApi) || !isObject(this.info)) return this.info

        const formatted = this.formatApi(this.info)
        if (!isFunction(this.processApi)) return formatted
        return this.processApi(formatted)
      },
      slotScopeProps() {
        return { formattedInfo: this.formattedInfo, formatApi: this.formatApi }
      },
    },
    watch: {
      formattedInfo: {
        handler(newVal, oldVal) {
          this.$emit('formatted', newVal, oldVal)
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
