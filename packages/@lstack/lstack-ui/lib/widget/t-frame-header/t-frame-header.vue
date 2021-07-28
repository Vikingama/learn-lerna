<template>
  <t-frame-header-layout
    :class="['t-frame-header', cThemeClass]"
    inner-class="t-frame-header_inner"
    logo-class="t-frame-header_logo"
    user-class="t-frame-header_user"
    left-class="t-frame-header_left"
    right-class="t-frame-header_right"
  >
    <template slot="logo">
      <slot name="logo">
        <t-frame-header-logo :action-to="logoActionTo" />
      </slot>
    </template>
    <template slot="left">
      <slot name="left" />
    </template>
    <template slot="center">
      <slot name="center" />
    </template>
    <template slot="right">
      <slot name="right" />
      <lui-link class="trigger g-ml-2" :underline="false" type="default" text="中文（简体）" />
    </template>
    <template slot="user">
      <slot name="user" />
    </template>
  </t-frame-header-layout>
</template>

<script>
  import TFrameHeaderLogo from './t-frame-header-logo'
  import TFrameHeaderLayout from '../../layout/t-frame-header-layout'
  import { Themeable } from '../../mixin'
  import LuiLink from '../../lui/lui-link'

  export default {
    name: 'TFrameHeader',
    components: {
      TFrameHeaderLogo,
      TFrameHeaderLayout,
      LuiLink,
    },
    mixins: [Themeable],
    props: {
      logoActionTo: String,
    },
  }
</script>
<style lang="scss">
  .t-frame-header {
    height: 50px;

    &.theme-dark {
      background-color: #262f3e;
      color: #c1c6c8;
    }
  }
  .t-frame-header_logo {
    padding-left: 20px;
  }
  .t-frame-header_user {
    padding-right: 20px;
    min-width: 120px;
    justify-content: flex-end;
  }
  .t-frame-header_left {
    .trigger {
      padding: 0 16px;
      align-self: stretch;
      &:not(:first-child) {
        padding-left: 8px;
      }
    }
  }
  .t-frame-header_right {
    .trigger {
      padding: 0 8px;
      align-self: stretch;
    }
  }
</style>
