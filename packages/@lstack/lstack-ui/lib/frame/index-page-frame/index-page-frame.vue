<template>
  <flow-layout class="index-page-frame" body-class="index-page-frame__body" match-parent>
    <template #header>
      <standard-header
        class="index-page-frame__header-inner"
        :show-shadow="false"
        :title="title"
        :title-tip="titleTip"
        :subtitle="subtitle"
        :subtitle-tip="subtitleTip"
        inner-sheet
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
    <div class="index-page-frame__body-inner">
      <slot>
        <router-view />
      </slot>
    </div>
    <template #outside>
      <lui-page-stack ref="pageStack" class="index-page-frame__page-stack" :class="[pageStackClass]" />
    </template>
  </flow-layout>
</template>

<script>
  import StandardHeader from '../../widget/header/standard-header'
  import LuiPageStack from '../../lui/lui-page-stack'
  import ProvidePageStack from '../../mixin/provide-page-stack'
  import FlowLayout from '../../layout/flow-layout'

  export default {
    name: 'IndexPageFrame',
    components: { StandardHeader, FlowLayout, LuiPageStack },
    mixins: [ProvidePageStack],
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      pageStackClass: String,

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
  }
</script>
<style lang="scss">
  @import 'index-page-frame.var';

  .index-page-frame {
    position: relative;
    height: 100%;
  }
  .index-page-frame__inner {
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .index-page-frame__header-inner {
    position: relative;
    padding: 20px 20px 20px 20px;
  }
  .index-page-frame__body {
    padding: 0 20px 20px 20px;
  }
</style>
