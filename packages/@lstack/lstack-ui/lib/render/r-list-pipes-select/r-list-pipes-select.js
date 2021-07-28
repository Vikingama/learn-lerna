import { logError } from '@lstack/utils'
import LuiSelect from '../../lui/lui-select'

export default {
  name: 'RListPipesSelect',
  props: {
    value: { required: true },

    optionDisable: Function,
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

    filterable: Boolean,
    allowCreate: Boolean,
    filterMethod: Function,
    optionCreateMethod: Function,
  },
  data() {
    return {
      luiSelectOutRenderName: 'luiSelectOutRender',
    }
  },
  computed: {
    renderProps() {
      logError('请重载该方法')
      return {
        enableListPagination: undefined,
      }
    },
  },
  methods: {
    luiSelectOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    luiSelectInRender(createElement, sourceProps) {
      return createElement(LuiSelect, {
        props: {
          ...this.$attrs,
          ...this.$props,
          ...this.renderProps,
          options: sourceProps.pipeList,
          isMaxPage: sourceProps.isMaxPage,
          isLoadError: sourceProps.isLoadError,
          enableLoadmore: sourceProps.enablePipeLoadmore,
          loadmoreApi: sourceProps.nextPage,
          reloadApi: sourceProps.refresh,
          loading: sourceProps.loading,
        },
        scopedSlots: {
          ...this.$scopedSlots,
          default: props => this[this.luiSelectOutRenderName](createElement, { ...sourceProps, ...props }),
        },
        attrs: this.$attrs,
        on: this.$listeners,
      })
    },
  },
}
