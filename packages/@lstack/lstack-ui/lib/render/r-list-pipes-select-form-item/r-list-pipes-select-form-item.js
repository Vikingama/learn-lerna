import { logError } from '@lstack/utils'
import SelectFormItem from '../../compound/select-form-item'

export default {
  name: 'RListPipesSelectFormItem',
  props: {
    value: { required: true },
    placeholder: String,

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

    noMargin: Boolean,
    label: String,
    labelTip: String,
    labelWidth: String,
    prop: String,
    required: { type: Boolean, default: undefined },
    rules: [Object, Array],

    infoTipKeys: { type: Array, default: () => [] },

    // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
    beforeRefresh: Function,
    beforeRefreshAsync: Function,
    refreshDisabled: Boolean,
    refreshDisableTip: String,

    createLinkTo: {},
    createLinkText: String,
  },
  data() {
    return {
      selectFormItemOutRenderName: 'selectFormItemOutRender',
    }
  },
  computed: {
    renderProps() {
      logError('请重载该方法')
      return { enableListPagination: undefined }
    },
  },
  methods: {
    selectFormItemOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    selectFormItemInRender(createElement, sourceProps) {
      return createElement(SelectFormItem, {
        props: {
          ...this.$attrs,
          ...this.$props,
          ...this.renderProps,
          options: sourceProps.pipeList,
          isMaxPage: sourceProps.isMaxPage,
          isLoadError: sourceProps.isLoadError,
          enableLoadmore: sourceProps.enablePipeLoadmore,
          loadmoreApi: sourceProps.nextPage,
          loading: sourceProps.loading,
          reloadApi: sourceProps.refresh,

          kvMap: sourceProps.kvMap,
          refreshApi: sourceProps.refresh,
        },
        scopedSlots: {
          ...this.$scopedSlots,
          optionItem: props => this.cOptionItemSlotRender(createElement, { ...sourceProps, ...props }),
          default: props => this[this.selectFormItemOutRenderName](createElement, { ...sourceProps, ...props }),
        },
        attrs: this.$attrs,
        on: this.$listeners,
      })
    },
    cOptionItemSlotRender(createElement, sourceProps) {
      if (this.$scopedSlots.optionItem) {
        return this.$scopedSlots.optionItem(sourceProps)
      }
      return this.iOptionItemSlotRender(createElement, sourceProps)
    },
    iOptionItemSlotRender(createElement, sourceProps) {
      return undefined
    },
  },
}
