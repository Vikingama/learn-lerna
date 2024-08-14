<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <vertical-flex-layout class="side-mirror-page-frame" body-class="side-mirror-page-frame__body">
      <template #header>
        <standard-header
          class="side-mirror-page-frame__header"
          :title="title"
          :title-tip="titleTip"
          :subtitle="subtitle"
          :subtitle-tip="subtitleTip"
          :introduction="headerIntroduction"
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
      <template #footer>
        <left-actions-footer class="side-mirror-page-frame__footer">
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
  import LeftActionsFooter from '../../widget/footer/left-actions-footer'
  import StandardHeader from '../../widget/header/standard-header'

  export default {
    name: 'SideMirrorPageFrame',
    components: { VerticalFlexLayout, StandardHeader, OutsideCloseButton, RlClose, LeftActionsFooter },
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
    },
    methods: {
      close() {
        this.$refs.closeRef.close()
      },
    },
  }
</script>
<style lang="scss">
  .side-mirror-page-frame {
    position: relative;
    height: 100%;
    background-color: white;
  }
  .side-mirror-page-frame__header {
    padding: 8px 20px 8px 20px;
    background-color: white;
  }
  .side-mirror-page-frame__body {
    padding: 20px;
  }
  .side-mirror-page-frame__footer {
    padding: 12px 20px 28px 20px;
    background-color: white;
  }
</style>
