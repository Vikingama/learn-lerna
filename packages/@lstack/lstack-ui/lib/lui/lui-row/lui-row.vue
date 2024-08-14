<script>
  export default {
    name: 'LuiRow',

    componentName: 'LuiRow',

    props: {
      tag: { type: String, default: 'div' },
      gutter: Number,
      type: String,
      justify: {
        type: String,
        default: 'start',
        validator(val) {
          return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(val) !== -1
        },
      },
      align: {
        type: String,
        default: 'top',
        validator(val) {
          return ['top', 'middle', 'bottom'].indexOf(val) !== -1
        },
      },
    },
    computed: {
      style() {
        const ret = {}

        if (this.gutter) {
          ret.marginLeft = `-${this.gutter / 2}px`
          ret.marginRight = ret.marginLeft
        }

        return ret
      },
    },

    render(h) {
      return h(
        this.tag,
        {
          class: [
            'lui-row',
            'el-row',
            this.justify !== 'start' ? `is-justify-${this.justify}` : '',
            this.align !== 'top' ? `is-align-${this.align}` : '',
            { 'el-row--flex': this.type === 'flex' },
          ],
          style: this.style,
        },
        this.$slots.default
      )
    },
  }
</script>
