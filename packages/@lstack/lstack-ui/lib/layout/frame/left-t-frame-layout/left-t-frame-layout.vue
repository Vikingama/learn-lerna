<template>
  <div class="left-t-frame-layout">
    <div class="left-t-frame-layout__header">
      <slot name="header" />
    </div>
    <div class="left-t-frame-layout__body" :class="{ 'aside-collapsed': asideCollapsed }">
      <div class="left-t-frame-layout__aside">
        <slot name="aside" :changeAsideCollapsedStatus="changeAsideCollapsedStatus" :asideCollapsed="asideCollapsed" />
      </div>
      <div class="left-t-frame-layout__content">
        <slot />
        <lui-page-stack ref="pageStack" class="left-t-frame-layout__page-stack" :class="[pageStackClass]" />
      </div>
    </div>
  </div>
</template>

<script>
  import ProvidePageStack from '../../../mixin/provide-page-stack'
  import LuiPageStack from '../../../lui/lui-page-stack'

  export default {
    name: 'LeftTFrameLayout',
    components: { LuiPageStack },
    mixins: [ProvidePageStack],
    props: {
      pageStackClass: String,
    },
    data() {
      return {
        asideCollapsed: false,
      }
    },
    methods: {
      changeAsideCollapsedStatus(collapsed) {
        this.asideCollapsed = collapsed
      },
    },
  }
</script>

<style lang="scss">
  @import './left-t-frame-layout.var';

  .left-t-frame-layout {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .left-t-frame-layout__header {
    width: 100%;
    height: $left-t-frame-layout-header--height;
  }

  .left-t-frame-layout__body {
    position: absolute;
    top: $left-t-frame-layout-header--height;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .left-t-frame-layout__aside {
    position: relative;
    display: inline-block;
    width: $left-t-frame-layout-aside--width;
    height: 100%;
    overflow-x: hidden;
    vertical-align: top;
    transition: $left-t-frame-layout-aside--transition;

    .left-t-frame-layout__body.aside-collapsed & {
      width: $left-t-frame-layout-aside__collapsed--width;
    }
  }

  .left-t-frame-layout__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color: $left-t-frame-layout-content--background-color;
    transition: $left-t-frame-layout-aside--transition;

    .left-t-frame-layout__body & {
      left: $left-t-frame-layout-aside--width;
    }

    .left-t-frame-layout__body.aside-collapsed & {
      left: $left-t-frame-layout-aside__collapsed--width;
    }
  }

  .left-t-frame-layout__page-stack.lui-page-stack > .lui-page-stack__container {
    position: absolute;
    left: 30%;
    right: 0;
    top: 0;
    bottom: 0;

    &:after {
      height: 100%;
      bottom: 0;
      border-right: 1px solid #dcdfe6;
      content: ' ';
      position: absolute;
      left: -6px;
      width: 6px;
      background: linear-gradient(270deg, rgba(197, 219, 232, 0.4), rgba(211, 220, 227, 0));
    }
  }
</style>
