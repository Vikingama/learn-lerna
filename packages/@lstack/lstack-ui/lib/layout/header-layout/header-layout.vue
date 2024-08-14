<template>
  <div class="header-layout">
    <div class="header-layout__inner" :class="innerClass">
      <div
        v-if="$scopedSlots.topLeft || $scopedSlots.topCenter || $scopedSlots.topRight"
        class="header-layout__top"
        :class="topClass"
      >
        <div class="header-layout__top-left" :class="topLeftClass">
          <slot name="topLeft" />
        </div>
        <div
          v-if="$scopedSlots.topCenter || $scopedSlots.topRight"
          class="header-layout__top-center"
          :class="topCenterClass"
        >
          <slot name="topCenter" />
        </div>
        <div
          v-if="$scopedSlots.topCenter || $scopedSlots.topRight"
          class="header-layout__top-right"
          :class="topRightClass"
        >
          <slot name="topRight" />
        </div>
      </div>
      <div v-if="$scopedSlots.bottom" class="header-layout__bottom" :class="bottomClass">
        <slot name="bottom" />
      </div>
    </div>
    <slot name="outside" />
  </div>
</template>

<script>
  export default {
    name: 'HeaderLayout',
    props: {
      innerClass: [String, Object, Array],
      topClass: [String, Object, Array],
      topCenterClass: [String, Object, Array],
      topLeftClass: [String, Object, Array],
      topRightClass: [String, Object, Array],
      bottomClass: [String, Object, Array],
    },
  }
</script>

<style lang="scss">
  .header-layout {
    position: relative;
    width: 100%;
  }
  .header-layout__inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .header-layout__top {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-layout__top-left,
  .header-layout__top-right {
    flex: none;
    position: relative;
  }
  .header-layout__top-center {
    flex: auto;
    position: relative;
  }
</style>
