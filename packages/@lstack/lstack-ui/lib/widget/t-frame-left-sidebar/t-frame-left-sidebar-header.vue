<template>
  <div class="t-frame-left-sidebar-header">
    <div class="t-frame-left-sidebar-header__inner">
      <lui-title
        v-show="!collapsed"
        class="t-frame-left-sidebar-header__title"
        :theme="theme"
        size="s"
        :title="title"
      />
      <lui-icon
        v-show="collapsed"
        class="t-frame-left-sidebar-header__icon"
        type="highlight"
        :theme="theme"
        :icon="icon"
        size="xl"
      />
    </div>
  </div>
</template>

<script>
  import LuiIcon from '../../lui/lui-icon'
  import LuiTitle from '../../lui/lui-title'

  export default {
    name: 'TFrameLeftSidebarHeader',
    components: { LuiTitle, LuiIcon },
    props: {
      collapsed: Boolean,
      title: { type: String, required: true },
      icon: { type: String, required: true },
      theme: { type: String, default: 'dark' },
    },
  }
</script>

<style lang="scss">
  @import './t-frame-left-sidebar-header.var';

  .t-frame-left-sidebar-header {
    position: relative;
    width: 100%;
  }
  .t-frame-left-sidebar-header__inner {
    position: relative;
    white-space: nowrap;
    height: $t-frame-left-sidebar-header-inner--height;
    line-height: $t-frame-left-sidebar-header-inner--line-height;
    padding: 0 $t-frame-left-sidebar-header-inner__horizontal--padding;
  }

  .t-frame-left-sidebar-header__icon {
    position: absolute;
    left: $t-frame-left-sidebar-header-icon__left;
    top: $t-frame-left-sidebar-header-icon__top;
    margin: auto;
  }
</style>
