<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <vertical-flex-layout class="side-form-page-frame">
      <flow-layout>
        <template #header>
          <standard-header
            class="side-form-page-frame__header-inner"
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
        <slot />
      </flow-layout>
      <template #footer>
        <left-actions-footer class="side-form-page-frame__footer-inner">
          <template v-if="$scopedSlots.footerActions" #actions>
            <slot name="footerActions"></slot>
          </template>
          <template v-if="$scopedSlots.footerDescription" #description>
            <slot name="footerDescription"></slot>
          </template>
          <template v-if="$scopedSlots.footerExtension" #extension>
            <slot name="footerExtension"></slot>
          </template>
        </left-actions-footer>
      </template>
      <template #outside>
        <outside-close-button />
      </template>
    </vertical-flex-layout>
  </rl-close>
</template>

<script>
  import ProvideClose from '../../mixin/provide-close'
  import RlClose from '../../renderless/rl-close'
  import VerticalFlexLayout from '../../layout/vertical-flex-layout'
  import OutsideCloseButton from '../../business/outside-close-button'
  import FlowLayout from '../../layout/flow-layout'
  import LeftActionsFooter from '../../widget/footer/left-actions-footer'
  import StandardHeader from '../../widget/header/standard-header'

  export default {
    name: 'SideFormPageFrame',
    components: { VerticalFlexLayout, StandardHeader, OutsideCloseButton, FlowLayout, RlClose, LeftActionsFooter },
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
  @import 'side-form-page-frame.var';

  .side-form-page-frame {
    position: relative;
    height: 100%;
    background-color: $side-page-frame--background-color;
  }
  .side-form-page-frame__header-inner {
    padding: 8px 20px;
    background-color: white;
  }
  .side-form-page-frame__footer-inner {
    padding: 12px 20px;
    background-color: white;
  }
</style>
