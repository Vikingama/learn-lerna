import RlInfoPipes from '../../renderless/pipe/info/rl-info-pipes'

export default {
  name: 'RApiInfoPipes',
  props: {
    enablePipeFormat: { type: Boolean, default: true },
  },
  data() {
    return {
      rlInfoPipesOutRenderName: 'rlInfoPipesOutRender',
      rlApiRequestOutRenderName: 'rlInfoPipesInRender',
    }
  },
  methods: {
    rlInfoPipesInRender(createElement, sourceProps) {
      return createElement(RlInfoPipes, {
        props: {
          ...this.$attrs,
          ...this.$props,
          info: sourceProps.info,
          formatApi: sourceProps.formatApi,
          kvMap: sourceProps.kvMap,
        },
        scopedSlots: {
          default: props => {
            const resultProps = { ...this.cSlotScopeProps, ...props }
            return this[this.rlInfoPipesOutRenderName](createElement, resultProps)
          },
        },
        attrs: this.$attrs,
        on: this.$listeners,
      })
    },
    rlInfoPipesOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
  },
}
