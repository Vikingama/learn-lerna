<template>
  <div class="flow-frame-layout">
    <div class="flow-frame-layout__inner">
      <template v-if="$scopedSlots.header">
        <div class="flow-frame-layout__header">
          <slot name="header"></slot>
        </div>
      </template>
      <div class="flow-frame-layout__body">
        <slot></slot>
      </div>
      <template v-if="$scopedSlots.footer">
        <div class="flow-frame-layout__footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FlowFrameLayout',
  }
</script>

<style lang="scss">
  .flow-frame-layout {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .flow-frame-layout__inner {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .flow-frame-layout__header,
  .flow-frame-layout__body,
  .flow-frame-layout__footer {
    position: relative;
    width: 100%;
    height: auto;
  }
</style>
