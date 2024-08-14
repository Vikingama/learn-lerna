import { logError } from '@lstack/utils'
import { SelectableButton } from '../../compound'

export default {
  name: 'RListPipesSelectableButton',
  props: {
    value: { required: true },

    optionDisable: { type: Function, default: (optionValue, option) => false },
    optionValueKey: String,
    optionLabelKey: String,
    selectValueKey: String,
    labelMapApi: Function,
    valueUpdateImmediate: Boolean,
    valueUpdateMode: String,
    valueUpdateKey: [String, Array],
    valueInitializeApi: Function,
    valueInitializeMode: String,
    multiple: Boolean,
    watchOnlyNotEqual: Boolean,
    marginBottom: Boolean,
  },
  data() {
    return {
      selectableButtonOutRenderName: 'selectableButtonOutRender',
    }
  },
  computed: {
    renderProps() {
      logError('请重载该方法')
      return { enableListPagination: undefined }
    },
  },
  methods: {
    selectableButtonOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    selectableButtonInRender(createElement, sourceProps) {
      return createElement(SelectableButton, {
        props: {
          ...this.$attrs,
          ...this.$props,
          ...this.renderProps,
          options: sourceProps.pipeList,
          loading: sourceProps.loading,
        },
        scopedSlots: {
          ...this.$scopedSlots,
          default: props => this[this.selectableButtonOutRenderName](createElement, { ...sourceProps, ...props }),
        },
        attrs: this.$attrs,
        on: this.$listeners,
      })
    },
  },
}
