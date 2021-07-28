<script>
  import RlForward from '../../renderless/rl-forward'
  import LuiLink from '../../lui/lui-link'

  export default {
    name: 'ForwardLink',
    extends: RlForward,
    props: {
      theme: String,
      type: String,
      disabled: Boolean,
      external: Boolean,
      underline: { type: Boolean, default: true },
    },
    render(createElement) {
      return createElement(LuiLink, {
        props: {
          ...this.$props,
          ...this.$attrs,
          to: undefined,
        },
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots,
        on: {
          click: this.forward,
          ...this.$listeners,
        },
      })
    },
  }
</script>
