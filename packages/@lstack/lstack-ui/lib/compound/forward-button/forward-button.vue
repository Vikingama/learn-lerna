<script>
  import RlForward from '../../renderless/rl-forward'
  import LuiButton from '../../lui/lui-button'

  export default {
    name: 'ForwardButton',
    extends: RlForward,
    render(createElement) {
      return createElement(LuiButton, {
        props: { ...this.$props, ...this.$attrs },
        scopedSlots: this.$scopedSlots,
        on: {
          click: this.forward,
          ...this.$listeners,
        },
      })
    },
  }
</script>
