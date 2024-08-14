<template>
  <rl-close
    ref="closeRef"
    :to="closeTo"
    :action="closeAction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
  >
    <flow-layout class="inner-page-frame" body-class="inner-page-frame__body" match-parent>
      <template #header>
        <standard-header
          class="inner-page-frame__header-inner"
          :title="title"
          :title-tip="titleTip"
          :subtitle="subtitle"
          :subtitle-tip="subtitleTip"
          :introduction="headerIntroduction"
          :show-close-button="true"
          :inner-sheet="innerSheet"
          :sheet-value="headerSheetValue"
          :sheet-options="headerSheetOptions"
          :sheet-option-value-key="headerSheetOptionValueKey"
          :sheet-option-label-key="headerSheetOptionLabelKey"
          :sheet-select-value-key="headerSheetSelectValueKey"
          :sheet-value-initialize-api="headerSheetValueInitializeApi"
          :sheet-option-disable="headerSheetOptionDisable"
          :sheet-option-forward-action-key="headerSheetOptionForwardActionKey"
          :sheet-option-forward-action-api="headerSheetOptionForwardActionApi"
          :sheet-option-forward-to-key="headerSheetOptionForwardToKey"
          :sheet-option-forward-to-api="headerSheetOptionForwardToApi"
          :sheet-label-map-api="headerSheetLabelMapApi"
          @update:sheetValue="val => $emit('update:headerSheetValue', val)"
          @sheetChange="val => $emit('headerSheetChange', val)"
        >
          <template v-if="$scopedSlots.headerSheet" #sheet>
            <slot name="headerSheet" />
          </template>
          <template v-if="$scopedSlots.headerActions" #actions>
            <slot name="headerActions" />
          </template>
          <template v-if="$scopedSlots.headerIntroduction" #introduction>
            <slot name="headerIntroduction" />
          </template>
        </standard-header>
      </template>
      <slot>
        <router-view />
      </slot>
      <template #outside>
        <lui-page-stack ref="pageStack" class="inner-page-frame__page-stack" :class="[pageStackClass]" />
      </template>
    </flow-layout>
  </rl-close>
</template>

<script>
  import StandardHeader from '../../widget/header/standard-header'
  import LuiPageStack from '../../lui/lui-page-stack'
  import ProvidePageStack from '../../mixin/provide-page-stack'
  import FlowLayout from '../../layout/flow-layout'
  import ProvideClose from '../../mixin/provide-close'
  import RlClose from '../../renderless/rl-close'

  export default {
    name: 'InnerPageFrame',
    components: { StandardHeader, FlowLayout, LuiPageStack, RlClose },
    mixins: [ProvidePageStack, ProvideClose],
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,

      closeAction: {
        type: String,
        default: 'back',
        validator(val) {
          return ['default', 'replace', 'back'].indexOf(val) !== -1
        },
      },
      closeTo: [String, Object],
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      pageStackClass: String,
      innerSheet: Boolean,

      headerSheetValue: {},
      headerSheetOptions: Array,
      headerSheetOptionValueKey: String,
      headerSheetOptionLabelKey: String,
      headerSheetSelectValueKey: String,
      headerSheetValueInitializeApi: Function,
      headerSheetOptionDisable: Function,
      headerSheetOptionForwardActionKey: String,
      headerSheetOptionForwardActionApi: [String, Function],
      headerSheetOptionForwardToKey: String,
      headerSheetOptionForwardToApi: [String, Object, Function],
      headerSheetLabelMapApi: [Object, Array, Function],
    },
    methods: {
      close() {
        this.$refs.closeRef.close()
      },
    },
  }
</script>
<style lang="scss">
  @import 'inner-page-frame.var';

  .inner-page-frame {
    position: relative;
    height: 100%;
    background-color: #eef0f5;
  }
  .inner-page-frame__inner {
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .inner-page-frame__header-inner {
    position: relative;
    padding: 8px 20px;
    background-color: white;
    box-shadow: 0 2px 4px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
  }
  .inner-page-frame__body {
    padding: 20px;
  }
</style>
