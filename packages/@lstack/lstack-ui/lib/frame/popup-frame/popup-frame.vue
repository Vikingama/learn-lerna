<template>
  <rl-close ref="closeRef" action="closePage" :before-close="beforeClose" :before-close-async="beforeCloseAsync">
    <div class="popup-frame" :class="[`popup-frame--size-${size}`]">
      <div class="popup-frame__inner">
        <popup-header :show-close-button="showCloseButton" :title="title" :tip="tip">
          <template v-if="$scopedSlots.headerExtension" #extension>
            <slot name="headerExtension"></slot>
          </template>
        </popup-header>
        <div class="popup-frame__body">
          <slot v-bind="{ close }" />
        </div>
      </div>
    </div>
  </rl-close>
</template>

<script>
  import PopupHeader from '../../widget/popup-header'
  import RlClose from '../../renderless/rl-close'
  import ProvideClose from '../../mixin/provide-close'

  export default {
    name: 'PopupFrame',
    components: { PopupHeader, RlClose },
    mixins: [ProvideClose],
    props: {
      title: String,
      tip: String,
      showCloseButton: Boolean,
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return ['small', 'middle', 'large'].indexOf(val) !== -1
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
  @import 'popup-frame.var';

  .popup-frame {
    position: relative;
    background-color: white;
  }
  .popup-frame__inner {
    position: relative;
    width: 100%;
  }
  .popup-frame--size-small {
    width: 400px;
  }
  .popup-frame--size-middle {
    width: 550px;
  }
  .popup-frame--size-large {
    width: 700px;
  }
</style>
