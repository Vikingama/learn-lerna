<script>
  import { Tooltip } from 'element-ui'

  export default {
    name: 'LuiTooltip',
    extends: Tooltip,
    props: {
      openDelay: { type: Number, default: 500 },
      disabled: Boolean,
      manual: Boolean,
      effect: { type: String, default: 'dark' },
      arrowOffset: { type: Number, default: 0 },
      popperClass: String,
      content: String,
      visibleArrow: { default: true },
      transition: { type: String, default: 'el-fade-in-linear' },
      popperOptions: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false,
          }
        },
      },
      enterable: { type: Boolean, default: true },
      hideAfter: { type: Number, default: 0 },
      tabindex: { type: Number, default: 0 },
    },
  }
</script>
