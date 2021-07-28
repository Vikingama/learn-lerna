<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <flow-layout
      class="dialog-frame"
      :class="[`dialog-frame--size-${size}`, !showHeaderShadow ? 'no-header-shadow' : '']"
      body-class="dialog-frame__body"
    >
      <template #header>
        <standard-header
          class="dialog-frame__header-inner"
          :title="title"
          :title-tip="titleTip"
          :subtitle="subtitle"
          :subtitle-tip="subtitleTip"
          :show-right-close-button="showRightCloseButton"
          :show-shadow="showHeaderShadow"
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
      <div class="dialog-frame__body-inner">
        <slot />
      </div>
      <template #footer>
        <right-actions-footer class="dialog-frame__footer-inner">
          <template v-if="$scopedSlots.footerActions || $scopedSlots.positiveAction" #actions>
            <slot name="footerActions" v-bind="{ close }">
              <template v-if="$scopedSlots.positiveAction">
                <slot name="positiveAction" v-bind="{ close }" />
                <rl-close bind-el-event action="inject">
                  <lui-button text="取消" />
                </rl-close>
              </template>
            </slot>
          </template>
          <template v-if="$scopedSlots.footerDescription" #description>
            <slot name="footerDescription" />
          </template>
          <template v-if="$scopedSlots.footerExtension" #extension>
            <slot name="footerExtension" />
          </template>
        </right-actions-footer>
      </template>
    </flow-layout>
  </rl-close>
</template>

<script>
  import RlClose from '../../renderless/rl-close'
  import ProvideClose from '../../mixin/provide-close'
  import StandardHeader from '../../widget/header/standard-header'
  import RightActionsFooter from '../../widget/footer/right-actions-footer'
  import FlowLayout from '../../layout/flow-layout'
  import LuiButton from '../../lui/lui-button'

  export default {
    name: 'DialogFrame',
    components: { StandardHeader, FlowLayout, RightActionsFooter, RlClose, LuiButton },
    mixins: [ProvideClose],
    props: {
      title: String,
      titleTip: String,
      subtitle: String,
      subtitleTip: String,
      headerIntroduction: String,
      showRightCloseButton: Boolean,
      showHeaderShadow: { type: Boolean, default: true },
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return ['small', 'middle', 'large', 'x-large', 'wrap'].indexOf(val) !== -1
        },
      },
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
  .dialog-frame {
    position: relative;
    background-color: white;
  }
  .dialog-frame__header-inner {
    padding: 8px 20px 8px 20px;
    background-color: white;
  }
  .dialog-frame__body {
    .dialog-frame.no-header-shadow & {
      padding-top: 0;
    }
    padding: 20px 20px 0 20px;
  }
  .dialog-frame__body-inner {
    overflow: auto;
    height: 100%;
  }
  .dialog-frame__footer-inner {
    padding: 20px;
    background-color: white;
  }
  .dialog-frame--size-small {
    width: 400px;
    .dialog-frame__body-inner {
      max-height: 200px;
    }
  }
  .dialog-frame--size-middle {
    width: 550px;
    .dialog-frame__body-inner {
      max-height: 400px;
    }
  }
  .dialog-frame--size-large {
    width: 700px;
    .dialog-frame__body-inner {
      max-height: 600px;
    }
  }
  .dialog-frame--size-x-large {
    width: 1080px;
    .dialog-frame__body-inner {
      max-height: 720px;
    }
  }
</style>
