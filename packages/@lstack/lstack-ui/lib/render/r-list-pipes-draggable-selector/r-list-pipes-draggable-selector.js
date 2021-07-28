import { logError } from '@lstack/utils'
import DraggableSelector from '../../compound/draggable-selector'

export default {
  name: 'RListPipesDraggableSelector',
  props: {
    value: Array,

    optionDisable: Function,
    optionLabelKey: String,
    selectValueKey: String,
    labelMapApi: [Object, Array, Function],
    valueUpdateImmediate: Boolean,
    valueUpdateMode: String,
    valueUpdateKey: [String, Array],
    valueInitializeApi: Function,
    valueInitializeMode: String,
    optionPropertiesBackupKeys: [String, Array],
    optionPropertiesBackupApi: Function,
    watchOnlyNotEqual: Boolean,
    clearValueBeforeDestroy: Boolean,

    leftTitle: String,
    leftTitleTip: String,
    rightTitle: String,
    rightTitleTip: String,

    // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
    beforeRefresh: Function,
    beforeRefreshAsync: Function,
    refreshDisabled: Boolean,
    refreshDisableTip: String,
  },
  data() {
    return {
      draggableSelectorOutRenderName: 'draggableSelectorOutRender',
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
    draggableSelectorOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    draggableSelectorInRender(createElement, sourceProps) {
      return createElement(DraggableSelector, {
        props: {
          ...this.$attrs,
          ...this.$props,
          ...this.renderProps,
          options: sourceProps.pipeList,
          refreshApi: sourceProps.refresh,
          loading: sourceProps.loading,
        },
        scopedSlots: {
          ...this.$scopedSlots,
          optionItem: props => this.cOptionItemSlotRender(createElement, { ...sourceProps, ...props }),
          unselectedPotionItem: props =>
            this.cUnselectedPotionItemSlotRender(createElement, { ...sourceProps, ...props }),
          selectedPotionItem: props => this.cSelectedPotionItemSlotRender(createElement, { ...sourceProps, ...props }),
          default: props => this[this.draggableSelectorOutRenderName](createElement, { ...sourceProps, ...props }),
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
    cUnselectedPotionItemSlotRender(createElement, sourceProps) {
      if (this.$scopedSlots.unselectedPotionItem) {
        return this.$scopedSlots.unselectedPotionItem(sourceProps)
      }
      return this.iUnselectedPotionItemSlotRender(createElement, sourceProps)
    },
    iUnselectedPotionItemSlotRender(createElement, sourceProps) {
      return undefined
    },
    cSelectedPotionItemSlotRender(createElement, sourceProps) {
      if (this.$scopedSlots.selectedPotionItem) {
        return this.$scopedSlots.selectedPotionItem(sourceProps)
      }
      return this.iSelectedPotionItemSlotRender(createElement, sourceProps)
    },
    iSelectedPotionItemSlotRender(createElement, sourceProps) {
      return undefined
    },
  },
}
