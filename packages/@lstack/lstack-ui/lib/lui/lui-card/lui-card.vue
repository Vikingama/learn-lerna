<template>
  <rl-switch
    #default="{ switch: switchCollapsed, on: pCollapsed }"
    v-model="cCollapsed"
    event-type="none"
    :disabled="!collapsable"
  >
    <div
      class="lui-card"
      :class="[
        theme !== 'none' ? `lui-card--theme-${theme}` : '',
        size !== 'none' ? `lui-card--size-${size}` : '',
        marginTop ? 'lui-card--margin-top' : '',
        marginRight ? 'lui-card--margin-right' : '',
        marginBottom ? 'lui-card--margin-bottom' : '',
        marginLeft ? 'lui-card--margin-left' : '',
      ]"
    >
      <div class="lui-card__inner">
        <div
          v-if="$scopedSlots.header || !!title || $scopedSlots.headerActions"
          class="lui-card__header"
          :class="[pCollapsed ? 'is-collapsed' : '', collapsable ? 'is-collapsable' : '']"
          @click="switchCollapsed"
        >
          <slot name="header">
            <lui-tip-title class="lui-card__header-title" :title="title" :tip="titleTip" :level="2" />
            <div class="lui-card__header-placeholder" />
            <div class="lui-card__header-actions">
              <slot name="headerActions" />
            </div>
          </slot>
        </div>
        <lui-divider v-if="showDivider" theme="light" size="l" />
        <div v-if="!collapsable || !pCollapsed" v-loading="loading" class="lui-card__body" :class="bodyClass">
          <lui-empty-view v-if="showEmptyView" />
          <slot v-bind="{ collapsable, collapsed: pCollapsed }" />
        </div>
      </div>
    </div>
  </rl-switch>
</template>

<script>
  import LuiEmptyView from '../lui-empty-view'
  import LuiTipTitle from '../lui-tip-title'
  import LuiDivider from '../lui-divider'
  import RlSwitch from '../../renderless/rl-switch'

  export default {
    name: 'LuiCard',
    components: { LuiTipTitle, LuiDivider, RlSwitch, LuiEmptyView },
    props: {
      title: String,
      titleTip: String,
      showDivider: Boolean,
      collapsable: Boolean,
      loading: Boolean,
      collapsed: { type: [Boolean, undefined], default: undefined },
      size: {
        type: String,
        default: 'middle',
        validator(val) {
          return ['none', 'mini', 'small', 'middle', 'large'].indexOf(val) !== -1
        },
      },
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['none', 'light', 'dark'].indexOf(val) !== -1
        },
      },
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      showEmptyView: Boolean,
      bodyClass: [String, Object, Array],
    },
    computed: {
      cCollapsed: {
        get() {
          return this.collapsed
        },
        set(val) {
          this.$emit('update:collapsed', val)
        },
      },
    },
  }
</script>

<style lang="scss">
  .lui-card {
    position: relative;
    box-shadow: 0 2px 4px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
  }
  .lui-card--size-middle {
    &.lui-card--margin-top {
      margin-top: 20px;
    }
  }
  .lui-card--size-small {
    &.lui-card--margin-top {
      margin-top: 12px;
    }
  }

  .lui-card__inner {
    position: relative;
    padding: 20px;
  }
  .lui-card__header {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &.is-collapsable {
      cursor: pointer;
    }
    &.is-collapsed {
      margin-bottom: unset;
    }
  }
  .lui-card__header-placeholder {
    flex: auto;
  }
  .lui-card__body {
    position: relative;
  }
  .lui-card--theme-light {
    background-color: white;
  }
</style>
