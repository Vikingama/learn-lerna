<template>
  <span class="lui-chip" :class="{ 'is-clickable': cClickable }" @click="$emit('click')">
    <span class="lui-chip__content"><slot></slot></span>
  </span>
</template>

<script>
  export default {
    name: 'LuiChip',
    props: {
      clickable: { type: [Boolean, undefined], default: undefined },
    },
    computed: {
      cClickable() {
        if (this.clickable !== undefined) return this.clickable
        return !!this.$listeners.click
      },
    },
  }
</script>
<style lang="scss">
  .lui-chip {
    align-items: center;
    cursor: default;
    display: inline-flex;
    line-height: 1.5;
    max-width: 100%;
    outline: none;
    overflow: hidden;
    padding: 0 8px;
    position: relative;
    text-decoration: none;
    transition-duration: 0.28s;
    transition-property: box-shadow, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    font-size: 12px;
    height: 24px;
    background-color: transparent;
    color: #ff9800;
    border-color: #ff9800;

    &.is-clickable {
      cursor: pointer;
    }

    &:before {
      background-color: currentColor;
      bottom: 0;
      border-radius: inherit;
      content: '';
      left: 0;
      opacity: 0;
      position: absolute;
      pointer-events: none;
      right: 0;
      top: 0;
    }
  }
  .lui-chip__content {
    align-items: center;
    display: inline-flex;
    height: 100%;
    max-width: 100%;
  }
</style>
