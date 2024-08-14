<template>
  <div class="vertical-flex-layout">
    <div class="vertical-flex-layout--inner">
      <template v-if="$scopedSlots.header">
        <div class="vertical-flex-layout__header" :class="headerClass">
          <slot name="header" />
        </div>
      </template>
      <template v-if="$scopedSlots.beforeBody">
        <div class="vertical-flex-layout__before-body" :class="beforeBodyClass">
          <slot name="beforeBody" />
        </div>
      </template>
      <div class="vertical-flex-layout__body" :class="[$scopedSlots.beforeBody ? 'has-slot-before' : '', bodyClass]">
        <slot />
      </div>
      <template v-if="$scopedSlots.afterBody">
        <div class="vertical-flex-layout__after-body" :class="afterBodyClass">
          <slot name="afterBody" />
        </div>
      </template>
      <template v-if="$scopedSlots.footer">
        <div class="vertical-flex-layout__footer" :class="footerClass">
          <slot name="footer" />
        </div>
      </template>
    </div>
    <slot name="outside" />
  </div>
</template>

<script>
  export default {
    name: 'VerticalFlexLayout',
    props: {
      headerClass: [String, Object, Array],
      bodyClass: [String, Object, Array],
      footerClass: [String, Object, Array],
      beforeBodyClass: [String, Object, Array],
      afterBodyClass: [String, Object, Array],
    },
  }
</script>

<style lang="scss">
  .vertical-flex-layout {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .vertical-flex-layout--inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }
  .vertical-flex-layout__header,
  .vertical-flex-layout__footer,
  .vertical-flex-layout__before-body,
  .vertical-flex-layout__after-body {
    flex: none;
    position: relative;
  }
  .vertical-flex-layout__body {
    flex: auto;
    position: relative;
    overflow: auto;
  }
</style>
