<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <vertical-flex-layout
      class="side-page-frame"
      before-body-class="side-page-frame__before-body"
      body-class="side-page-frame__body"
    >
      <template #header>
        <standard-header
          class="side-page-frame__header-inner"
          :title="title"
          :title-tip="titleTip"
          :subtitle="subtitle"
          :subtitle-tip="subtitleTip"
          :introduction="headerIntroduction"
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
          :inner-sheet="innerSheet"
          @update:sheetValue="val => $emit('update:headerSheetValue', val)"
          @sheetChange="val => $emit('headerSheetChange', val)"
        >
          <template v-if="$scopedSlots.headerActions" #actions>
            <slot name="headerActions" />
          </template>
          <template v-if="$scopedSlots.headerIntroduction" #introduction>
            <slot name="headerIntroduction" />
          </template>
        </standard-header>
      </template>
      <template v-if="$scopedSlots.beforeBody" #beforeBody>
        <slot name="beforeBody" />
      </template>
      <template v-if="$scopedSlots.afterBody" #afterBody>
        <slot name="afterBody" />
      </template>
      <template
        v-if="
          $scopedSlots.footerActions ||
          $scopedSlots.footerDescription ||
          $scopedSlots.footerExtension ||
          $scopedSlots.positiveAction
        "
        #footer
      >
        <left-actions-footer class="side-page-frame__footer-inner">
          <template v-if="$scopedSlots.footerActions || $scopedSlots.positiveAction" #actions>
            <slot name="footerActions">
              <template v-if="$scopedSlots.positiveAction">
                <slot name="positiveAction" />
                <lui-button text="取消" @click="close" />
              </template>
            </slot>
          </template>
          <template v-if="$scopedSlots.footerDescription" #description>
            <slot name="footerDescription" />
          </template>
          <template v-if="$scopedSlots.footerExtension" #extension>
            <slot name="footerExtension" />
          </template>
        </left-actions-footer>
      </template>
      <template #outside>
        <outside-close-button />
      </template>
      <slot />
    </vertical-flex-layout>
  </rl-close>
</template>

<script>
  import ProvideClose from '../../mixin/provide-close'
  import RlClose from '../../renderless/rl-close'
  import OutsideCloseButton from '../../business/outside-close-button'
  import StandardHeader from '../../widget/header/standard-header'
  import VerticalFlexLayout from '../../layout/vertical-flex-layout'
  import LeftActionsFooter from '../../widget/footer/left-actions-footer'
  import LuiButton from '../../lui/lui-button'

  export default {
    name: 'SidePageFrame',
    components: { RlClose, VerticalFlexLayout, StandardHeader, OutsideCloseButton, LeftActionsFooter, LuiButton },
    mixins: [ProvideClose],
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
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
  @import 'side-page-frame.var';

  .side-page-frame {
    position: relative;
    height: 100%;
    background-color: $side-page-frame--background-color;
  }
  .side-page-frame__header-inner {
    padding: 8px 20px;
    background-color: white;
  }
  .side-page-frame__footer-inner {
    padding: 12px 20px 28px 20px;
    background-color: white;
  }
  .side-page-frame__body {
    padding: 20px;

    &.has-slot-before {
      padding-top: 12px;
    }
  }
  .side-page-frame__before-body {
    padding: 20px 20px 0 20px;
  }
</style>
