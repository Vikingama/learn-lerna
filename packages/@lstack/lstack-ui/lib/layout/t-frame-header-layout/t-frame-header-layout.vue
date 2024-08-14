<template>
  <div class="t-frame-header-layout">
    <div class="t-frame-header-layout__inner" :class="innerClass">
      <div v-if="$scopedSlots.logo" class="t-frame-header-layout__unit t-frame-header-layout__logo" :class="logoClass">
        <slot name="logo" />
      </div>
      <div v-if="$scopedSlots.left" class="t-frame-header-layout__unit t-frame-header-layout__left" :class="leftClass">
        <slot name="left" />
      </div>
      <div class="t-frame-header-layout__unit t-frame-header-layout__center" :class="centerClass">
        <slot name="center" />
      </div>
      <div
        v-if="$scopedSlots.right"
        class="t-frame-header-layout__unit t-frame-header-layout__right"
        :class="rightClass"
      >
        <slot name="right" />
      </div>
      <div v-if="$scopedSlots.user" class="t-frame-header-layout__unit t-frame-header-layout__user" :class="userClass">
        <slot name="user" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TFrameHeaderLayout',
    props: {
      innerClass: [String, Object, Array],
      logoClass: [String, Object, Array],
      leftClass: [String, Object, Array],
      centerClass: [String, Object, Array],
      rightClass: [String, Object, Array],
      userClass: [String, Object, Array],
    },
  }
</script>

<style lang="scss">
  @import './t-frame-header-layout.var';

  .t-frame-header-layout {
    position: relative;
  }

  .t-frame-header-layout__inner {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .t-frame-header-layout__unit {
    position: relative;
    flex: none;
    display: flex;
    align-items: center;

    &.t-frame-header-layout__center {
      flex: auto;
    }
  }
</style>
