<template>
  <el-submenu
    v-if="isParentMenu"
    class="lui-side-menu-item"
    :class="{ 'has-divider': menu.divider }"
    :disabled="menu.disabled"
    :index="menu.link"
  >
    <template #title>
      <lui-icon v-if="menu.icon" class="lui-side-menu-item__icon" size="s" :icon="menu.icon" />
      <lui-text
        v-show="!collapsed"
        :margin-left="!!menu.icon"
        inline
        type="none"
        theme="none"
        size="l"
        :text="menu.title"
      />
    </template>
    <lui-side-menu-item v-for="submenu in menuItems" :key="submenu.link" :index="submenu.link" :menu="submenu" />
  </el-submenu>
  <el-menu-item
    v-else-if="menu.isLabel"
    class="lui-side-menu-item"
    :class="{ 'is-collapsed': collapsed, 'is-label': menu.isLabel }"
    disabled
  >
    <lui-divider v-if="collapsed" inline theme="dark" size="none" />
    <lui-label v-else class="lui-side-menu-item__label" :label="menu.title" />
  </el-menu-item>
  <rl-forward v-else :to="menu.link" :bind-el-event="true">
    <el-menu-item
      class="lui-side-menu-item"
      :class="{ 'has-divider': menu.divider }"
      :disabled="menu.disabled"
      :index="menu.link"
    >
      <lui-icon v-if="menu.icon" class="lui-side-menu-item__icon" size="s" :icon="menu.icon" />
      <lui-text
        v-show="!collapsed"
        :margin-left="!!menu.icon"
        inline
        type="none"
        theme="none"
        size="l"
        :text="menu.title"
      />
    </el-menu-item>
  </rl-forward>
</template>

<script>
  import LuiIcon from '../lui-icon'
  import LuiText from '../lui-text'
  import LuiLabel from '../lui-label'
  import LuiDivider from '../lui-divider'
  import RlForward from '../../renderless/rl-forward'

  export default {
    name: 'LuiSideMenuItem',
    components: { LuiIcon, LuiText, LuiLabel, LuiDivider, RlForward },
    props: {
      menu: { required: true, type: Object },
      collapsed: Boolean,
    },
    computed: {
      menuItems() {
        if (!this.menu) {
          return []
        }
        const { items } = this.menu
        return items instanceof Array ? items : []
      },
      isParentMenu() {
        return this.menuItems.length > 0
      },
    },
  }
</script>

<style lang="scss">
  @import './lui-side-menu-item.var';

  .lui-side-menu-item {
    // 解决分隔线包含块跨越问题
    position: relative;

    &.el-submenu {
      // 覆盖 el 样式
      .el-menu-item {
        height: $lui-side-menu-item--height;
        line-height: $lui-side-menu-item--height;
      }

      & > .el-submenu__title {
        height: $lui-side-menu-item--height;
        line-height: $lui-side-menu-item--height;
        color: $lui-side-menu-item-submenu-title--color;

        &:hover {
          background-color: unset;
        }
      }
      &.is-opened {
        padding-bottom: $lui-side-menu-item-submenu--padding-bottom;
        background-color: $lui-side-menu-item-submenu__opened--background-color;
      }
    }

    &.el-menu-item {
      height: $lui-side-menu-item--height;
      line-height: $lui-side-menu-item--height;
      color: $lui-side-menu-item--color;
      opacity: unset !important;

      &.is-label {
        height: 40px;
        padding-top: 16px;
        padding-bottom: 4px;
        line-height: unset;
        cursor: default;

        &.is-collapsed {
          padding-left: 16px !important;
          padding-right: 16px !important;
          padding-top: unset;
          padding-bottom: unset;
          line-height: 40px;
        }
      }

      &.is-active:not(.is-label) {
        background-color: $lui-side-menu-item__active--background-color !important;
      }

      &:hover {
        background-color: $lui-side-menu-item__hover--background-color;
      }
      &:focus {
        background-color: unset;
      }
    }

    & .lui-side-menu-item__icon {
      color: $lui-side-menu-item-submenu-title--color;
    }

    &.has-divider::after {
      position: absolute;
      right: 20px;
      bottom: 0;
      left: 20px;
      display: table;
      width: calc(100% - #{$lui-side-menu-item__horizontal--padding} * 2);
      border-bottom: 1px dashed $lui-side-menu-item-divider--color;
      border-collapse: collapse;
      content: '';
    }
  }
</style>
