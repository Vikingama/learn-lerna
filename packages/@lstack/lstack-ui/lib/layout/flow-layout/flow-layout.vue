<template>
  <div class="flow-layout" :class="matchParent ? 'match-parent' : ''">
    <div class="flow-layout__inner" :class="innerClass">
      <template v-if="$scopedSlots.header">
        <div class="flow-layout__header" :class="headerClass">
          <slot name="header"></slot>
        </div>
      </template>
      <div class="flow-layout__body" :class="bodyClass">
        <slot></slot>
      </div>
      <template v-if="$scopedSlots.footer">
        <div class="flow-layout__footer" :class="footerClass">
          <slot name="footer"></slot>
        </div>
      </template>
    </div>
    <slot name="outside" />
  </div>
</template>

<script>
  export default {
    name: 'FlowLayout',
    props: {
      headerClass: [String, Object, Array],
      bodyClass: [String, Object, Array],
      innerClass: [String, Object, Array],
      footerClass: [String, Object, Array],
      matchParent: Boolean,
    },
  }
</script>

<style lang="scss">
  .flow-layout {
    position: relative;

    &.match-parent {
      height: 100%;
      width: 100%;

      > .flow-layout__inner {
        height: 100%;
      }
    }
  }
  .flow-layout__inner {
    position: relative;
    width: 100%;
    overflow: auto;
    max-height: 100%;
  }
</style>
