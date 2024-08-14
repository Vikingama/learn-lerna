<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <flow-layout class="side-info-page-frame" body-class="side-info-page-frame__body" match-parent>
      <template #header>
        <standard-header
          class="side-info-page-frame__header-inner"
          :title="title"
          :title-tip="titleTip"
          :show-close-button="isPageMatchParent"
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
          <template v-if="$scopedSlots.headerSheet" #sheet>
            <slot name="headerSheet" />
          </template>
          <template #actions>
            <slot name="headerActions" />

            <lui-tooltip
              v-if="infoRouteHref"
              :hide-after="2000"
              :open-delay="300"
              content="新标签页打开"
              placement="top"
              :enterable="false"
            >
              <forward-button icon="new-tab" action="openTab" :to="infoRouteHref" no-margin shape="square" />
            </lui-tooltip>
            <lui-tooltip
              v-if="isPageMatchParent"
              :hide-after="2000"
              :open-delay="300"
              content="缩小"
              placement="top"
              :enterable="false"
            >
              <lui-button icon="zoom-out" no-margin shape="square" @click="zoomOut" />
            </lui-tooltip>
            <lui-tooltip v-else :hide-after="2000" :open-delay="300" content="放大" placement="top" :enterable="false">
              <lui-button icon="zoom-in" no-margin shape="square" @click="zoomIn" />
            </lui-tooltip>
            <refresh-icon-button :refresh-api="refreshApi" no-margin :loading="loading" />
          </template>
          <template v-if="$scopedSlots.headerIntroduction" #introduction>
            <slot name="headerIntroduction" />
          </template>
        </standard-header>
      </template>
      <slot />
      <template #outside>
        <outside-close-button v-if="!isPageMatchParent" />
      </template>
    </flow-layout>
  </rl-close>
</template>

<script>
  import ProvideClose from '../../mixin/provide-close'
  import RlClose from '../../renderless/rl-close'
  import StandardHeader from '../../widget/header/standard-header'
  import OutsideCloseButton from '../../business/outside-close-button'
  import FlowLayout from '../../layout/flow-layout'
  import LuiButton from '../../lui/lui-button'
  import LuiTooltip from '../../lui/lui-tooltip'
  import ForwardButton from '../../compound/forward-button'
  import RefreshIconButton from '../../business/refresh-icon-button'

  export default {
    name: 'SideInfoPageFrame',
    components: {
      StandardHeader,
      OutsideCloseButton,
      FlowLayout,
      RlClose,
      LuiButton,
      LuiTooltip,
      ForwardButton,
      RefreshIconButton,
    },
    mixins: [ProvideClose],
    inject: {
      pPageStack: { default: '' },
    },
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

      infoRouteHref: String,
      loading: Boolean,
      refreshApi: Function,
    },
    computed: {
      isPageMatchParent() {
        return this.pPageStack.size === 'Match'
      },
    },
    methods: {
      close() {
        this.$refs.closeRef.close()
      },
      zoomIn() {
        this.pPageStack.size = 'Match'
      },
      zoomOut() {
        this.pPageStack.size = undefined
      },
    },
  }
</script>
<style lang="scss">
  @import 'side-info-page-frame.var';

  .side-info-page-frame {
    background-color: $side-info-page-frame--background-color;
  }
  .side-info-page-frame__header-inner {
    padding: 8px 20px;
    background-color: white;
  }
  .side-info-page-frame__body {
    padding: 20px;
  }
</style>
