<template>
  <div class="lui-side-menu">
    <el-menu
      :default-active="defaultActive()"
      :unique-opened="uniqueOpened"
      :collapse-transition="false"
      :collapse="collapsed"
    >
      <lui-side-menu-item v-for="(menu, index) in menus" :key="index" :collapsed="collapsed" :menu="menu" />
    </el-menu>
  </div>
</template>

<script>
  import LuiSideMenuItem from './lui-side-menu-item'

  export default {
    name: 'LuiSideMenu',
    components: { LuiSideMenuItem },
    props: {
      collapsed: Boolean,
      defaultActive: {
        type: Function,
        default: (menus = []) => {
          return '/'
        },
      },
      uniqueOpened: { type: Boolean, default: true },
      // title,icon,link,divider,items,disabled
      menus: { required: true, type: Array },
    },
    data() {
      return {}
    },
  }
</script>
<style lang="scss">
  @import 'lui-side-menu.var';

  .lui-side-menu {
    .el-menu {
      background-color: unset;
      border-right: unset;

      &.el-menu--collapse {
        width: $lui-side-menu--collapsed-width;
      }
    }
  }
</style>
