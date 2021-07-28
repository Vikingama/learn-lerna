<template>
  <div class="t-frame-left-sidebar-body">
    <lui-side-menu :menus="menus" :collapsed="collapsed" />
  </div>
</template>

<script>
  import LuiSideMenu from '../../lui/lui-side-menu/lui-side-menu'

  export default {
    name: 'TFrameLeftSidebarBody',
    components: { LuiSideMenu },
    props: {
      collapsed: Boolean,
      // title,icon,link,divider,items,disabled
      menus: { required: true, type: Array },
    },
  }
</script>

<style lang="scss">
  .t-frame-left-sidebar-body {
    position: relative;
    width: 100%;
  }
</style>
