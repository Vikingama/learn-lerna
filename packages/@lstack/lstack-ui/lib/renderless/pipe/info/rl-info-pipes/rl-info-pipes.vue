<script>
  import RlInfoPipeFormat from '../rl-info-pipe-format'

  export default {
    name: 'RlInfoPipes',
    props: {
      info: Object,
      enablePipeFormat: { type: Boolean, default: true },
      formatApi: Function,
      processApi: Function,
    },
    data() {
      return {
        rlInfoPipesOutRenderName: 'rlInfoPipesOutRender',
      }
    },
    computed: {
      defaultScopeSlotProps() {
        return {
          enablePipeFormat: this.enablePipeFormat,
        }
      },
    },
    methods: {
      renderRlInfoPipeFormat(createElement, sourceProps) {
        return createElement(RlInfoPipeFormat, {
          props: {
            info: sourceProps.pipeInfo,
            formatApi: this.formatApi,
            processApi: this.processApi,
            disable: !this.enablePipeFormat,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeInfo: props.formattedInfo }
              return this[this.rlInfoPipesOutRenderName](createElement, resultProps)
            },
          },
          on: this.$listeners,
        })
      },
      renderPipes(createElement) {
        const resultProps = { ...this.defaultScopeSlotProps, pipeInfo: this.info }
        if (this.enablePipeFormat) {
          return this.renderRlInfoPipeFormat(createElement, resultProps)
        }
        return this[this.rlInfoPipesOutRenderName](createElement, resultProps)
      },
      rlInfoPipesOutRender(createElement, sourceProps) {
        if (this.$scopedSlots.default) {
          return this.$scopedSlots.default(sourceProps)
        }
        return undefined
      },
    },
    render(createElement) {
      return this.renderPipes(createElement)
    },
  }
</script>
