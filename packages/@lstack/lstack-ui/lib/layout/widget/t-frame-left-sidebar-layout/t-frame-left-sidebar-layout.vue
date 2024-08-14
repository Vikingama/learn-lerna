<template>
  <div class="t-frame-left-sidebar-layout" :class="{ 'is-collapsed': cCollapsed }">
    <rl-switch
      class="t-frame-left-sidebar-layout__header"
      :on="cCollapsed"
      event-type="mouseleave"
      :disabled="headerSwitchDisabled || locked"
      @change="handleCollapsedStatusChange"
    >
      <slot name="header" v-bind="slotScopeProps" />
    </rl-switch>
    <rl-switch
      class="t-frame-left-sidebar-layout__body"
      :on="cCollapsed"
      event-type="mouseleave"
      :disabled="bodySwitchDisabled || locked"
      @change="handleCollapsedStatusChange"
    >
      <slot v-bind="slotScopeProps" />
    </rl-switch>
    <rl-switch
      class="t-frame-left-sidebar-layout__footer"
      :on="cCollapsed"
      event-type="mouseleave"
      :disabled="footerSwitchDisabled || locked"
      @change="handleCollapsedStatusChange"
    >
      <slot name="footer" v-bind="slotScopeProps" />
    </rl-switch>
  </div>
</template>

<script>
  import RlSwitch from '../../../renderless/rl-switch'

  export default {
    name: 'TFrameLeftSidebarLayout',
    components: { RlSwitch },
    props: {
      collapsed: { type: [Boolean, undefined], default: undefined },
    },
    data() {
      return {
        locked: true,
        mCollapsed: !!this.collapsed,
        headerSwitchDisabled: false,
        bodySwitchDisabled: false,
        footerSwitchDisabled: true,
      }
    },
    computed: {
      cCollapsed: {
        get() {
          if (this.collapsed !== undefined) {
            return this.collapsed
          }
          return this.mCollapsed
        },
        set(val) {
          this.$emit('update:collapsed', val)
          this.mCollapsed = val
        },
      },
      slotScopeProps() {
        return {
          collapsed: this.cCollapsed,
          locked: this.locked,
          changeLockedStatus: this.changeLockedStatus,
          disableHeaderSwitch: this.disableHeaderSwitch,
          disableBodySwitch: this.disableBodySwitch,
          disableFooterSwitch: this.disableFooterSwitch,
        }
      },
    },
    methods: {
      changeLockedStatus(locked) {
        this.handleCollapsedStatusChange(!locked)
        this.locked = locked
      },
      handleCollapsedStatusChange(collapsed) {
        this.cCollapsed = collapsed
      },
      disableHeaderSwitch(disabled = true) {
        this.headerSwitchDisabled = disabled
      },
      disableBodySwitch(disabled = true) {
        this.bodySwitchDisabled = disabled
      },
      disableFooterSwitch(disabled = true) {
        this.footerSwitchDisabled = disabled
      },
    },
  }
</script>

<style lang="scss">
  @import './t-frame-left-sidebar-layout.var';

  .t-frame-left-sidebar-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    vertical-align: top;
    background-color: $t-frame-left-sidebar-layout--background-color;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.2s;

    &.is-collapsed {
      width: 100%;
    }
  }

  .t-frame-left-sidebar-layout__header {
    position: relative;
  }
  .t-frame-left-sidebar-layout__body {
    position: relative;
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
  }
  .t-frame-left-sidebar-layout__footer {
    position: relative;
  }
</style>
