<template>
  <header-layout
    class="standard-header"
    :class="[showShadow ? 'has-shadow' : '', hasBottomSheets ? 'has-bottom-sheet' : '']"
    top-class="standard-header__top"
    top-left-class="standard-header__top-left"
    bottom-class="standard-header__bottom"
  >
    <template v-if="!!title || !!subtitle" #topLeft>
      <rl-close v-if="showCloseButton" bind-el-event action="inject">
        <lui-button class="standard-header__close-button" shape="square" icon="el-icon-arrow-left" />
      </rl-close>
      <lui-tip-title :title="title" :level="2" :tip="titleTip" />
      <lui-divider v-if="!!title && !!subtitle" size="xl" theme="light" direction="vertical" />
      <lui-tip-title :title="subtitle" :level="2" :tip="subtitleTip" />
    </template>
    <template v-if="hasInnerSheets" #topCenter>
      <lui-divider size="xl" theme="light" direction="vertical" />
      <lui-sheet
        :value="sheetValue"
        :options="sheetOptions"
        :option-value-key="sheetOptionValueKey"
        :option-label-key="sheetOptionLabelKey"
        :select-value-key="sheetSelectValueKey"
        :value-initialize-api="sheetValueInitializeApi"
        :option-disable="sheetOptionDisable"
        :option-forward-action-key="sheetOptionForwardActionKey"
        :option-forward-action-api="sheetOptionForwardActionApi"
        :option-forward-to-key="sheetOptionForwardToKey"
        :option-forward-to-api="sheetOptionForwardToApi"
        :label-map-api="sheetLabelMapApi"
        inline
        @input="val => $emit('update:sheetValue', val)"
        @change="(newVal, oldVal) => $emit('sheetChange', newVal, oldVal)"
      >
        <template v-if="$scopedSlots.sheet" #content>
          <slot name="sheet" />
        </template>
      </lui-sheet>
    </template>
    <template v-if="showRightCloseButton || $scopedSlots.actions" #topRight>
      <slot name="actions" />
      <rl-close v-if="showRightCloseButton" bind-el-event action="inject">
        <lui-button class="standard-header__right-close-button" shape="square" icon="el-icon-close" />
      </rl-close>
    </template>
    <template v-if="!!introduction || $scopedSlots.introduction || hasBottomSheets" #bottom>
      <slot v-if="!!introduction || $scopedSlots.introduction" name="introduction">
        <lui-text>{{ introduction }}</lui-text>
      </slot>
      <lui-sheet
        v-if="hasBottomSheets"
        :value="sheetValue"
        :options="sheetOptions"
        :option-value-key="sheetOptionValueKey"
        :option-label-key="sheetOptionLabelKey"
        :select-value-key="sheetSelectValueKey"
        :value-initialize-api="sheetValueInitializeApi"
        :option-disable="sheetOptionDisable"
        :option-forward-action-key="sheetOptionForwardActionKey"
        :option-forward-action-api="sheetOptionForwardActionApi"
        :option-forward-to-key="sheetOptionForwardToKey"
        :option-forward-to-api="sheetOptionForwardToApi"
        :label-map-api="sheetLabelMapApi"
        @input="val => $emit('update:sheetValue', val)"
        @change="(newVal, oldVal) => $emit('sheetChange', newVal, oldVal)"
      >
        <template v-if="$scopedSlots.sheet" #content>
          <slot name="sheet" />
        </template>
      </lui-sheet>
    </template>
    <template v-if="$scopedSlots.outside" #outside>
      <slot name="outside" />
    </template>
  </header-layout>
</template>

<script>
  import { isNotEmptyArray } from '@lstack/utils'
  import HeaderLayout from '../../../layout/header-layout'
  import LuiTipTitle from '../../../lui/lui-tip-title'
  import RlClose from '../../../renderless/rl-close'
  import LuiButton from '../../../lui/lui-button'
  import LuiSheet from '../../../lui/lui-sheet'
  import LuiDivider from '../../../lui/lui-divider'

  export default {
    name: 'StandardHeader',
    components: { RlClose, LuiButton, LuiSheet, HeaderLayout, LuiTipTitle, LuiDivider },
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      introduction: String,
      marginBottom: Boolean,
      showShadow: { type: Boolean, default: true },
      showCloseButton: Boolean,
      showRightCloseButton: Boolean,
      innerSheet: Boolean,

      sheetValue: {},
      sheetOptions: Array,
      sheetOptionValueKey: String,
      sheetOptionLabelKey: String,
      sheetSelectValueKey: String,
      sheetValueInitializeApi: Function,
      sheetOptionDisable: Function,
      sheetOptionForwardActionKey: String,
      sheetOptionForwardActionApi: [String, Function],
      sheetOptionForwardToKey: String,
      sheetOptionForwardToApi: [String, Object, Function],
      sheetLabelMapApi: [Object, Array, Function],
    },
    computed: {
      hasSheets() {
        return isNotEmptyArray(this.sheetOptions)
      },
      hasInnerSheets() {
        return this.hasSheets && this.innerSheet
      },
      hasBottomSheets() {
        return this.hasSheets && !this.innerSheet
      },
    },
  }
</script>
<style lang="scss">
  .standard-header {
    &.has-shadow {
      box-shadow: 0 2px 4px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
    }
    &.has-bottom-sheet {
      padding-bottom: 0;
    }
  }
  .standard-header__top {
    min-height: 32px;
  }
  .standard-header__bottom:not(:first-child) {
    margin-top: 8px;
  }
  .standard-header__top-left {
    display: flex;
    align-items: center;
  }
  .standard-header__close-button.lui-button {
    margin-right: 8px;
  }
  .standard-header__right-close-button.lui-button {
    margin-left: 8px;
  }
</style>
