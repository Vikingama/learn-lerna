<template>
  <left-t-frame-layout>
    <template #header>
      <t-frame-header />
    </template>
    <template #aside="{ asideCollapsed, changeAsideCollapsedStatus }">
      <t-frame-left-sidebar
        :icon="sideIcon"
        :title="sideTitle"
        :menus="sideMenus"
        :collapsed="asideCollapsed"
        @update:collapsed="changeAsideCollapsedStatus"
      />
    </template>
    <slot>
      <div v-if="$scopedSlots.fixedHeader" class="console-left-t-frame__fixed-header">
        <slot name="fixedHeader" />
      </div>
      <div class="console-left-t-frame__content-inner" :class="[$scopedSlots.fixedHeader ? 'has-fixed-header' : '']">
        <router-view />
      </div>
    </slot>
  </left-t-frame-layout>
</template>

<script>
  import LeftTFrameLayout from '../../layout/frame/left-t-frame-layout'
  import TFrameHeader from '../../widget/t-frame-header'
  import TFrameLeftSidebar from '../../widget/t-frame-left-sidebar'

  export default {
    name: 'ConsoleLeftTFrame',
    components: { TFrameHeader, LeftTFrameLayout, TFrameLeftSidebar },
    props: {
      sideIcon: { type: String, required: true },
      sideMenus: { type: Array, required: true },
      sideTitle: { type: String, required: true },
    },
    data() {
      return {
        param: undefined,
      }
    },
  }
</script>
<style lang="scss">
  .console-left-t-frame__fixed-header {
    height: 40px;
    position: relative;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  .console-left-t-frame__content-inner {
    position: relative;
    height: 100%;

    &.has-fixed-header {
      height: calc(100% - 40px);
    }
  }
</style>
