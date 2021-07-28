<template>
  <div class="popup-header">
    <div class="popup-header__inner">
      <div class="popup-header__head">
        <lui-tip-title :title="title" :tip="tip" :level="2" />
        <div class="popup-header__placeholder" />
        <rl-close v-if="showCloseButton" bind-el-event action="inject">
          <lui-button icon="el-icon-close" shape="square" />
        </rl-close>
      </div>
      <div class="popup-header__extension">
        <slot name="extension" />
      </div>
    </div>
  </div>
</template>

<script>
  import LuiButton from '../../lui/lui-button'
  import LuiTipTitle from '../../lui/lui-tip-title'
  import RlClose from '../../renderless/rl-close'

  export default {
    name: 'PopupHeader',
    components: { LuiTipTitle, LuiButton, RlClose },
    props: {
      title: String,
      tip: String,
      showCloseButton: { type: Boolean, default: true },
    },
  }
</script>
<style lang="scss">
  @import 'popup-header.var';

  .popup-header {
    position: relative;
  }
  .popup-header__inner {
    position: relative;
    padding: 20px 20px 12px 20px;
  }
  .popup-header__head {
    position: relative;
    display: flex;
    align-items: center;
  }
  .popup-header__placeholder {
    flex: auto;
  }
  .popup-header__extension {
    position: relative;
    margin-top: 8px;
  }
</style>
