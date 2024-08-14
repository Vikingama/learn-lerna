<template>
  <div class="footer-layout">
    <div class="footer-layout__inner" :class="innerClass">
      <div v-if="$scopedSlots.top" class="footer-layout__top">
        <slot name="top" />
      </div>
      <div
        v-if="$scopedSlots.bottomLeft || $scopedSlots.bottomCenter || $scopedSlots.bottomRight"
        class="footer-layout__bottom"
      >
        <div class="footer-layout__bottom-left">
          <slot name="bottomLeft" />
        </div>
        <div v-if="$scopedSlots.bottomCenter || $scopedSlots.bottomRight" class="footer-layout__bottom-center">
          <slot name="bottomCenter" />
        </div>
        <div v-if="$scopedSlots.bottomCenter || $scopedSlots.bottomRight" class="footer-layout__bottom-right">
          <slot name="bottomRight" />
        </div>
      </div>
    </div>
    <slot name="outside" />
  </div>
</template>

<script>
  export default {
    name: 'FooterLayout',
    props: {
      innerClass: [String, Object, Array],
    },
  }
</script>

<style lang="scss">
  .footer-layout {
    position: relative;
    width: 100%;
  }
  .footer-layout__inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .footer-layout__bottom {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .footer-layout__bottom-left,
  .footer-layout__bottom-right {
    flex: none;
    position: relative;
  }
  .footer-layout__bottom-center {
    flex: auto;
    position: relative;
  }
</style>
